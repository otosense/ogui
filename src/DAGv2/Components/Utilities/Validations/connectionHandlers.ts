import { useCallback } from "react";
import { Edge, Connection, addEdge } from "reactflow";
import { errorHandler } from "../globalFunction";

function connectionHandlers(nodes: any[], edges: Edge<any>[], setErrorMessage: React.Dispatch<React.SetStateAction<string>>, toggleSnackbar: () => void, setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>) {
    return useCallback((params: Edge | Connection) => {
        const { source, target } = params;

        const sourceNode = nodes.find((node: { id: any; }) => node.id === source);
        // Check if the source node already has an outgoing edge
        const existingOutgoingEdge = edges.find((edge: { source: any; }) => {
            if (sourceNode?.type !== 'textUpdater') {
                return edge.source === source;
            }
        });
        if (existingOutgoingEdge) {
            // An outgoing edge already exists, so prevent creating a new connection
            return errorHandler(setErrorMessage, toggleSnackbar, 'Already having an outgoing connection');
        }

        // Check if the target node already has an incoming edge
        const existingIncomingEdge = edges.find((edge: { target: any; }) => {
            if (sourceNode?.type !== 'textUpdater') {
                return edge.target === target;
            }
        });
        if (existingIncomingEdge) {
            // An incoming edge already exists, so prevent creating a new connection
            return errorHandler(setErrorMessage, toggleSnackbar, 'Already having an incoming connection');
        }

        const newEdge = {
            ...params,
            type: 'smoothstep',
            animated: true,
        };
        // No outgoing or incoming edge exists, create the new connection
        setEdges((prevEdges: any) => addEdge(newEdge, prevEdges));
    }, [nodes, edges]);
}


export {
    connectionHandlers
};