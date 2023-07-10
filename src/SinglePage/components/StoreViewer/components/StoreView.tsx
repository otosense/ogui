import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { annotationSample } from '../assets/data';

interface Child {
    id: string;
    name: string;
    children?: Child[];
}

interface Device {
    id: string;
    name: string;
    children?: Child[];
}
let index: number;
const StoreView = () => {
    const [deviceNodes, setDeviceNodes] = useState<Device[]>([]);
    // const [index, setIndex] = useState(0);

    useEffect(() => {
        const transformData = (annotations: any[]) => {
            const transformedNodes: Device[] = [];

            annotations.forEach((annotation) => {
                for (const key in annotation) {
                    const elements = annotation[key];
                    const children: Child[] = [];

                    elements.forEach((element: any) => {
                        const child: Child = {
                            id: element.id.toString(),
                            // name: element.name,
                            children: element.annotation || [],
                        };

                        for (const field in element) {
                            if (field !== 'annotation') {
                                child[field] = element[field];
                            }
                        }

                        children.push(child);
                    });

                    const deviceNode: Device = {
                        id: key,
                        name: key,
                        children,
                    };

                    transformedNodes.push(deviceNode);
                }
            });

            return transformedNodes;
        };

        const transformedNodes = transformData(annotationSample);
        setDeviceNodes(transformedNodes);
    }, []);

    const renderTree = (nodes: Child, i: number) => (
        <>
            <TreeItem key={nodes.id} nodeId={nodes.id} label={`${i + 1 || nodes.id}`}>
                {Object.entries(nodes).map(([key, value], index) => {
                    if (key !== 'id' && key !== 'name' && key !== 'children') {
                        return (
                            <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />
                        );
                    }
                    return null;
                })}
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node, i) => renderTree(node, i))
                    : null}
            </TreeItem>
        </>
    );

    return (
        <TreeView
            aria-label="Store View"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {deviceNodes.map((node, i) => renderTree(node, i))}
        </TreeView>
    );
};

export default React.memo(StoreView);
