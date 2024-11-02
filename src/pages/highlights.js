// import { useRouter } from 'next/router';
// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import VideoPlayer from '../../components/VideoPlayer';
import CopyTextBtn from '../../components/CopytoClipboardBtn';

import yahooImg from '../../public/images/yahoo.png'

import fs from 'fs';
import path from 'path';

export default function HighlightsPage({ highlightVideos }) {
  const [vids, setVids] = useState([])
  const [videosToShow, setVideosToShow] = useState(20); // Initially display 20 videos
  const [expanded, setExpanded] = useState(false); // Track expanded accordion
  const [showLink, setShowLink] = useState(false); // Control link visibility
  const [copyTooltip, setCopyTooltip] = useState("Copy link"); // Tooltip text for copy action

  useEffect(() => {
    setVids([...highlightVideos].reverse());
  }, [highlightVideos]);

  // Increase the number of videos displayed by 20 each time
  const loadMoreVideos = () => {
    setVideosToShow((prev) => prev + 20);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Update state based on expansion
  };

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };  
  
  return (
    <main className="highlights-page">
      <div className="titleContainer">
        <Typography variant="h3">All NHL Highlights</Typography>
      </div>

        {/* <div key={video.id} style={{ marginBottom: '20px' }}>
          <h2>{video.title}</h2>
          <span>{video.url}</span>
        </div> */}
      {/* Team Highlights */}
      <Grid size={8} item container alignItems="center" justifyContent="center" spacing={2} className="teamHighlights">
        {/* <button onClick={toggleFilter}>
        Toggle to {toggle ? 'Option 2' : 'Option 1'}
        </button> */}
        {/* { (filteredVids.length > 0) ? (<>got filteredVids</>):(<>loading...</>)} */}
        {vids.slice(0, videosToShow).map((vid, index) => (
        <Accordion 
          key={index} 
          expanded={expanded === index} 
          onChange={handleChange(index)}
          className="hl-item"
          id={vid.gameId + "-" + vid.player1Id }
        >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            // className="titleContainer"
            >
            <div className="hl-titleContainer">
              <div className="playerInfo">
                <Avatar alt="" src={vid.playerData[vid.player1Id]?.headshot} className="headshot"
                sx={{ width: 60, height: 60 }}
                variant="square"
                />
                <div className="playerInfoGrid">
                  <Typography variant="body1" className="name">{vid.playerData[vid.player1Id]?.name}</Typography>
                  <div className="teamDetails">
                    <Avatar alt="" src={vid.playerData[vid.player1Id]?.teamLogo}
                    sx={{ width: 20, height: 20 }}
                    variant="square"
                    />
                    <Typography variant="caption">
                      {vid.playerData[vid.player1Id]?.team}&nbsp;#{vid.playerData[vid.player1Id]?.num}
                    </Typography>
                  </div>
                  <Typography variant="body2" className="date">{vid.gameDate}</Typography>
                </div>
              </div>
              <div className="vidDescrip">
                <div className="row1">
                  <Typography variant="body1">{vid.title}</Typography>
                </div>
                <div className="row2">
                  <Typography variant="subtitle2">{vid.description}</Typography>
                </div>
              </div>
            </div>
            </AccordionSummary>
            <AccordionDetails className="vidContainer">
              {/* Conditionally render the video only when expanded */}
              {expanded === index && (<>
                <Typography variant="subtitle2" className="goalInfo">
                    {vid.player1Name}({vid.player1Goals})
                    {vid.player2Name && <span> from {vid.player2Name}({vid.player2Assists})</span>}
                    {vid.player3Name && <span> and {vid.player3Name}({vid.player3Assists})</span>}
                </Typography>
                <VideoPlayer 
                  videoUrl={vid.url}
                />
                <div className="btnContainer share">
                  {/* <CopyTextBtn text={'https://mcdave-dash-beta.vercel.app/highlights#' + vid.gameId + "-" + vid.player1Id} /> */}
                </div>
              </>)}
            </AccordionDetails>
        </Accordion>
      ))}
      </Grid>




      {videosToShow < highlightVideos.length && (
        <div className="btnContainer">
          <Button variant="contained" onClick={loadMoreVideos} style={{ marginTop: '20px' }}>
            Load More
          </Button>
        </div>
      )}
    </main>
  );
}

// Fetch video data from the local JSON file at build time
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'highlightsWithPlayers.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const highlightVideos = JSON.parse(fileContents);

  return {
    props: {
      highlightVideos,
    },
  };
}
