import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import Button from '@mui/material/Button';

// Register the required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

// Function to calculate Playoff Point Differential
const calculatePointDifferential = (datasets) => {
    const weeks = datasets[0].data.length; // Number of weeks
  
    // Create a deep copy of the datasets to avoid mutating the original data
    const newDatasets = datasets.map((dataset) => ({
      ...dataset,
      data: [...dataset.data],
    }));
  
    // Loop through each week and calculate the point differential
    for (let week = 0; week < weeks; week++) {
      const pointsThisWeek = newDatasets.map((dataset) => dataset.data[week]);
      const playoffThreshold = pointsThisWeek.sort((a, b) => b - a)[7] || 0; // 8th place points
  
      newDatasets.forEach((dataset) => {
        dataset.data[week] = dataset.data[week] - playoffThreshold;
      });
    }
  
    return newDatasets;
};

// Function to convert RGB to RGBA
function rgbToRgba(color, alpha) {
    console.log(color)
    const { r, g, b } = color;
    console.log(`rgba(${r}, ${g}, ${b}, ${alpha})`)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgba(hex, alpha) {
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




const StandingsChart = ({ standingsData }) => {

    const [useDifferential, setUseDifferential] = useState(true); // Track toggle state
    const [chartData, setChartData] = useState(standingsData); // Chart data state

    // Run `setChartData` only once when the component loads
    useEffect(() => {
        if (useDifferential) {
            const differentialData = calculatePointDifferential(standingsData); // Calculate differential
            const finalData = addPropertiestoData(differentialData);
            setChartData(finalData);
        } else {
            const finalData = addPropertiestoData(standingsData) 
            setChartData(finalData);
        }
    }, []); // Empty dependency array ensures this runs only once

    // Toggle between original data and point differential
    const toggleData = () => {
        if (useDifferential) {
            // console.log('useStraight')
            const finalData = addPropertiestoData(standingsData) 
            setChartData(finalData); // Revert to original data
        } else {
            // console.log('usePlayoffDiff')
            const differentialData = calculatePointDifferential(standingsData); // Calculate differential
            const finalData = addPropertiestoData(differentialData);
            setChartData(finalData); // Update chart data with differential
        }
        setUseDifferential((prev) => !prev); // Toggle state
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
    const originalArrayLength = standingsData[0].data.length;
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

    return (<>
    <div className="graphContainer">
        <div className="graphContainer-2">
        <Line data={data} options={options} />
        </div>
    </div>
    <div className="graphBtnContainer">
        <Button onClick={toggleData} variant="contained" size="small">
            {useDifferential ? 'Show Season Pts' : 'Show Playoff Position +/-'}
        </Button>
    </div>


    </>
    )};

export default StandingsChart;
