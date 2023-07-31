import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert, { AlertColor } from '@mui/material/Alert/Alert';

function SnackBar(props: {
    severity: AlertColor | undefined; message: string;
}) {
    console.log('props', props);
    const [open, setOpen] = React.useState(props.message.length > 0);


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                Close
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message=""
                action={action}
            >
                <Alert severity={props.severity}>{props.message}</Alert>
            </Snackbar>
        </div>
    );
}

export default memo(SnackBar);