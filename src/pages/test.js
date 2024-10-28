// pages/nhl-team.js
import { useEffect, useState } from 'react';

export default function NHLTeam() {
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch('/api/test'); // Replace with your desired team ID

                if (!response.ok) {
                    throw new Error('Error fetching team data');
                }

                const data = await response.json();
                console.log(data);
                setTeamData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {/* <h1>{teamData.teams[0].name}</h1>
            <p>Location: {teamData.teams[0].locationName}</p>
            <p>Venue: {teamData.teams[0].venue.name}</p>
            <p>Conference: {teamData.teams[0].conference.name}</p>
            <p>Division: {teamData.teams[0].division.name}</p> */}
        </div>
    );
}
