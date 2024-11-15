import { useEffect, useState, useRouter } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link'
import Image from 'next/image'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideoPlayer from '../../../components/VideoPlayer';



// Fetch the team data from the JSON file
export async function getStaticProps({ params }) {
    const filePath = path.join(process.cwd(), 'data', 'NHLSeasonData.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const games = JSON.parse(fileContents);
  
    // Find the team that matches the dynamic id from the URL
    const game = games.find((game) => game.id.toString() === params.id);
  
    // If the team doesn't exist, return a 404 page
    if (!game) {
      return { notFound: true };
    }
  
    return {
      props: { game }, // Pass the team data as props to the page
    };
  }
  
  // Define the paths to be pre-rendered at build time
  export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'data', 'NHLSeasonData.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const games = JSON.parse(fileContents);
  
    const paths = games.map((game) => ({
      params: { id: game.id.toString() },
    }));
  
    return {
      paths,
      fallback: false, // Return 404 for unknown paths
    };
  }
  
  
  export default function IndividualGamePage({ game }) {
    const [loading, setLoading] = useState(true); // Loading state
    const [filteredVids, setFilteredVids] = useState([]); // Store the filtered highlights
    const [expanded, setExpanded] = useState(false); // Track expanded accordion
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false); // Update state based on expansion
    };
    
    useEffect(() => {
        console.log(game)
        // Fetch the JSON data from the public folder
        fetch('/highlightsWithPlayers.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            // const test = data.filter(item => item.gameId === game.id)
            // console.log(test);
            setFilteredVids(
                data
                    .filter(item => item.gameId === game.id)
                    .slice()
            );
          setLoading(false)
        })
        .catch((err) => console.error('Failed to fetch players:', err));

        // Update iframe size on window resize
        // Ensure the code runs only on the client side
        if (typeof window !== "undefined") {
            const updateDimensions = () => {
                setDimensions({
                    width: Math.max(300, Math.min(window.innerWidth * 0.8, 650)), // Min: 300px, Max: 1200px
                    height: Math.max(200, Math.min(window.innerHeight * 0.5, 400)), // Min: 200px, Max: 800px
                });
            }
            // Set initial dimensions
            updateDimensions();

            // Add event listener for window resize
            window.addEventListener("resize", updateDimensions);

            // Cleanup event listener
            return () => {
                window.removeEventListener("resize", updateDimensions);
            };
        };

    }, [game]);
  
    return (<>
    <main className="games-page">
        <div className="gameTitleContainer">
            <div className="gameTitle">
                <Avatar alt="" src={game.awayTeam_logo} className="headshot"
                    sx={{ width: 100, height: 70 }}
                    variant="square"
                />
                <Typography variant="h5">{game.awayTeam_abbrev} @ {game.homeTeam_abbrev}</Typography>
                <Avatar alt="" src={game.homeTeam_logo} className="headshot"
                    sx={{ width: 100, height: 70 }}
                    variant="square"
                />
            </div>
            <Typography variant="overline">{game.date} at {game.venue}</Typography>
        </div>

      {/* Team Highlights */}
      <Grid size={8} item container alignItems="center" justifyContent="center" spacing={2} className="teamHighlights">
        {filteredVids.map((vid, index) => (
        <Accordion 
          key={index} 
          expanded={expanded === index} 
          onChange={handleChange(index)}
          className="hl-item"
          id={vid.gameId + "-" + vid.player1Id }
        >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            // className="titleContainer"
            >
            <div className="hl-titleContainer">
                { vid.playerData ? (<>

                <div className="playerInfo">
                    <Avatar alt="" src={vid.playerData[vid.player1Id]?.headshot} className="headshot"
                    sx={{ width: 60, height: 60 }}
                    variant="square"
                    />
                    <div className="playerInfoGrid">
                    <Typography variant="body1" className="name">{vid.playerData[vid.player1Id]?.name}</Typography>
                    <div className="teamDetails">
                        <Avatar alt="" src={vid.playerData[vid.player1Id]?.teamLogo}
                        sx={{ width: 20, height: 20 }}
                        variant="square"
                        />
                        <Typography variant="caption">
                        {vid.playerData[vid.player1Id]?.team}&nbsp;#{vid.playerData[vid.player1Id]?.num}
                        </Typography>
                    </div>
                    <Typography variant="body2" className="date">{vid.gameDate}</Typography>
                    </div>
                </div>

                </>):(<>
                    {/* <div className="playerInfo">
                        <Typography variant="body2" className="date">{vid.date}</Typography>
                    </div> */}
                </>)}
              <div className="vidDescrip">
                <div className="row1">
                  <Typography variant="body1">{vid.title}</Typography>
                  <Typography variant="body2" className="date">{vid.date}</Typography>
                </div>
                <div className="row2">
                    { vid.description ? (<>
                        <Typography variant="subtitle2">{vid.description}</Typography>
                    </>):(<>
                        <Typography variant="subtitle2">{vid.descrip}</Typography>
                    </>)}
                  
                </div>
              </div>
            </div>
            </AccordionSummary>
            <AccordionDetails className="vidContainer">
              {/* Conditionally render the video only when expanded */}
              {expanded === index && (<>
                { vid.playerData ? (<>
                <Typography variant="subtitle2" className="goalInfo">
                    {vid.player1Name}({vid.player1Goals})
                    {vid.player2Name && <span> from {vid.player2Name}({vid.player2Assists})</span>}
                    {vid.player3Name && <span> and {vid.player3Name}({vid.player3Assists})</span>}
                </Typography>
                <VideoPlayer 
                  videoUrl={vid.url}
                />
                <div className="btnContainer share">
                  {/* <CopyTextBtn text={'https://mcdave-dash-beta.vercel.app/highlights#' + vid.gameId + "-" + vid.player1Id} /> */}
                </div>

                </>):(<>
                <div className="yt-container">
                    <iframe 
                        src={vid.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                        style={{
                            border: "none",
                            width: `${dimensions.width}px`,
                            height: `${dimensions.height}px`,
                        }}
                    ></iframe>
                </div>
                </>)}
              </>)}
            </AccordionDetails>
        </Accordion>
      ))}
      </Grid>

    </main>
  
    </>);
}
