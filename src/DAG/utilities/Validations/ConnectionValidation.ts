import { showToast } from "../ReactToastMessage";

function connectionValidation(nodes: any[], edges: any[]) {
    /*
       Note: Connections Validation list
       1. Same type of connections are not allowed ( varNode to varNode || funcNode to funcNode)
       2. funcNode already has an incoming connection
       3. funcNode already has an outgoing connection
    */
    return (connection: any) => {
        // Prevent Edge connection from varNode to varNode and funcNode to funcNode
        const { source, target } = connection;
        const sourceNode = nodes.find((node: { id: string; }) => node.id === source);
        const targetNode = nodes.find((node: { id: string; }) => node.id === target);

        if (!sourceNode || !targetNode) {
            showToast('Error: ' + 'Invalid connection', 'error');
            return false; // Return false to prevent the connection
        }
        const sourceType = sourceNode.type;
        const targetType = targetNode.type;

        if (sourceType === targetType) {
            showToast('Error: ' + 'Same Connections not allowed', 'error');
            return false; // Return false to prevent the connection
        }

        // Check if the target node already has an incoming connection
        const incomingConnections = edges.filter((edge) => edge.target === target);
        if (incomingConnections.length > 0) {
            showToast('Error: ' + 'Target node already has an incoming connection', 'error');
            return false; // Return false to prevent the connection
        }

        // Check if the source node is 'custom' and if the source node already has an outgoing connection
        if (sourceType === 'custom') {
            const outgoingConnectionsFromSource = edges.filter((edge) => edge.source === source);
            if (outgoingConnectionsFromSource.length > 0) {
                showToast('Error: ' + 'Source node already has an outgoing connection', 'error');
                return false; // Return false to prevent the connection
            }
        }
        // Forbid children to ancestor connection (not working as expected)
        // if (sourceNode?.data?.label === targetNode?.data?.label) {
        // if (sourceNode?.data?.label === targetNode?.func_nodes?.out) {
        //     showToast('Error: ' + 'Forbid children to ancestor connection', 'error');
        //     return false; // Return false to prevent the connection
        // }
        return true; // Allow the connection if all checks pass
    };
}

export {
    connectionValidation
};
