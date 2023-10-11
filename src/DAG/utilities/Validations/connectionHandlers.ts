import { useCallback } from "react";
import { Edge, Connection, addEdge } from "reactflow";
import { some } from "lodash";
import { showToast } from "../ReactToastMessage";

function connectionHandlers(nodes: any[], edges: Edge<any>[], setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>) {

    const isIncomingIsEdgeExist = (target: string | null, targetHandle: string | null | undefined) => {
        return edges.some((edge) => {
            return (edge.targetHandle || edge.target) === target;
        });
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
            return showToast('Error: ' + 'Already having an incoming connection', 'error');
        } else {
            const targetNode = nodes.find((node: { id: string; }) => {
                return node.id === target;
            });
            const income = edges.filter((edge) => edge.target === (target || targetHandle));
            if (income.length >= targetNode?.data?.selects?.hasValue) {
                return showToast('Error: ' + 'Already having an incoming connection', 'error');
            }
        }

        // An outgoing edge already exists, so prevent creating a new connection
        // const outgoingConnections = edges.filter((edge) => edge.source === source);
        // if (outgoingConnections.length > 0) {
        //     const sourceNode = nodes.find((node: { id: string; }) => {
        //         return node.id === source;
        //     });
        //     if (sourceNode.type === 'custom') {
        //         return showToast('Error: ' + 'Already has an outgoing connection', 'error');
        //     }
        // }
        // if (isOutgoingIsEdgeExist(source, sourceHandle)) {
        //     // An outgoing edge already exists, so prevent creating a new connection
        //     return showToast('Error: ' + 'Already having an outgoing connection', 'error');
        // }

        // No outgoing or incoming edge exists, create the new connection
        setEdges((prevEdges: Edge<any>[]) => addEdge(newEdge, prevEdges));
    }, [edges]);
}


export {
    connectionHandlers
};