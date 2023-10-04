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

        const incomingConnectionsToTarget = edges.filter((edge) => edge.target === target);
        const outgoingConnectionsFromSource = edges.filter((edge) => edge.source === source);

        // Find the existing incoming connection with the same target handle
        const existingIncomingEdge = incomingConnectionsToTarget.find((edge) => edge.targetHandle === targetHandle);

        if (existingIncomingEdge) {
            // Remove the existing incoming edge
            const updatedEdges = edges.filter((edge) => edge !== existingIncomingEdge);

            // Add the new connection
            setEdges((prevEdges: Edge<any>[]) => [...updatedEdges, { ...connection, type: "smoothstep", animated: true }]);
        } else {
            // No existing incoming edge with the same target handle, add the new connection
            setEdges((prevEdges: Edge<any>[]) => [...prevEdges, { ...connection, type: "smoothstep", animated: true }]);
        }

        // Remove all existing outgoing connections from the same source
        const updatedEdgesAfterSourceRemoval = edges.filter((edge) => edge.source !== source);

        // Find and remove all existing incoming connections with the same target handle
        const updatedEdgesAfterTargetRemoval = updatedEdgesAfterSourceRemoval.filter(
            (edge) => !(edge.target === target && edge.targetHandle === targetHandle)
        );

        // Add the new connection
        setEdges((prevEdges: Edge<any>[]) => [...updatedEdgesAfterTargetRemoval, { ...connection, type: "smoothstep", animated: true }]);

        return true;
    };
}

export { connectionValidation };
