import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import * as API from '../API/API';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
            console.log("Text copied to clipboard: ", label);
            // Add your desired feedback or notification here
            // return <h1>Copied</h1>;
            alert("Id Copied" + ' ' + label);
        })
        .catch((error) => {
            console.error("Failed to copy text: ", error);
            // Add your desired error handling here
        });
};

const renderTree = (nodes: any, isRoot: boolean, i: number) => (
    <section key={i} style={{ position: 'relative' }}>
        {isRoot && <button className='copy' onClick={() => handleCopy(`${nodes.id}`)} title='Click to Copy'>
            {/* <img src={InfoOutlinedIcon} alt='copyButton' /> */}
            <InfoOutlinedIcon />
        </button>}
        <TreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
            {Object.entries(nodes).map(([key, value], index) => {
                if (key !== 'id' && key !== 'name' && key !== 'children' && key !== 'channels' && key !== 'annotations') {
                    return (
                        <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />
                    );
                }
                return null;
            })}
            {Array.isArray(nodes.children) ? (
                nodes.children.map((node: any, i: any) => renderTree(node, true, i))
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
    const [deviceNodes, setDeviceNodes] = useState<Device[]>([]);
    const [StoreConfig, setStoreConfig] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setDeviceNodes(StoreConfig);
    }, [StoreConfig]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await API.StoreConfig();
        console.log('response', response);
        setStoreConfig(response?.data || response);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                // Show the loader while loading
                <div>Loading...</div>
            ) : (
                // Render the tree view once the data is loaded
                <TreeView
                    aria-label="Store View"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {deviceNodes.map((node, i) => renderTree(node, true, i))}
                </TreeView>
            )}
        </>
    );
};

export default React.memo(StoreView);
