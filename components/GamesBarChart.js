// components/GamesBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const GamesBarChart = ({ teams }) => {
    // Data for the bar chart
    const labels = teams.map((team) => team.name);

    const totalGamesData = teams.map((team) => team.totalGames);
    const gamesPlayedData = teams.map((team) => team.gamesPlayed);

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Games',
                data: totalGamesData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Lighter color for the total games bar
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                barThickness: 5, // Wider bar for Total Games
            },
            {
                label: 'Games Played',
                data: gamesPlayedData,
                backgroundColor: 'rgba(255, 99, 132, 0.7)', // More opaque color for the games played bar
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barThickness: 20, // Narrower bar for Games Played to overlay
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Games Played & Total Games',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                stacked: true, // Stack bars
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default GamesBarChart;
