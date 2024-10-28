// components/MatchupChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const MatchupChart = ({ team1Data, team2Data }) => {
    // Dummy data for category wins or losses over a week
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Configuration for the chart
    const data = {
        labels,
        datasets: [
            {
                label: team1Data.name,
                data: team1Data.data,
                borderColor: team1Data.lineColour,
                backgroundColor: team1Data.bgColour,
                fill: false, // Do not fill under the line
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                // tension: -1  // apparently doesn't do anything lol
            },
            {
                label: team2Data.name,
                data: team2Data.data,
                borderColor: team2Data.lineColour,
                backgroundColor: team2Data.bgColour,
                fill: false, // Do not fill under the line
                cubicInterpolationMode: 'monotone',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true, // Start the Y-axis at zero
                min: 0,
                max: 9,
                title: {
                    display: true,
                    text: 'Category Wins',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Day of the Week',
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default MatchupChart;
