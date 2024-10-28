import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { teamId } = req.query; // You can pass a team ID as a query parameter if needed

    try {
        // Example endpoint to get data for a specific NHL team
        const response = await fetch(``);
        // GET SPECIFIC GAME HIGHLIGHTS
        // https://api-web.nhle.com/v1/wsc/game-story/GAME_ID

        // GET NEXT WEEK OF GAMES api endpoint => this is to get the game IDs? Could also iterate through the dates with the specific date endpoint... to get all game IDs and dates...
        // https://api-web.nhle.com/v1/score/now
        // https://api-web.nhle.com/v1/score/2023-11-10"

        // ALL PLAYERS STATS api endpoint
        // https://api-web.nhle.com/v1/skater-stats-leaders/20242025/2?categories=toi&limit=-1
        
        if (!response.ok) {
            throw new Error('Failed to fetch data from the NHL API');
        }

        const data = await response.json();

        // Define the path where the file will be saved
        const filePath = path.join(process.cwd(), 'public', 'teamData.json');

        // Write the data to a JSON file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log(`Data saved to ${filePath}`);

        // Send the fetched data back as the response
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching NHL data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
