import { Graph } from "../Graph";
import { showToast } from "../ReactToastMessage";


function invalidConnection(nodes: any[], edges: any[], connection: any) {
    const sourceNode = nodes.find((node: { id: string; }) => node.id === connection.source);
    const targetNode = nodes.find((node: { id: string; }) => node.id === connection.target);
    return (!sourceNode || !targetNode);
}

function sameTypeConnection(nodes: any[], edges: any[], connection: any) {
    const sourceNode = nodes.find((node: { id: string; }) => node.id === connection.source);
    const targetNode = nodes.find((node: { id: string; }) => node.id === connection.target);
    return (sourceNode.type === targetNode.type)
}

function connectionWillFormCycle(nodes: any[], edges: any[], connection: any) {
    const graph = new Graph();

    edges.forEach((edge) => graph.addEdge(edge.source, edge.target));
    return graph.willFormCycle(connection.source, connection.target);
}

function alreadyHasIncomingConnection(nodes: any[], edges: any[], connection: any) {
    const incomingConnections = edges.filter((edge) => edge.target === connection.target);
    if (incomingConnections.length > 0) {
        return edges.some((edge) => {
            return (edge.target === connection.target && edge.targetHandle === connection.targetHandle);
        });
    }
    return false;
}

// Show error message if any of the following checks return true
const errorChecklist = [
    { check: invalidConnection, message: 'Invalid connection' },
    { check: sameTypeConnection, message: 'Same Connections not allowed' },
    { check: connectionWillFormCycle, message: 'Connection will form a cycle' },
    { check: alreadyHasIncomingConnection, message: 'Target node already has an incoming connection' }
]

function connectionValidation(nodes: any[], edges: any[], setEdges: React.Dispatch<React.SetStateAction<any[]>>) {
    return (connection: any) => {
        return !errorChecklist.some((error) => {
            if (error.check(nodes, edges, connection)) {
                showToast('Error: ' + error.message, 'error');
                return true;
            }
            return false;
        });

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
    };
}

export { connectionValidation };
