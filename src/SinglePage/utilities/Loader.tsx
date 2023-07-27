import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    loaderOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        color: 'white'
    },
}));

const LoadingOverlay = () => {
    const classes = useStyles();

    return (
        <div className={classes.loaderOverlay}>

            <Box sx={{ width: '100%' }} alignItems={'center'} style={{ textAlign: 'center' }}>
                <CircularProgress color="primary" />
                <Typography variant="h5" gutterBottom>
                    Data is being Fetching
                </Typography>
            </Box>
        </div>
    );
};

export default LoadingOverlay;