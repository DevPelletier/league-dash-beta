import React from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';

const MyComponent = ({ text }) => {
  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (<>
      <Button variant="outlined" onClick={copyTextToClipboard}>
        Copy Link to Highlight <ShareIcon />
      </Button>
</>);
};

export default MyComponent;