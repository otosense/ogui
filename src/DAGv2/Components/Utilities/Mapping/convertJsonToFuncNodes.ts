import { Viewport } from "reactflow";
import { IEachFuncNode, IEdges, INodes } from "../Interfaces";

export function convertJsonToFuncNodes(jsonData: { nodes: []; edges: []; viewport?: Viewport; }) {
    const { edges, nodes } = jsonData;
    // Preparing the List of funcNodes and varNodes
    let funcNodes = nodes.filter((node: { type: string; }) => node.type === "custom");
    let varNodes = nodes.filter((node: { type: string; }) => node.type !== "custom");
    let mapping: any = [];
    funcNodes.forEach((node: INodes) => {
        // Expected Structure for Backend
        let eachFuncNode: IEachFuncNode = {
            name: "",
            func_label: "",
            out: "",
            func: "",
            bind: undefined
        };
        eachFuncNode['name'] = node.id; // Adding Node id and name of the Mapping function
        eachFuncNode['func_label'] = node.data.label; // Adding Node label to func_label of the Mapping function
        eachFuncNode['func'] = node.data.label; // Adding Node label to func_label of the Mapping function
        let bindObject = {}; // Creating Input connections "bind" to the Mapping function
        edges.map((edge: IEdges) => {
            const edgerIds = (typeof edge.id === 'string' ? edge.id?.split("+") : '');
            if ((edgerIds[0].trim() === (node.id) || (edgerIds[1].trim() === (node.id)) && edge.target === node.id)) {
                varNodes.map((varNode: INodes) => {

                    if (varNode.id === (edge.source)) { // where node Id is the source of the edge then it will be considered as input / bind node 
                        // if (varNode.data.label) {
                        // Object.assign(bindObject, { [varNode.data.label]: varNode.data.label });
                        // [edge.targetHandle] which holds the params name
                        // varNode.data.label  which holds the value in the node
                        Object.assign(bindObject, { [edge.targetHandle]: varNode.data.label });
                        // }
                    }
                });
            }
            eachFuncNode['bind'] = bindObject; // appending the created inputs to bind
            if ((edgerIds[0].trim() === (node.id) || (edgerIds[1].trim() === (node.id)) && edge.source === node.id)) {
                varNodes.map((varNode: INodes) => {
                    if (varNode.id === (edge.target)) { // where node Id is the target of the edge then it will be considered as out node 
                        eachFuncNode['out'] = varNode.data.label;
                    }
                });
            }

        });
        mapping.push(eachFuncNode);
    });
    return mapping;
}