import { errorHandler } from "../globalFunction";

function connectionValidation(nodes: any[], setErrorMessage: React.Dispatch<React.SetStateAction<string>>, toggleSnackbar: () => void) {
    return (connection: any) => {
        const { source, target } = connection;
        const sourceNode = nodes.find((node: { id: string; }) => node.id === source);
        const targetNode = nodes.find((node: { id: string; }) => node.id === target);

        if (!sourceNode || !targetNode) {
            return errorHandler(setErrorMessage, toggleSnackbar, 'Invalid connection');
        }
        const sourceType = sourceNode.type;
        const targetType = targetNode.type;

        if (sourceType === targetType) {
            return errorHandler(setErrorMessage, toggleSnackbar, 'Same Connections not allowed');
        }
        return sourceType !== targetType;
    };
}

export {
    connectionValidation
};