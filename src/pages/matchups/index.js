import * as React from 'react';
import { useEffect, useState } from 'react';

// OK so...
// realizing that this doesn't really make sense and what I really need to do is change the python script to gather data by MATCHUP - and then plot those points on a graph.
export default function Matchups({}) {
    const [matchupData, setMatchupData] = useState(true);

    useEffect(() => {
        fetch('/matchupData.json')
        .then((res) => res.json())
        .then((data) => {
            setMatchupData(data);
            console.log(data);
        })

    }, []);


return (<>
    <main className="matchups">
    {/* {matchupData.map((matchup, index) => (
        <span key={index}>{matchup.index}</span>
    ))} */}
    </main>
</>); 
}
