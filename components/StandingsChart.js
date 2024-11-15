import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';

// TO DO
// Before anything need to figure out the whole functionality of this dashboard lol...
// Add all the buttons (avatars?) (with colours!) as a custom legend for this graph
// Change "playoff position +/-" and "points" button to a toggle

// Register the required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

// Function to calculate Playoff Point Differential
const calculatePointDifferential = (datasets, playoffThresh) => {
    const weeks = datasets[0].data.length; // Number of weeks
  
    // Create a deep copy of the datasets to avoid mutating the original data
    const newDatasets = datasets.map((dataset) => ({
      ...dataset,
      data: [...dataset.data],
    }));
  
    // Loop through each week and calculate the point differential
    let playoffThreshold = 0;
    for (let week = 0; week < weeks; week++) {
        const pointsThisWeek = newDatasets.map((dataset) => dataset.data[week]);
        playoffThreshold = pointsThisWeek.sort((a, b) => b - a)[7] || 0; // 8th place points
  
        newDatasets.forEach((dataset) => {
            dataset.data[week] = dataset.data[week] - playoffThreshold;
        });
    }
  
    return newDatasets;
};
const stripDataDown = (datasets) => {
    const newDatasets = datasets.map((dataset) => ({
        label: dataset.label,
        data: [...dataset.data],
        borderColor: dataset.borderColor,
    }));
    return newDatasets;
}

