import * as React from 'react';
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// TODO
// List of NHL Games by date, with all the info you have in NHLSeasonData
// Each game is a link to a /nhl-game/[id] page that displays all of the videos in BatchedHighlights.json that have the right gameID

const getTodaysDate = () => {
    const today = new Date();

    // Subtract one day
    today.setDate(today.getDate() - 1);
  
    // Extract year, month, and date
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const date = String(today.getDate()).padStart(2, '0'); // Pad single digits with leading zero
  
    // Combine into YYYY-MM-DD format
    return `${year}-${month}-${date}`;
};

export default function Games({ games }) {
    const [loading, setLoading] = useState(true);
    const [filteredGames, setFilteredGames] = useState([]); // Store the filtered highlights

    const date = getTodaysDate();

    useEffect(() => {
        setFilteredGames(
            games
                .filter(item => item.date == date)
        );
        setLoading(false);
        console.log(filteredGames);
    }, []);

    return (
    <>
    { filteredGames.length == 0 ? (<>
    Loading...
    </>):(<>
    
    <main className="games">
        <div className="gamesDateTitle">
            <Typography variant="h6">{date}</Typography>
        </div>
        <div className="gameContainer">
        {filteredGames.map((game, index) => (

            <div key={index} className="gameContainer2">
            <Link href={"/games/" + game.id}>
                <div className="row1">
                    <Avatar 
                        variant="square"
                        alt="McDave Sweepstakes" 
                        src={game.awayTeam_logo} 
                        sx={{ width: 50, height: 40 }}
                    />
                    <Typography variant="caption">
                        {game.awayTeam_abbrev} @ {game.homeTeam_abbrev}
                    </Typography>
                    <Avatar 
                        variant="square"
                        alt="McDave Sweepstakes" 
                        src={game.homeTeam_logo} 
                        sx={{ width: 50, height: 40 }}
                    />
                </div>
            </Link>
            </div>

        ))}
        </div>

    </main>
    </>)}

    </>);

}

// Fetch video data from the local JSON file at build time
export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'data', 'NHLSeasonData.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const games = JSON.parse(fileContents);
  
    return {
      props: {
        games,
      },
    };
  }
  
