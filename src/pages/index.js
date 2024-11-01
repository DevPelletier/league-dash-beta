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
  
import StandingsChart from '../../components/StandingsChart';

function createData(id, rank, picUrl, team, pts, pct, wlt, moves, trades, waiver) {
  return { id, rank, picUrl, team, pts, pct, wlt, pts, moves, trades, waiver };
}

// TODO 
const standingsData = [
    {
        label: 'Evil Marc',
        data: [0, 16, 29, 37, 50],
        borderColor: '#f44336',
    },
    {
        label: 'Have a Heart',
        data: [0, 8, 22, 33, 45],
        borderColor: '#e91e63',
    },
    {
        label: 'Sweet Baby Bedjsus',
        data: [0, 12, 22, 32, 43],
        borderColor: '#4caf50',
    },
    {
        label: 'Mitch Marners Dad',
        data: [0, 10, 21, 26, 38],
        borderColor: '#ffeb3b',
    },
    {
        label: 'Star of David ✡️',
        data: [0, 8, 16, 24, 30],
        borderColor: '#009688',
    },
    {
        label: 'Anything is Pospisil 🙏',
        data: [0, 10, 15, 23, 36],
        borderColor: '#ff5722',
    },
    {
        label: 'Mad Raddysh',
        data: [0, 6, 13, 20, 25],
        borderColor: '#ff9800',
    },
    {
        label: 'Fuhr Da Boys',
        data: [0, 2, 7, 17, 23],
        borderColor: '#ffc107',
    },
    {
        label: 'Ayo bath ur son',
        data: [0, 12, 26, 39, 44],
        borderColor: '#cddc39',
    },
    {
        label: 'Bobby Margarita',
        data: [0, 10, 24, 38, 45],
        borderColor: '#8bc34a',
    },
    {
        label: 'Justus for Evil Marc',
        data: [0, 12, 23, 41, 43],
        borderColor: '#4caf50',
    },
    {
        label: 'House Markonnen',
        data: [0, 6, 19, 32, 48],
        borderColor: '#00bcd4',
    },
    {
        label: "Paul Muad'Dib",
        data: [0, 12, 16, 26, 38],
        borderColor: '#2196f3',
    },
    {
        label: 'Man Hugs 🫂',
        data: [0, 8, 15, 20, 34],
        borderColor: '#3f51b5',
    },
    {
        label: 'W.B Snipes',
        data: [0, 6, 10, 10, 16],
        borderColor: '#673ab7',
    },
    {
        label: 'The Tim Thomas Drama Club',
        data: [0, 6, 10, 14, 18],
        borderColor: '#9c27b0',
    },

]


export default function Standings({ team }) {
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [updated, setUpdated] = useState([])
    const [visibleDataset, setVisibleDataset] = useState(null); // Track which dataset to show


    const importTeams = (data) => {
        console.log('importTeams')
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
        console.log('build graph')

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
        console.log('useEffect')
          // Fetch the JSON data from the public folder
        fetch('/teams.json')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setTeams(data);
                importTeams(data);
                buildGraph(data);
            })
            .then(() => {
                // importTeams(teams);
                setLoading(false);
            })
            .catch((err) => console.error('Failed to fetch players:', err));
        fetch('/updated.json')
            .then((res) => res.json())
            .then((data) => {
                setUpdated(data);
            })
    }, []);


      

  return (
    <>
    <main className="home">
    <Typography variant="subtitle2" className="updated">Last Updated: {updated.updated}</Typography>
    <div className="standingsGraph">
        <Typography variant="h5">Standings Graph</Typography>
        { (graphData.length > 0) ? <StandingsChart standingsData={graphData} /> : <></> }
    </div>
    <div className="standingsContainer">
        <Typography variant="h5">Standings Table</Typography>
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