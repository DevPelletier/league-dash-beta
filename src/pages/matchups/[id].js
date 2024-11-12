import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import MatchupChart from '../../../components/MatchupChart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// Fetch the team data from the JSON file
export async function getStaticProps({ params }) {
    const filePath = path.join(process.cwd(), 'data', 'matchupData.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matchups = JSON.parse(fileContents);
  
    // Destructure the id from params
    const { id } = params;

    // Find the item that matches the id
    let matchup = null;
    Object.values(matchups).some(items => {
        const foundItem = items.find(el => el.id === id);
        if (foundItem) {
            matchup = foundItem;
            return true; // stop searching if item is found
        }
        return false;
    });
  
    // If the team doesn't exist, return a 404 page
    if (!matchup) {
      return { notFound: true };
    }
  
    return {
      props: { matchup }, // Pass the team data as props to the page
    };
}
// Define the paths to be pre-rendered at build time
export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'data', 'matchupData.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matchups = JSON.parse(fileContents);
    
    const paths = Object.values(matchups).flatMap(items =>
        items.map(item => ({
          params: { id: item.id }
        }))
    );
  
    return {
      paths,
      fallback: false, // Return 404 for unknown paths
    };
  }
  
export default function MatchupPage({ matchup }) {
  const [graphData, setGraphData] = useState(true);
  const [statsExist, setStatsExist] = useState(false)

  // Increase the number of videos displayed by 20 each time
  const assignGraphData = (data) => {
    let newData = [];
    for (let i = 0; i < data.teamsData.length; i++) {
      let teamObj = {};
      teamObj.name = data.teamsData[i].team_id;
      teamObj.data = data.teamsData[i].matchupHistScores;
      if (i == 0) {
        teamObj.lineColour = "#4fc3f7"
        teamObj.bgColour = "rgba(0,0,0,0.1)"  
      } else {
        teamObj.lineColour = "#f57c00"
        teamObj.bgColour = "rgba(0,0,0,0.1)"
      }
      newData.push(teamObj);
    } 

    setGraphData(newData);
  };

  const checkIfStatsExist = (data) => {
    if (data.teamsData[0].matchupHistStats.length > 0) {
      setStatsExist(true)
    } else {
      console.log("no stats")
    }
  }



    useEffect(() => {
        // console.log(matchup)
        assignGraphData(matchup);
        checkIfStatsExist(matchup);
        // TO DOs:
        // match teamID to team name
        // match data for data required in MatchupChart.js component
    }, [matchup]);

    return (<>
    <div>
        <Link href="/matchups">Back to All Matchups</Link>
    </div>
    <div>
    <div className="matchupTitleContainer">
        <span>Matchup ID: {matchup.id}</span>
        <span>Week Start: {matchup.weekStart}</span>
        <span>Week End: {matchup.weekEnd}</span>
        <span>Team 1: {matchup.teamsData[0].team_id} {matchup.teamsData[0].matchupHistScores.at(-1)}</span>
        <span>Team 2: {matchup.teamsData[1].team_id} {matchup.teamsData[1].matchupHistScores.at(-1)}</span>
    </div>
    </div>

    <div>
      <h4>Scoreboard</h4>
      <div className="scoreboardContainer">
      { statsExist ? (<>
          <ButtonGroup variant="contained" aria-label="Basic button group">
          <span className="title team">Team</span>

          {matchup.teamsData[0].matchupHistStats.map((stat) => (
            <Button className="title" key={stat.id}>
              {stat.name}
            </Button>
          ))}
          </ButtonGroup>
          <br />
          <div className="scoreboardRow">

          <span className="title team">{matchup.teamsData[0].team_id}</span>
          {matchup.teamsData[0].matchupHistStats.map((stat) => (
            <span key={stat.id}>
              {stat.data.slice(-1)}
            </span>
          ))}

          </div>

          <br /><br /><br />

          <div className="scoreboardRow">
          <span className="title team">{matchup.teamsData[1].team_id}</span>
          {matchup.teamsData[1].matchupHistStats.map((stat) => (
            <span key={stat.id}>
              {stat.data.slice(-1)}
            </span>
          ))}
          </div>
      </>) : (<>
        <span>No stats avaiable for this matchup</span>
      </>)}
      </div>

    </div>

    <div>
      { graphData.length > 0 ? <MatchupChart team1Data={graphData[0]} team2Data={graphData[1]} /> : <>loading...</> }
    </div>
    </>)
  }