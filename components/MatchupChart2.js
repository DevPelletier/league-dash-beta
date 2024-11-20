// components/MatchupChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

// Register the required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const MatchupChart = ({ team1Data, team2Data }) => {
    useEffect(() => {
        console.log(team1Data, team2Data);
    }, [team1Data, team2Data]); // Refresh if data changes

    // Dummy data for category wins or losses over a week
    const labels = ['START', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'FINAL'];

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
                tension: 0.4,
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 8,
                // tension: -1  // apparently doesn't do anything lol
            },
            {
                label: team2Data.name,
                data: team2Data.data,
                borderColor: team2Data.lineColour,
                backgroundColor: team2Data.bgColour,
                // fill: true, // Do not fill under the line
                cubicInterpolationMode: 'monotone',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Start the Y-axis at zero
                min: team1Data.yMin,
                max: team1Data.yMax,
                title: {
                    display: true,
                    text: team1Data.yAxis,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Matchup Timeline',
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default MatchupChart;
