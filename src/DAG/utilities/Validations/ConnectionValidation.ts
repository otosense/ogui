import { showToast } from "../ReactToastMessage";

function connectionValidation(nodes: any[]) {
    return (connection: any) => {
        // Prevent Edge connection from varNode to varNode and funcNode to funcNode
        const { source, target } = connection;
        const sourceNode = nodes.find((node: { id: string; }) => node.id === source);
        const targetNode = nodes.find((node: { id: string; }) => node.id === target);

        if (!sourceNode || !targetNode) {
            showToast('Error: ' + 'Invalid connection', 'error', connection.source);
        }
        const sourceType = sourceNode.type;
        const targetType = targetNode.type;

        if (sourceType === targetType) {
            showToast('Error: ' + 'Same Connections not allowed', 'error', connection.source);
        }
        return sourceType !== targetType;
    };
}

export {
    connectionValidation
};
