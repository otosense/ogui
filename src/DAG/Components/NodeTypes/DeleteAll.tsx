import React from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IDeleteAllEdgesNodes } from '../Interfaces';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';


function DeleteAll(props: IDeleteAllEdgesNodes) {
    const { setEdges, setNodes, setShowSchema, handleClose } = props;
    const deleteHandler = () => {
        // resetting all Edges, Nodes and JSON field
        setNodes([]);
        setEdges([]);
        setShowSchema({
            func_nodes: []
        });
        handleClose();
    };
    return (
        <>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'center' }} >
                Are you sure? This action will delete all nodes and edges, and it cannot be undone.
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, width: '70%', margin: '10px auto', textAlign: 'center' }} >
                <Button variant="contained" onClick={deleteHandler} startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button variant="contained" onClick={handleClose} startIcon={<CloseIcon />}>
                    Close
                </Button>
            </Box>
        </>
    );
}

export default DeleteAll;