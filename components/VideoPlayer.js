// components/VideoPlayer.js
import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ videoUrl }) => {
    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', backgroundColor: '#000' }}>
            <iframe
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    width: '100%',
                    height: '450px', // Directly set the height here to ensure visibility
                }}
            />
        </div>
    );
};

VideoPlayer.propTypes = {
    videoUrl: PropTypes.string.isRequired,
};

export default VideoPlayer;
