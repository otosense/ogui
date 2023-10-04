import { Edge } from "reactflow";
import { showToast } from "../ReactToastMessage";

function connectionValidation(nodes: any[], edges: any[], setEdges: React.Dispatch<React.SetStateAction<any[]>>) {
    return (connection: any) => {
        const { source, target, targetHandle } = connection;
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
            setEdges((prevEdges: Edge<any>[]) => [...prevEdges, { ...connection, type: "smoothstep", animated: true }]);

        }

        return true;
    };
}

export { connectionValidation };
