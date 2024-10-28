import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import VideoPlayer from '../../../components/VideoPlayer';
import yahooImg from '../../../public/images/yahoo.png'


// Fetch the team data from the JSON file
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'teams.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const teams = JSON.parse(fileContents);

  // Find the team that matches the dynamic id from the URL
  const team = teams.find((team) => team.id === params.id);

  // If the team doesn't exist, return a 404 page
  if (!team) {
    return { notFound: true };
  }

  return {
    props: { team }, // Pass the team data as props to the page
  };
}

// Define the paths to be pre-rendered at build time
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'teams.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const teams = JSON.parse(fileContents);

  const paths = teams.map((team) => ({
    params: { id: team.id },
  }));

  return {
    paths,
    fallback: false, // Return 404 for unknown paths
  };
}


export default function TeamPage({ team }) {
  const router = useRouter();
  const [vids, setVids] = useState([]);
  const [expanded, setExpanded] = useState(false); // Track expanded accordion
  const [players, setPlayers] = useState([]);  // Store fetched player data here
  const [filteredVids, setFilteredVids] = useState([]); // Store the filtered highlights
  const [mappedData, setMappedData] = useState([]); // store combined highlight and player data here
  const [loading, setLoading] = useState(true); // Loading state

  const fetchPlayerData = async () => {
    try {
      const res = await fetch('/nhlPlayerData.json'); // Adjust path if needed
      const allPlayerData = await res.json();
  
      // Extract player IDs from playerIDList
      const player1IDs = filteredVids.map((item) => item.player1Id);
      const player2IDs = filteredVids.map((item) => item.player2ID);
      const player3IDs = filteredVids.map((item) => item.player3ID);

      const combinedIDs = [...new Set([...player1IDs, ...player2IDs, ...player3IDs])];
  
      // Filter players whose IDs match the ones in playerIDList
      const matchedPlayers = allPlayerData.toi.filter((player) =>
        combinedIDs.includes(player.id)
      );
      // console.log(matchedPlayers)
      setPlayers(matchedPlayers); // Save the matched players in state
    } catch (err) {

      console.error('Failed to fetch player data:', err);
      // setError('Could not load player data');
    }
  };

  const mapPlayerData = async () => {
    try {
      // Simulate data fetching delay (optional)
      // await new Promise((resolve) => setTimeout(resolve, 100)); 

      const combinedData = filteredVids.map((video) => {
        // Find all players for this video (player1Id, player2Id, player3Id)
        const playersInVideo = [
          video.player1Id,
          video.player2ID,
          video.player3ID,
        ]
          .filter(Boolean) // Filter out undefined or null IDs
          .map((id) => players.find((player) => player.id === id))
          .filter(Boolean); // Filter out unmatched players

        return { ...video, players: playersInVideo };
      });

      setMappedData(combinedData);
      setLoading(false); // Set loading to false when done
      console.log(combinedData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  
  
  useEffect(() => {
    console.log('useEffect')
      // Fetch the JSON data from the public folder
    fetch('/highlightsWithPlayers.json')
      .then((res) => res.json())
      .then((data) => {
        setFilteredVids(
          data
            .filter((vid) =>
              team.nhlIDs.some((id) => 
                [vid.player1Id, vid.player2ID, vid.player3ID].includes(id)
              )
            )
            .map((vid) => {
              // Identify which player ID matched and store it in the video object
              const matchedPlayerId = [vid.player1Id, vid.player2ID, vid.player3ID].find((id) =>
                team.nhlIDs.includes(id)
              );
        
              return {
                ...vid,
                matchedPlayerId,  // Add the matched player ID for future reference
              };
            })
            .slice().reverse()
        );          
          // setFilteredVids(data.filter((vid) => team.nhlIDs.includes(vid.player1Id))); // Default filter
      })
      .then(setLoading(false))
      // .then(fetchPlayerData())
      // .then(mapPlayerData())
      .catch((err) => console.error('Failed to fetch players:', err));
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Update state based on expansion
  };

  // Render loading indicator while fetching data
  if (loading) return <p>Loading....</p>;

  return (<>
    <main className="highlights-page">

      <div className="titleContainer">
        <Avatar alt="" src={team.logo} className="avatar" />

        <Typography variant="h3">{team.name}</Typography>

        <div className="pushRight">
          <Link href={team.url} target="_blank">
            <Image src={yahooImg} alt="go to yahoo" className="yahoo" 
              />
          </Link>
        </div>
      </div>
      {/* Team Highlights */}
      <Grid size={8} item container alignItems="center" justifyContent="center" spacing={2} className="teamHighlights">
          <Typography variant="h5">Team Highlights</Typography>
          {/* <button onClick={toggleFilter}>
          Toggle to {toggle ? 'Option 2' : 'Option 1'}
          </button> */}
          {/* { (filteredVids.length > 0) ? (<>got filteredVids</>):(<>loading...</>)} */}
          {filteredVids.map((vid, index) => (
          <Accordion 
            key={index} 
            expanded={expanded === index} 
            onChange={handleChange(index)}
            className="hl-item"
          >
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              // className="titleContainer"
              >
              <div className="hl-titleContainer">
                <div className="playerInfo">
                  <Avatar alt="" src={vid.playerData[vid.matchedPlayerId]?.headshot} className="headshot"
                  sx={{ width: 60, height: 60 }}
                  />
                  <div className="playerInfoGrid">
                    <Typography variant="body1" className="name">{vid.playerData[vid.matchedPlayerId]?.name}</Typography>
                    <div className="teamDetails">
                      <Avatar alt="" src={vid.playerData[vid.matchedPlayerId]?.teamLogo}
                      sx={{ width: 20, height: 20 }}
                      />
                      <Typography variant="caption">
                        {vid.playerData[vid.matchedPlayerId]?.team}&nbsp;#{vid.playerData[vid.matchedPlayerId]?.num}
                      </Typography>
                    </div>
                    <Typography variant="body2" className="date">{vid.gameDate}</Typography>
                  </div>
                </div>
                <div className="vidDescrip">
                  <div className="row1">
                    <Typography variant="body1">{vid.title}</Typography>
                  </div>
                  <div className="row2">
                    <Typography variant="subtitle2">
                      {vid.player1Name}({vid.player1Goals})
                      {vid.player2Name && <span> from {vid.player2Name}({vid.player2Assists})</span>}
                      {vid.player3Name && <span> and {vid.player3Name}({vid.player3Assists})</span>}
                    </Typography>
                  </div>
                </div>
              </div>
              </AccordionSummary>
              <AccordionDetails className="vidContainer">
                {/* Conditionally render the video only when expanded */}
                {expanded === index && (<>
                  <Typography variant="subtitle2">{vid.description}</Typography>
                  <VideoPlayer 
                    videoUrl={vid.url}
                  />
                </>)}
              </AccordionDetails>
          </Accordion>
          ))}
      </Grid>
    </main>
  
</>);
}
