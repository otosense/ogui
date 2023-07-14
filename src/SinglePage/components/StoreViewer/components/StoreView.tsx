import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import TreeItem from '@mui/lab/TreeItem';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TextField from '@mui/material/TextField/TextField';
import LoadingOverlay from '../../../utilities/Loader';
import Button from '@mui/material/Button/Button';

import * as API from '../API/API';

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
    const fetchSize = 10;

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [passer, setPasser] = useState({ "from_": Number(0), "to_": Number(fetchSize) });
    const [storeData, setStoreData] = useState({ data: [] });



    const { data, status, error, isLoading } = useQuery({
        queryKey: ['StoreConfig', passer],
        queryFn: async () => {
            return API.StoreConfig(passer);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 1 * 60 * 1000, // 1 minute
        // onSuccess: (data) => {
        //     setStoreData((prevData: any) => ({
        //         ...prevData,
        //         data: [...prevData.data, ...data.data],
        //     }));
        // },
    });


    const loadMore = () => {
        setPasser({ "from_": Number(passer.to_), "to_": Number(passer.to_ + fetchSize) });
    };


    useEffect(() => {
        if (!isLoading && status === 'success' && data) {
            setStoreData((prevData: any) => {
                const newData = data.data.filter((newItem: { id: any; }) => {
                    // Check if the newItem already exists in prevData.data
                    return !prevData.data.some((item: { id: any; }) => item.id === newItem.id);
                });

                return {
                    ...prevData,
                    data: [...prevData.data, ...newData],
                };
            });
        }
    }, [data, isLoading, status]);

    useEffect(() => {
        if (storeData.data) {
            // Filter the data based on the search query
            const filteredData = filterData(storeData.data, searchQuery);
            setSearchResults(filteredData);
        }
    }, [storeData, searchQuery]);

    // useEffect(() => mutate({
    //     "from_": Number(0),
    //     "to_": Number(100)
    // }), []);

    // const queryClient = useQueryClient();
    // const newLocal = async () => {
    //     return API.StoreConfig(passer);
    // };
    // const { data, status, error, isLoading, mutate } = useMutation(API.StoreConfig);

    // { console.log({ data, status, error, isLoading }); }
    const handleSearchQueryChange = (event: { target: { value: string; }; }) => {
        setSearchQuery(event.target.value);
    };

    const filterData = (nodes: string | any[], query: string) => {
        const filteredNodes = nodes?.filter((node: { id: string; children: string | any[]; }) => {
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

    if (error) {
        return <div className="error">{`Error: ${error}`}</div>;
    }
    return (
        <>
            {isLoading && <LoadingOverlay />}
            <section className="topLayout">
                <TextField fullWidth id="myInput" label="Search Session Id" variant="outlined" name="sessionId" defaultValue={searchQuery} className='sessionIdBox' onChange={handleSearchQueryChange} required />
                <Button variant="contained" onClick={loadMore} >Load More</Button>
            </section>

            <section className='storeViewerLayout'>
                <TreeView
                    aria-label="Store View"
                    // defaultCollapseIcon={<ExpandMoreIcon />}
                    // defaultExpandIcon={<ChevronRightIcon />}
                    defaultCollapseIcon={<IndeterminateCheckBoxIcon />}
                    defaultExpandIcon={<AddBoxIcon />}

                >
                    {searchResults.length > 0 ? (
                        searchResults.map((node, i) => renderTree(node, true, i, searchQuery))
                    ) : (!isLoading && <TreeItem nodeId="no-results" label="No matching nodes found" />)
                    }
                </TreeView>
            </section>
        </>
    );


};

export default React.memo(StoreView);
