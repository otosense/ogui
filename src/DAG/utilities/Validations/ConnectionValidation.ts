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
        // // console.log({ incomingConnections });
        // if (incomingConnections.length > 0) {
        //     return edges.some((edge) => {
        //         if (edge.target === target && edge.targetHandle === targetHandle) {
        //             showToast('Error: ' + 'Target node already has an incoming connection', 'error');
        //             return false;
        //         }
        //     });
        // }

        // const outgoingConnections = edges.filter((edge) => edge.source === source);
        // console.log({ outgoingConnections });
        // if (outgoingConnections.length > 0) {
        //     return edges.some((edge) => {
        //         if (edge.source === source && edge.sourceHandle === sourceHandle) {
        //             showToast('Error: ' + 'Source node already has an outgoing connection', 'error');
        //             return false;
        //         }
        //     });
        // }


        // console.log('targetNode', targetNode);
        // if (targetNode === 'custom') {
        //     if (incomingConnections.length > 0) {
        //         showToast('Error: ' + 'Target node already has an incoming connection', 'error');
        //         return false; // Return false to prevent the connection
        //     }
        // }



        return true;
    };
}

export { connectionValidation };
