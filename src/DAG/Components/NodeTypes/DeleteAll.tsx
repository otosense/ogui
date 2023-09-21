import React from 'react';
import { Button, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IDeleteAllEdgesNodes } from '../Interfaces';

function DeleteAll(props: IDeleteAllEdgesNodes) {
    const { setEdges, setNodes, setShowSchema } = props;
    const deleteHandler = () => {
        // resetting all Edges, Nodes and JSON field
        setNodes([]);
        setEdges([]);
        setShowSchema({
            func_nodes: []
        });
    };
    return (
        <Tooltip title="Delete All Nodes and Edges">
            <Button variant="contained" onClick={deleteHandler} startIcon={<DeleteIcon />}>
                Delete
            </Button>
        </Tooltip>
    );
}

export default DeleteAll;