import { Viewport } from "reactflow";
import { IEachFuncNode, IEdges, INodes } from "../Interfaces";

export function convertJsonToFuncNodes(jsonData: { nodes: []; edges: []; viewport?: Viewport; }) {
    const { edges, nodes } = jsonData;

    console.log({ edges, nodes });
    let funcNodes = nodes.filter((node: { type: string; }) => node.type === "custom");
    let varNodes = nodes.filter((node: { type: string; }) => node.type !== "custom");
    let mapping: any = [];
    funcNodes.forEach((node: INodes) => {
        let eachFuncNode: IEachFuncNode = {
            name: "",
            func_label: "",
            out: "",
            bind: undefined
        };
        eachFuncNode['name'] = node.id;
        eachFuncNode['func_label'] = node.data.label;
        let bindObject = {};
        edges.map((edge: IEdges) => {
            const edgerIds = (typeof edge.id === 'string' ? edge.id?.split("+") : '');
            if ((edgerIds[0].trim() === (node.id) || (edgerIds[1].trim() === (node.id)) && edge.target === node.id)) {
                varNodes.map((varNode: INodes) => {

                    if (varNode.id === (edge.source)) {
                        // if (varNode.data.userInput) {
                        //     Object.assign(bindObject, { [varNode.data?.userInput]: varNode.data.userInput });
                        // }
                        // if (varNode.data.label) {
                        // Object.assign(bindObject, { [varNode.data.label]: varNode.data.label });
                        Object.assign(bindObject, { [edge.targetHandle]: varNode.data.label });
                        // }
                    }
                });
            }
            eachFuncNode['bind'] = bindObject;
            if ((edgerIds[0].trim() === (node.id) || (edgerIds[1].trim() === (node.id)) && edge.source === node.id)) {
                varNodes.map((varNode: INodes) => {
                    if (varNode.id === (edge.target)) {
                        eachFuncNode['out'] = varNode.data.label;
                    }
                });
            }

        });
        console.log('eachFuncNode', eachFuncNode);
        mapping.push(eachFuncNode);
    });
    return mapping;
}