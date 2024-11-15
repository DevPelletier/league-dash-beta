import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import MatchupChart from '../../../components/MatchupChart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [graphData, setGraphData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [statsExist, setStatsExist] = useState(false)

  // Increase the number of videos displayed by 20 each time
  const assignGraphData = (data) => {
    console.log(data);
    let newData = [];
    for (let i = 0; i < data.teamsData.length; i++) {
      let teamObj = {};
      teamObj.name = data.teamsData[i].name,
      teamObj.data = data.teamsData[i].matchupHistScores;
      if (i == 0) {
        teamObj.lineColour = "#d32f2f"
        teamObj.bgColour = "rgba(0,0,0,0.1)"  
        teamObj.yAxis = "Category Pts"
      } else {
        teamObj.lineColour = "#0288d1"
        teamObj.bgColour = "rgba(0,0,0,0.1)"
        teamObj.yAxis = "Category Pts"
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

  function findObjectByName(arr, value, keyName) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][keyName] === value) {
        return arr[i]; // Return the object if found
      }
    }
    return null; // Return null if no object is found with that name
  }

  const handleButtonClick = (event) => {
    // Get the text content of the clicked button
    const buttonText = event.target.textContent;

    if (buttonText == "Team") {
      assignGraphData(matchup);
      return;
    }
    
    const statData1 = findObjectByName(matchup.teamsData[0].matchupHistStats, buttonText, 'name');
    const statData2 = findObjectByName(matchup.teamsData[1].matchupHistStats, buttonText, 'name');

    const newData = [
      {
        bgColour: "rgba(0,0,0,0.0)",
        data: statData1.data,
        lineColour: "#d32f2f",
        name: teamsData[0].name,
        yAxis: buttonText
      },
      {
        bgColour: "rgba(0,0,0,0.0)",
        data: statData2.data,
        lineColour: "#0288d1",
        name: teamsData[1].name,
        yAxis: buttonText
      }
    ]

    if (buttonText == 'SV%') {
      newData[0].yMin = 0.750;
      newData[0].yMax = 1.000;
    }
    setGraphData(newData);
  };

  const getTeamsData = (data) => {
    const team1 = findObjectByName(data, matchup.teamsData[0].team_id, 'team_key')
    const team2 = findObjectByName(data, matchup.teamsData[1].team_id, 'team_key')
    
    setTeamsData([team1, team2])
  }



    useEffect(() => {
        // console.log(matchup)
        fetch('/teams.json')
        .then((res) => res.json())
        .then((data) => {
            getTeamsData(data);
        })
        assignGraphData(matchup);
        checkIfStatsExist(matchup);

        // TO DOs:
        // match teamID to team name
        // match data for data required in MatchupChart.js component
    }, [matchup]);

    return (<>
    {/* <div className="backBtn">
        <Button href="/matchups" variant="outlined">
          <ArrowBackIcon />&nbsp;Back to All Matchups
        </Button>
    </div> */}
    <div>
      <div className="matchupTitleContainer">
          {/* <span>Matchup ID: {matchup.id}</span> */}
          { teamsData.length > 0 ? (<>
            <Typography variant="overline">Week {matchup.id.charAt(0)}</Typography>
            <Typography variant="caption">{matchup.weekStart} to {matchup.weekEnd}</Typography>
            <div className="scoreboardTitle">
              <div className="row names">
                <Typography variant="h5">({teamsData[0].rank}) {teamsData[0].name}</Typography>
                <Typography variant="overline">vs.</Typography> 
                <Typography variant="h5">({teamsData[1].rank}) {teamsData[1].name}</Typography>
              </div>
              <div className="row scores">
                <Typography variant="h5">{matchup.teamsData[0].matchupHistScores.at(-1) / 2}</Typography>
                <Typography variant="overline">-</Typography>
                <Typography variant="h5">{matchup.teamsData[1].matchupHistScores.at(-1) / 2}</Typography>
              </div>
            </div>
          </>) : (<>
            loading...
          </>)}
      </div>
    </div>

    {/* <h4>Scoreboard</h4> */}
    <div className="scoreboardContainer">
    { (statsExist) & (teamsData.length > 0) ? (<>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button className="title" onClick={handleButtonClick}>
            Team
          </Button>

        {matchup.teamsData[0].matchupHistStats.map((stat) => (
          <Button className="title" key={stat.id} onClick={handleButtonClick}>
            {stat.name}
          </Button>
        ))}
        </ButtonGroup>
        <br />
        <div className="scoreboardRow">

        <div className="statBox">
          <Typography variant="body1" className="title team">{teamsData[0].name}</Typography>
        </div>
        {matchup.teamsData[0].matchupHistStats.map((stat) => (
          <div className="statBox" key={stat.id}>
            <Typography variant="body1">
              {stat.data.slice(-1)}
            </Typography>
          </div>
        ))}

        </div>

        <div className="scoreboardRow">
        <div className="statBox">
          <Typography variant="body1" className="title team">{teamsData[1].name}</Typography>
        </div>
        {matchup.teamsData[1].matchupHistStats.map((stat) => (
          <div className="statBox" key={stat.id}>
            <Typography variant="body1">
              {stat.data.slice(-1)}
            </Typography>
          </div>
        ))}
        </div>
    </>) : (<>
      <span>Loading...</span>
    </>)}
    </div>


    <div className="matchGraphContainer">
      <div className="matchGraphContainer-2">
        { graphData.length > 0 ? <MatchupChart team1Data={graphData[0]} team2Data={graphData[1]} /> : <>loading...</> }
      </div>
    </div>
    </>)
  }