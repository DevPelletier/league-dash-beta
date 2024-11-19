import * as React from 'react';
import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import StandingsChart from '../../components/StandingsChart';

function createData(id, rank, picUrl, team, pts, pct, wlt, moves, trades, waiver) {
  return { id, rank, picUrl, team, pts, pct, wlt, pts, moves, trades, waiver };
}

export default function Standings({ team }) {
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [visibleDataset, setVisibleDataset] = useState(null); // Track which dataset to show


    const importTeams = (data) => {
        // console.log('importTeams')
        // console.log(data)
        let dataForTable = []
        for (let item in data) {
            let newItem = createData(data[item].id, data[item].rank, data[item].logo, data[item].name, data[item].pts, data[item].pct, data[item].totalWLT, data[item].seasonMoves, data[item].trades, data[item].waiverPriority)
            // console.log(newItem)
            dataForTable.push( newItem )
        }
        // console.log(dataForTable)
        setTableData(dataForTable)
    }

    // TODO
    const buildGraph = (data) => {
        // console.log('build graph')
        let dataForGraph = []
        for (let x in data) {
            let teamObj = {}
            teamObj.label = data[x].name;
            teamObj.data = data[x].histPts;
            teamObj.borderColor = data[x].borderColor;
            dataForGraph.push(teamObj)
        }
        setGraphData(dataForGraph)
        // for 
    }

    useEffect(() => {
        // console.log('useEffect')
          // Fetch the JSON data from the public folder
        fetch('/teams.json')
            .then((res) => res.json())
            .then((data) => {
                setTeams(data);
                importTeams(data);
                buildGraph(data);
            })
            .then(() => {
                // importTeams(teams);
                setLoading(false);
            })
            .catch((err) => console.error('Failed to fetch players:', err));
    }, []);


      

  return (
    <>
    <main className="home">
    <div className="standingsGraph">
        <Typography variant="h4">Standings Graph</Typography>
        { (graphData.length > 0) && (teams.length > 0) ? <StandingsChart standingsData={graphData} teams={teams} /> : <></> }
    </div>
    <div className="standingsContainer">
        <Typography variant="h4">Standings Table</Typography>
        <TableContainer component={Paper} className="standingsTable">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Pts</TableCell>
                <TableCell align="right">W-T-L</TableCell>
                <TableCell align="right">Pct</TableCell>
                <TableCell align="right">Roster Moves</TableCell>
                <TableCell align="right">Trades</TableCell>
                <TableCell align="right">Waiver Priority</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row) => (
                <TableRow
                key={row.team}
                >
                    <TableCell align="center">{row.rank}</TableCell>
                    <TableCell component="th" scope="row" className="teamName">
                        <Link href={"/teams/" + row.id}>
                            <Avatar variant="round" alt="McDave Sweepstakes" src={row.picUrl} />
                            <Typography variant="body1">{row.team}</Typography>
                        </Link>
                    </TableCell>
                    <TableCell align="right">{row.pts}</TableCell>
                    <TableCell align="right">{row.wlt}</TableCell>
                    <TableCell align="right">{row.pct}</TableCell>
                    <TableCell align="right">{row.moves}</TableCell>
                    <TableCell align="right">{row.trades}</TableCell>
                    <TableCell align="right">{row.waiver}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
    </main>
    </>);
}