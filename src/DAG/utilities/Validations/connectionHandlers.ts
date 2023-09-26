import { useCallback } from "react";
import { Edge, Connection, addEdge } from "reactflow";
import { errorHandler } from "../globalFunction";
import { some } from "lodash";

function connectionHandlers(edges: Edge<any>[], setErrorMessage: React.Dispatch<React.SetStateAction<string>>, toggleSnackbar: () => void, setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>) {

    const isIncomingIsEdgeExist = (target: string | null, targetHandle: string | null | undefined) => {
        return edges.some((edge) => edge.target === target && edge.targetHandle === targetHandle);
    };

    const isOutgoingIsEdgeExist = (source: string | null, sourceHandle: string | null | undefined) => {
        return edges.some((edge) => edge.source === source && edge.sourceHandle === sourceHandle);
    };



    // const isIncomingIsEdgeExist = (target: string | null, targetHandle: string | null | undefined) =>
    //     some(edges, { target, targetHandle });

    // const isOutgoingIsEdgeExist = (source: string | null, sourceHandle: string | null | undefined) =>
    //     some(edges, { source, sourceHandle });

    return useCallback((params: Edge | Connection) => {
        // Connection Rules are handled here
        const { source, target, targetHandle, sourceHandle } = params;
        const newEdge = {
            ...params,
            type: 'smoothstep',
            animated: true,
        };
        //  Check if the target node / function Node parameter already has an incoming edge
        if (isIncomingIsEdgeExist(target, targetHandle)) {
            // An incoming edge already exists, so prevent creating a new connection
            return errorHandler(setErrorMessage, toggleSnackbar, 'Already having an incoming connection');
        }

        // if (isOutgoingIsEdgeExist(source, sourceHandle)) {
        //     // An outgoing edge already exists, so prevent creating a new connection
        //     return errorHandler(setErrorMessage, toggleSnackbar, 'Already having an outgoing connection');
        // }

        // No outgoing or incoming edge exists, create the new connection
        setEdges((prevEdges: Edge<any>[]) => addEdge(newEdge, prevEdges));
    }, [edges]);
}


export {
    connectionHandlers
};