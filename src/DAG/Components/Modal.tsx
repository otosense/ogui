import React from 'react';
import { Modal, Box, Typography, Button, Paper } from '@mui/material';

const CustomModal = ({ open, handleClose, title, content }: any) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                }}
            >
                <Paper elevation={3} sx={{ padding: 1 }}>
                    <h3 className="ModalTitle"> {title}</h3>
                    <Typography variant="body2" gutterBottom>
                        {content}
                    </Typography>
                </Paper>
            </Box>
        </Modal>
    );
};

export default CustomModal;
