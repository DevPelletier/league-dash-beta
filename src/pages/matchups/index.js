import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'

// OK so...
// realizing that this doesn't really make sense and what I really need to do is change the python script to gather data by MATCHUP - and then plot those points on a graph.
export default function Matchups({}) {
    const [matchupData, setMatchupData] = useState(true);
    const [teamsData, setTeamsData] = useState(true);

    useEffect(() => {
        fetch('/matchupData.json')
            .then((res) => res.json())
            .then((data) => {
                setMatchupData(data);
                console.log(data);
            })
        
        fetch('/teams.json')
            .then((res) => res.json())
            .then((data) => {
                setTeamsData(data);
                console.log(data);
            })


    }, []);


return (<>
    <main className="matchups">
    {Object.entries(matchupData).map(([key, matchups]) => (<>
        <div key={key}>
            <span>Week {key}</span>
            <span>{matchups[0].weekStart} - {matchups[0].weekEnd}</span>
        </div>
        {matchups.map((matchup, index) => (<>
            <div key={index}>
                <span>{matchup.teamsData[0].team_id} {matchup.teamsData[0].matchupHistScores.at(-1)} - {matchup.teamsData[1].team_id} {matchup.teamsData[1].matchupHistScores.at(-1)}</span>
                <Link href={"/matchups/" + matchup.id}>Go To Matchup</Link>
            </div>
        </>))}

    </>))}
    </main>
</>); 
}
