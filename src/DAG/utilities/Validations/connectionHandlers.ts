import { useCallback } from "react";
import { Edge, Connection, addEdge } from "reactflow";

function connectionHandlers(nodes: any[], edges: Edge<any>[], setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>) {
    return useCallback((params: Edge | Connection) => {
        // Connection Rules are handled by connectionValidation
        const { source, target, targetHandle, sourceHandle } = params;
        const newEdge = {
            ...params,
            type: 'smoothstep',
            animated: true,
        };

        setEdges((prevEdges: Edge<any>[]) => addEdge(newEdge, prevEdges));
    }, [edges]);
}


export {
    connectionHandlers
};