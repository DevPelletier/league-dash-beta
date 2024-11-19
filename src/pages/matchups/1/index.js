import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MatchupChart2 from '../../../../components/MatchupChart2';
import Grid from '@mui/material/Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// TODO
// Make Weeks into accordions? It's accordions all the way down? lol?
// But also reverse the order of the weeks, so it's the most recent week (active week) at the top
// Also for centering - make each matchup a grid so that each element has it's given space (and the centered element is always centered)

// Also also - may want to just match all of this data up in python because this fetching shit is so annoying
export default function Matchups({}) {
    const [matchupData, setMatchupData] = useState({});
    const [teamsData, setTeamsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState('7'); // Track expanded accordion

    
    const matchTeamsData = async (initMatchupData) => {
        for (let week in initMatchupData) {
            for (let matchup in initMatchupData[week]) {
                for (let data in initMatchupData[week][matchup]) {
                    if (Array.isArray(initMatchupData[week][matchup][data])) {
                        for (let team in initMatchupData[week][matchup][data]) {
                            let teamId = initMatchupData[week][matchup][data][team].team_id;
                            for (let teamData in teamsData) {
                                if (teamsData[teamData].team_key == teamId) {
                                    initMatchupData[week][matchup][data][team].name = teamsData[teamData].name;
                                    initMatchupData[week][matchup][data][team].score = (initMatchupData[week][matchup][data][team].matchupHistScores.at(-1)) / 2;
                                    initMatchupData[week][matchup][data][team].logo = teamsData[teamData].logo;
                                    initMatchupData[week][matchup][data][team].url = teamsData[teamData].url;
                                    initMatchupData[week][matchup][data][team].rank = teamsData[teamData].rank;
                                    initMatchupData[week][matchup][data][team].totalWLT = teamsData[teamData].totalWLT;
                                    // MATCH ALL OF THE STUFF HERE
                                }
                            }
                        }
                    }
                }
            }
        }
        setMatchupData(initMatchupData);
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    useEffect(() => {
        // fetch('/teams.json')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setTeamsData(data);
        //     })
        //     .then(() => {
        //         setLoading(false);
        //     })
        //     .catch((err) => console.error('Failed to fetch teams:', err));
        fetch('/matchupData.json')
            .then((res) => res.json())
            .then((data) => {
                setMatchupData(data)
                setLoading(false);
            })
            .catch((err) => console.error('Failed to fetch matchupData:', err));


        // const fetchData = async () => {
        //     try {
        //         const response = await fetch('/teams.json');
        //         const data = await response.json();
        //         setTeamsData(data);

        //         const response2 = await fetch('/matchupData.json');
        //         const data2 = await response2.json();
        //         await matchTeamsData(data2);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     } finally {
        //         setLoading(false);
        //         console.log(matchupData)
        //     }
        // }
        
        // fetchData();
    }, []);

    useEffect(() => {
        // This will log matchupData whenever it changes
        console.log("matchupData updated:", matchupData);
    }, [matchupData]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false); // Update state based on expansion
    };
    

return (<>
    { ((Object.keys(matchupData).length > 0) && (!loading)) ? (<>
        <main className="matchups">
        <Grid size={8} item container alignItems="center" justifyContent="center" spacing={2} className="matchupsGrid">

        {Object.entries(matchupData).reverse().map(([key, matchups]) => (<>
            {key == "4" ? (<></>) : (<>
            <Accordion 
            key={key} 
            expanded={expanded === key} 
            onChange={handleChange(key)}
            className="matchupWeek"
            // id={vid.gameId + "-" + vid.player1Id }
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${key}-content`}
                id={`panel${key}-header`}
                className="matchupWeekTitle"
                >
                    <div className="weekTitle">
                        <Typography variant="h6">Week {key}</Typography>
                        <Typography variant="subtitle2">{matchups[0].weekStart} - {matchups[0].weekEnd}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="matchupsContainer">
                    {matchups.map((matchup, index) => (<>
                        <div key={index} className="matchupItem">
                        <Link href={"/matchups/" + matchup.id}>
                            <div className="team1">
                                {/* ({matchup.teamsData[0].rank}) */}
                                <Avatar variant="round" alt="McDave Sweepstakes" src={matchup.teamsData[0].logo} />
                                <Typography variant="body2">{matchup.teamsData[0].name}</Typography>
                            </div>
                            <div className="score">
                                <div className="scoreContainer">
                                <div className="scoreNum">
                                    <Typography variant="body1">{matchup.teamsData[0].currentScore}</Typography>
                                </div>
                                <Typography variant="body1"> - </Typography>
                                <div className="scoreNum">
                                    <Typography variant="body1">{matchup.teamsData[1].currentScore}</Typography>
                                </div>
                                </div>
                            </div>
                            <div className="team2">
                                    {/* ({matchup.teamsData[1].rank}) */}
                                    <Typography variant="body2">{matchup.teamsData[1].name}</Typography>
                                    <Avatar variant="round" alt="McDave Sweepstakes" src={matchup.teamsData[1].logo} />
                            </div>
                            {/* <Button variant="outlined" href={"/matchups/" + matchup.id}>Go To Matchup</Button> */}
                        </Link>
                        <MatchupChart2
                            team1Data={{
                                name: matchup.teamsData[0].name,
                                data: matchup.teamsData[0].matchupHistScores,
                                lineColour: "#d32f2f",
                                backgroundColor: "#d32f2f",
                                fill: false, // Do not fill under the line
                                cubicInterpolationMode: 'monotone',
                                tension: 0.4,
                                borderWidth: 3,
                                pointStyle: 'circle',
                                // pointRadius: 5,
                                // pointHoverRadius: 8,
                                yMin: 0,
                                yMax: 18,
                            }}
                            team2Data={{
                                name: matchup.teamsData[1].name,
                                data: matchup.teamsData[1].matchupHistScores,
                                lineColour: "#0288d1",
                                backgroundColor: "#0288d1",
                                fill: false, // Do not fill under the line
                                cubicInterpolationMode: 'monotone',
                                tension: 0.4,
                                borderWidth: 3,
                                pointStyle: 'circle',
                                // pointRadius: 5,
                                // pointHoverRadius: 8,
                            }}
                        />
                        </div>
                    </>))}
                </AccordionDetails>
            </Accordion>
            </>)}

        </>))}
        </Grid>
        </main>
    </>) : loading ? (<>
        <span>Loading....</span>
    </>) : (<>
        <div>No matchup data found.</div>
    </>)}

</>); 
}
