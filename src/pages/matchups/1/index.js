import * as React from 'react';
import { useEffect, useState } from 'react';
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
import Button from '@mui/material/Button';

import MatchupChart from '../../../../components/MatchupChart';
import GamesBarChart from '../../../../components/GamesBarChart';
import VideoPlayer from '../../../../components/VideoPlayer';

const team1Data = {
  name: 'Man Hugs',
  data: [6, 8, 7, 7, 4, 3, 4],
  lineColour: 'rgb(255, 99, 132)',
  bgColour: 'rgba(255, 99, 132, 0.2)',
}
const team2Data = {
  name: 'Bobby Margarita',
  data: [2, 0, 1, 1, 5, 6, 5],
  lineColour: 'rgb(54, 162, 235)',
  bgColour: 'rgba(54, 162, 235, 0.2)',
}

const teams = [
  { name: 'Team A', gamesPlayed: 20, totalGames: 30 },
  { name: 'Team B', gamesPlayed: 25, totalGames: 32 },
  // Add more teams as needed...
];

// Two arrays of player IDs to toggle between
const playerIDsOption1 = [8473533]; // Example: Option 1
const playerIDsOption2 = [8478010, 8476453]; // Example: Option 2

export default function Matchup() {
  const [vids, setVids] = useState([]);
  const [filteredVids, setFilteredVids] = useState([]); // Store the filtered players
  const [toggle, setToggle] = useState(true); // State to track which player ID array is active

  useEffect(() => {
      // Fetch the JSON data from the public folder
      fetch('/sample.json')
          .then((res) => res.json())
          .then((data) => {
              setVids(data); // Store all players in state
              setFilteredVids(data.filter((vid) => playerIDsOption1.includes(vid.player1Id))); // Default filter
          })
          .catch((err) => console.error('Failed to fetch players:', err));
  }, []);

  // Function to toggle between the two arrays of player IDs
  const toggleFilter = () => {
    setToggle((prevToggle) => !prevToggle); // Switch toggle state

    const activePlayerIDs = toggle ? playerIDsOption2 : playerIDsOption1;
    console.log(activePlayerIDs);

    // Filter players based on the active player IDs array
    const newFilteredPlayers = vids.filter((vid) =>
        activePlayerIDs.includes(vid.player1Id)
    );

    setFilteredVids(newFilteredPlayers); // Update filtered players
  };

  return (
  <>
  <h1>Matchup</h1>
  <Box sx={{ flexGrow: 1 }} >
    <Grid container spacing={2}>

      {/* Topline Matchup Score */}
      {/* <Grid size={8} item container alignItems="center" justifyContent="center">
        <Grid item container spacing={2} alignItems="center" justifyContent="center">
          <Avatar alt="" src="@/public/images/image.png" />
          <span>5</span>
          <span>vs</span>
          <span>4</span>
          <Avatar alt="" src="@/public/images/image.png" />
        </Grid>
      </Grid> */}

      {/* Games Played * Total Games Graph */}
      {/* <Grid size={8} item container alignItems="center" justifyContent="center" className="gpContainer">
        <GamesBarChart teams={teams} />
      </Grid> */}

      {/* Main Matchup Graph */}
      {/* <Grid size={8} item container alignItems="center" justifyContent="center" className="graphContainer">
        <MatchupChart team1Data={team1Data} team2Data={team2Data} />
      </Grid> */}
      
      {/* Main Matchup Scoreboard */}
      {/* <Grid size={8} item container alignItems="center" justifyContent="center" direction="row" spacing={0}>
        <Grid size={8} item container alignItems="center" justifyContent="center" direction="row" spacing={0} className="scoreBoardButtons">
          <Grid item container alignItems="center" justifyContent="center" size={1} className="sb-btn">
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
        </Grid>
        <Grid size={8} item container alignItems="center" justifyContent="center" direction="row" spacing={0} className="scoreBoardButtons">
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" size={1}>
            XX
          </Grid>
        </Grid>
      </Grid> */}

      {/* Team Highlights */}
      <Grid size={8} item container alignItems="center" justifyContent="center" spacing={2} className="teamHighlights">
        <h2>Team Highlights</h2>
        {/* <button onClick={toggleFilter}>
          Toggle to {toggle ? 'Option 2' : 'Option 1'}
        </button> */}
        {filteredVids.map((vid) => (
          <Accordion key={vid.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <div className="playerInfo">
                <Avatar alt="" src="@/public/images/image.png" />
                <div className="playerInfoGrid">
                  <span>Jordan Staal</span>
                  <span>CAR</span>
                </div>
              </div>
              <div className="vidDescrip">
                <p>{vid.title}</p>
                <p>{vid.description}</p>
                <p>{vid.player1Name}({vid.player1Goals})
                  {vid.player2Name && <span> from {vid.player2Name}({vid.player2Assists})</span>}
                  {vid.player3Name && <span> and {vid.player3Name}({vid.player3Assists})</span>}
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <VideoPlayer videoUrl={vid.url} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>

    </Grid>
  </Box>
  </>
  )
}