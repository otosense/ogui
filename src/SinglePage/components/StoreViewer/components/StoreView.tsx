import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import * as API from '../API/API';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TextField from '@mui/material/TextField/TextField';

interface Child {
    id: string;
    name?: string;
    children?: Child[];
    bt?: number[];
    tt?: number[];
}

interface Device {
    id: string;
    name?: string;
    children?: Child[];
    bt?: number[];
    tt?: number[];
}

const handleCopy = (label: string) => {
    navigator.clipboard.writeText(label)
        .then(() => {
            // console.log("Text copied to clipboard: ", label);
            // Add your desired feedback or notification here
            // return <h1>Copied</h1>;
            alert("Id Copied" + ' ' + label);
        })
        .catch((error) => {
            // console.error("Failed to copy text: ", error);
            // Add your desired error handling here
        });
};

const renderTree = (nodes: any, isRoot: boolean, i: number, searchQuery: string) => (
    <section key={i} style={{ position: 'relative' }}>
        {isRoot && <button className='copy' onClick={() => handleCopy(`${nodes.id}`)} title='Click to Copy'>
            {/* <img src={InfoOutlinedIcon} alt='copyButton' /> */}
            <InfoOutlinedIcon />
        </button>}
        <TreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
            {Object.entries(nodes).map(([key, value], index) => {
                if (key !== 'id' && key !== 'name' && key !== 'children' && key !== 'channels' && key !== 'annotations') {
                    // Check if the key or value matches the search query
                    // const isMatch = key.toLowerCase().includes(searchQuery.toLowerCase()) || value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
                    // console.log('isMatch', isMatch);
                    // Highlight the matched portion with a yellow background color
                    // const labelContent = isMatch ? (
                    //     <span style={{ backgroundColor: 'yellow' }}>
                    //         {`${key}: ${value}`}
                    //     </span>
                    // ) : (
                    //     `${key}: ${value}`
                    // );
                    return (
                        <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />
                    );
                }
                return null;
            })}
            {Array.isArray(nodes.children) ? (
                nodes.children.map((node: any, i: any) => renderTree(node, true, i, searchQuery))
            ) : null}
            {Array.isArray(nodes.channels) ? (
                <TreeItem nodeId={`${nodes.id}-channels`} label="Channels">
                    {nodes.channels.map((channel: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, index: any) => (
                        <TreeItem
                            key={`${nodes.id}-channel-${index}`}
                            nodeId={`${nodes.id}-channel-${index}`}
                            label={channel}
                        />
                    ))}
                </TreeItem>
            ) : null}
            {Array.isArray(nodes.annotations) ? (
                <TreeItem nodeId={`${nodes.id}-annotations`} label="Annotations">
                    {nodes.annotations.length > 0 ? (
                        nodes.annotations.map((annotation: any, index: number) => (
                            Object.entries(annotation).map(([key, value], index) => (
                                <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />
                            ))
                        ))
                    ) : (
                        <TreeItem nodeId={`${nodes.id}-no-annotations`} label="[]">
                        </TreeItem>
                    )}
                </TreeItem>
            ) : null}
        </TreeItem>
    </section>
);


const StoreView = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => mutate({
        "from_": Number(0),
        "to_": Number(100)
    }), []);

    const queryClient = useQueryClient();
    const { data, status, error, isLoading, mutate } = useMutation(API.StoreConfig);
    // { console.log({ data, status, error, isLoading }); }

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        if (data && data.data) {
            // Filter the data based on the search query
            const filteredData = filterData(data.data, searchQuery);
            setSearchResults(filteredData);
        }
    }, [data, searchQuery]);

    const filterData = (nodes, query) => {
        const filteredNodes = nodes.filter((node) => {
            // Check if the node's label matches the search query
            if (node.id.toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
            // Recursively search in the children of the node
            if (node.children && node.children.length > 0) {
                const filteredChildren = filterData(node.children, query);
                return filteredChildren.length > 0;
            }
            return false;
        });
        return filteredNodes;
    };


    if (isLoading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error">{`Error: ${error}`}</div>;
    }
    return (
        <>
            {/* <input type="text" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Search" /> */}
            <TextField fullWidth id="myInput" label="SessionId" variant="outlined" name="sessionId" defaultValue={searchQuery} className='sessionIdBox' onChange={handleSearchQueryChange} required />

            <TreeView
                aria-label="Store View"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {searchResults.length > 0 ? (
                    searchResults.map((node, i) => renderTree(node, true, i, searchQuery))
                ) : (
                    <TreeItem nodeId="no-results" label="No matching nodes found" />
                )}
            </TreeView>
        </>
    );


};

export default React.memo(StoreView);