// Function to convert RGB to RGBA
function rgbToRgba(color, alpha) {
    const { r, g, b } = color;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgba(hex, alpha) {
    if (!hex) {
        return false
    }
    // Remove the '#' if present
    hex = hex.replace('#', '');
    // Parse the red, green, and blue components from the hex code
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Return the rgba string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}    

function addPropertiestoData(dataset) {
    const weeks = dataset[0].data.length; // Number of weeks

    // New array with copied objects and additional properties
    let x = 2;

    const datasetsArray = dataset.map((obj) => {
        let color = obj.borderColor;
        const rgbaColor = hexToRgba(color, 0.4)
        let dashing; // [dash length, gap length]
        let lineWidth;
        if (x % 2 == 0) {
            dashing = [10, 5]
        } else {
            dashing = []
        }
        x += 1;

        return { 
            ...obj, 
            borderColor: color,
            backgroundColor: rgbaColor,
            borderWidth: 3,
            // cubicInterpolationMode: 'monotone',
            // tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 8,
            fill: false, // 'origin'
            segment: {
                borderColor: (ctx) => ctx.p1DataIndex === (weeks-1) ? rgbaColor : color,
                borderDash: (ctx) => ctx.p1DataIndex === (weeks-1) ? [10, 15] : [],
            },
        };
    });

    return datasetsArray;
};


const StandingsChart = ({ standingsData, teams }) => {

    const [useDifferential, setUseDifferential] = useState(true); // Track toggle state
    const [chartData, setChartData] = useState([]); // Chart data state
    const [chartLoading, setChartLoading] = useState(false);
    const [playoffThresh, setPlayoffThresh] = useState([]);
    const [playoffYMaxMin, setPlayoffYMaxMin] = useState([]);
    const chartRef = useRef(null);

    // Run `setChartData` only once when the component loads
    useEffect(() => {
        console.log(teams)
        if (useDifferential) {
            const differentialData = calculatePointDifferential(standingsData, playoffThresh); // Calculate differential
            const finalData = addPropertiestoData(differentialData);
            setChartData(finalData);
        } else {
            const finalData = addPropertiestoData(standingsData) 
            setChartData(finalData);
        }
    }, []); // Empty dependency array ensures this runs only once

    // Toggle between original data and point differential
    const toggleData = () => {
        // if (chartData.length == 1) {
            // console.log('TO DO: SINGLE TEAM STUFF')
            // Function that calcs the differential and then removes the specific index again...? seems dumb but whatever

        // } else {
            if (useDifferential) {
                // console.log('useStraight')
                const finalData = addPropertiestoData(standingsData) 
                setChartData(finalData); // Revert to original data
            } else {
                // console.log('usePlayoffDiff')
                const differentialData = calculatePointDifferential(standingsData, playoffThresh); // Calculate differential
                const finalData = addPropertiestoData(differentialData);
                setChartData(finalData); // Update chart data with differential
            }    
        // }
        // setUseDifferential((prev) => !prev); // Toggle state
    };


    // Function to handle button clicks
    const handleShowDataset = (index) => {
        console.log('handleShowDataset');
        setChartLoading(true);
        
        let soloData = chartData[index]
        setChartData([soloData]);

        // const soloChartData = chartData.map((dataset) => ({
        //     ...dataset,
        //     backgroundColor: "rgba(0,0,0,0.2)",
        //     borderColor: "rgba(0,0,0,0.2)"
        // }));
        // console.log(soloChartData);
        // setChartData(chartData);

        setTimeout(setChartLoading(false), 2000);
    };


    const getYAxisTitle = () => {
        if (useDifferential) {
            return 'Pts +/- Playoff Position'
        } else {
            return 'Season Pts'
        }
    };
    // Create X Labels
    // Get the length of the original array
    const originalArrayLength = standingsData[0]?.data.length;
    // Create a new array with indices from 0 to the length of the original array
    const labels = Array.from({ length: originalArrayLength }, (_, index) => String(index));

    // Configuration for the chart
    const data = {
        labels: labels,
        // labels: {
        //     position: 'bottom',
        // },
        datasets: chartData,
    };

    

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                // min: 0,
                // max: 20,
                title: {
                    display: true,
                    text: getYAxisTitle(),
                },
                grid: {
                    lineWidth: (context) => {
                        if (useDifferential) {
                            // Check if the current gridline is at value 0
                            return context.tick.value === 0 ? 2.5 : 0.5; // Bold line at 0
                        } else {
                            return 0.5;
                        }
                    },
                    color: (context) => {
                        if (useDifferential) {
                            // Use a specific color for the gridline at value 0
                            return context.tick.value === 0 ? "black" : "grey";
                        } else {
                            return "grey";
                        }

                    },
                },
            },
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Week',
                },
            },
        },
    };
    // Function to show a specific dataset
    const showDataset = (index) => {
        if (!useDifferential) {
            // console.log('useStraight')
            const finalData = addPropertiestoData(standingsData) 
            const dataset = finalData[index]
            setChartData([dataset])
            console.log(chartData, finalData)            
        } else {
            // console.log('usePlayoffDiff')
            const differentialData = calculatePointDifferential(standingsData, playoffThresh); // Calculate differential
            const finalData = addPropertiestoData(differentialData);
            const dataset = finalData[index]

            setChartData([dataset])
            console.log(chartData, finalData)
        }
    };

    // Function to handle the toggle of the switch
    const handleToggle = (event) => {
        const newValue = event.target.checked;
        // Perform additional logic here if needed
        console.log(`Switch toggled to: ${newValue}`);
        setUseDifferential(newValue);

        toggleData();
    };

    

    return (<>
    <div className="graphContainer">
        <div className="graphContainer-2">
            { chartLoading ? <></> : <Line data={data} options={options} /> }
        </div>
    </div>
    <div className="graphBtnContainer">
        <FormControlLabel
            control={
                <Switch
                    checked={useDifferential}
                    onChange={handleToggle}
                    color="primary"
                />
            }
            label={useDifferential ? "Playoff Position +/-" : "Total Points"}
        />
        {/* <Button onClick={toggleData} variant="outlined" size="small">
            {useDifferential ? 'Show Season Pts' : 'Show Playoff Position +/-'}
        </Button> */}
    </div>
    <div className="avatarContainer">
        {teams.length > 0 ? (<>
            {teams.map((team, index) => (

            <button key={team.id} onClick={() => showDataset(index)} className="standingsTeamBtn">
                <Avatar variant="round" alt="McDave Sweepstakes" src={team.logo} />
            </button>

            ))}
        </>):(<>

        </>)}

        {/* <Button onClick={() => showDataset(0)} variant="outlined" size="small">
            Show Dataset 0
        </Button> */}
    </div>
    <div>
    </div>
    {/* <div className="graphBtnContainer">
        {chartData.map((dataset, index) => (<>
            <Button variant="outlined" size="small" key={index} onClick={() => handleShowDataset(index)}>
                {dataset.label}
            </Button>
        </>))}
    </div> */}


    </>
    )};

export default StandingsChart;
