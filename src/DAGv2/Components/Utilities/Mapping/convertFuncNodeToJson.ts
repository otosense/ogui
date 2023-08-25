import { IFuncNode, IEdges, IEdgeObject } from "../Interfaces";

export function convertFuncNodeToJsonNode(jsonData: { func_nodes: IFuncNode[]; }) {
    // converting the user give / selected from the Dag List node into UI understanding Nodes
    const { func_nodes } = jsonData;
    // expected node structure is mentioned below
    let initialNodes: { id: string; type: string; data: { label: string; }; }[] = [];
    let varNodeCollection: any[] = []; // Creating node collection
    let outNodeCollection: string[] = []; // Creating Edge collection
    func_nodes?.map((funcNode, index: number) => {
        const funcObject = { // Converting it as function node will takes place here
            id: funcNode.name,
            type: 'custom',
            data: {
                label: funcNode.func_label,
                selects: funcNode.func_label
            },
            position: { x: randomPosition(), y: randomPosition() },
            // position: { x: 0, y: 0 },
        };
        initialNodes.push(funcObject); // creating the Nodes

        Object.values(funcNode.bind).map(varNode => { // pushing varNode and funcNode into bind
            varNodeCollection.push(varNode);
            outNodeCollection.push(funcNode.out);
        });
    });
    const varNodes = [...new Set([...new Set(varNodeCollection)].concat([...new Set(outNodeCollection)]))];
    varNodes.map((varNode, index) => {
        const varObject = { // Converting it as varNode will takes place here
            id: varNode,
            type: 'textUpdater',
            data: {
                label: varNode
            },
            position: { x: randomPosition(), y: randomPosition() },
            // position: { x: 0, y: 0 },
        };
        initialNodes.push(varObject);
    });
    return initialNodes;
}

export function randomPosition() {
    return Math.floor(Math.random() * 350);
}
export function convertFuncNodeToJsonEdge(jsonData: { func_nodes: IFuncNode[]; }) {
    // converting the user give / selected from the Dag List node into UI understanding Edges
    const { func_nodes } = jsonData;
    let initialEdges: IEdges[] = [];
    func_nodes?.map((funcNode) => {
        const edgeObject: IEdgeObject = { // Creating edges for nodes
            id: `${funcNode.out + "." + funcNode.name}_edge`,
            markerEnd: { type: 'arrowclosed' },
            source: funcNode.name,
            target: funcNode.out,
            targetHandle: funcNode.out,
            sourceHandle: funcNode.name,
            type: 'smoothstep',
            animated: true,
        };
        initialEdges.push(edgeObject);


        Object.values(funcNode.bind).map((varNode, index) => {
            const edgeObject: IEdgeObject = { // Creating edges for bind / input params Nodes for each funcNodes
                id: `${funcNode.out + "." + funcNode.name}_edge`,
                markerEnd: { type: 'arrowclosed' },
                source: varNode,
                sourceHandle: funcNode.func_label,
                target: funcNode.name,
                targetHandle: Object.keys(funcNode.bind)[index],
                type: 'smoothstep',
                animated: true
            };

            initialEdges.push(edgeObject);
        });

    });
    return initialEdges;
};

// { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
// { id: 'e1-3', source: '1', target: '3', animated: true },

// id
// :
// "variable_0 + function_4";
// markerEnd
// :
// { type: 'arrowclosed'; }
// source
// :
// "variable_0";
// sourceHandle
// :
// "a";
// target
// :
// "function_4";
// targetHandle
// :
// null;