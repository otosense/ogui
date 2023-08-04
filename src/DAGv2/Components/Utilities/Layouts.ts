
// Right now this component is not in use 

import dagre, { Edge } from 'dagre';
import { SetStateAction, useCallback } from 'react';
import { Node } from 'reactflow';

const nodeWidth = 200;
const nodeHeight = 75;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const getLayoutedElements = onLayoutHandlers();
function onLayoutHandlers() {
    return (nodes: any[], edges: any[], direction = 'TB') => {
        const isHorizontal = direction === 'TB';
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node: { id: any; }) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge: { source: any; target: any; }) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        nodes.forEach((node: { id: any; targetPosition: string; sourcePosition: string; position: { x: number; y: number; }; }) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? 'left' : 'top';
            node.sourcePosition = isHorizontal ? 'right' : 'bottom';

            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            node.position = {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            };

            return node;
        });

        return { nodes, edges };
    };
}
function autoLayoutStructure(nodes: any[], edges: any[], setNodes: { (value: React.SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any[]): void; }, setEdges: React.Dispatch<React.SetStateAction<any[]>>) {
    // Handle the different types of Layouts like Horizontal and Vertical


    return useCallback(
        (direction: string | undefined) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges,
                direction
            );
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges]
    );
}

export {
    onLayoutHandlers,
    autoLayoutStructure
};


// layout Panel;

// <Panel position="top-left">
//  <button onClick={() => onLayout('TB')} className='saveBtn'>vertical layout</button>
//  <button onClick={() => onLayout('LR')}>horizontal layout</button>
// </Panel>