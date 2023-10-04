import { showToast } from "../ReactToastMessage";
import { Edge } from "reactflow";


function connectionValidation(nodes: any[], edges: any[], setEdges: React.Dispatch<React.SetStateAction<any[]>>) {
    return (connection: any) => {
        const { source, target, targetHandle, sourceHandle } = connection;
        const sourceNode = nodes.find((node: { id: string; }) => node.id === source);
        const targetNode = nodes.find((node: { id: string; }) => node.id === target);

        if (!sourceNode || !targetNode) {
            showToast('Error: ' + 'Invalid connection', 'error');
            return false;
        }

        const sourceType = sourceNode.type;
        const targetType = targetNode.type;

        if (sourceType === targetType) {
            showToast('Error: ' + 'Same Connections not allowed', 'error');
            return false;
        }

        // // Check if the target node already has an incoming connection
        // const incomingConnections = edges.filter((edge) => edge.target === target);

        // console.log('targetNode', targetNode);
        // if (targetNode === 'custom') {
        //     if (incomingConnections.length > 0) {
        //         showToast('Error: ' + 'Target node already has an incoming connection', 'error');
        //         return false; // Return false to prevent the connection
        //     }
        // }



        const incomingConnectionsToTarget = edges.filter((edge) => edge.target === target);

        // Find the existing incoming connection with the same target handle
        const existingIncomingEdge = incomingConnectionsToTarget.find((edge) => edge.targetHandle === targetHandle);

        if (existingIncomingEdge) {
            // Replace the existing incoming edge with the new connection
            const updatedEdges = edges.map((edge) => {
                if (edge === existingIncomingEdge) {
                    return { ...connection, type: "smoothstep", animated: true };

                }
                return edge;
            });
            setEdges(updatedEdges);
        } else {
            // No existing incoming edge with the same target handle, add the new connection
            if (sourceType !== 'custom') {
                setEdges((prevEdges: Edge<any>[]) => [...prevEdges, { ...connection, type: "smoothstep", animated: true }]);
            }

        }


        // Check if the source node is 'custom' and if the source node already has an outgoing connection
        if (sourceType === 'custom') {
            const outgoingConnectionsFromSource = edges.filter((edge) => edge.source === source);
            if (outgoingConnectionsFromSource.length > 0) {
                showToast('Error: ' + 'Source node already has an outgoing connection', 'error');
                return false; // Return false to prevent the connection
            }
        }


        return true;
    };
}

export { connectionValidation };
