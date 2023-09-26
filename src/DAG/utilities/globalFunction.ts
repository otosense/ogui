// const pythonIdentifierPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

const pythonIdentifierPattern = /^$|^[a-zA-Z_][a-zA-Z0-9_]*$/;  // allowEmpty Spaces in Input
const dagDirections = 'left';
const customRemoveText = "_remove";
// Generating Random ID for nodes
const getId = (type: string) => `${(type === 'input' || type === 'textUpdater') ? 'variable_' + Math.floor(Math.random() * 1000) : 'function_' + Math.floor(Math.random() * 1000)}`;

export {
    pythonIdentifierPattern,
    dagDirections,
    getId,
    customRemoveText
};



// const data = {
//     id: 'sample_1',
//     func_nodes: [
//         {
//             name: 'function_287',
//             func_label: 'apply_fitted_model',
//             out: 're',
//             func: 'apply_fitted_model',
//             bind: { tagged_data: 'a1', preprocess_pipeline: 'a2', fitted_model: 'a3' }
//         }
//     ]

// };

// const funcToJsonNode: any = convertFuncNodeToJsonNode(data);
// const funcToJsonEdge: any = convertFuncNodeToJsonEdge(data);
// console.log('funcToJsonEdge', funcToJsonEdge);
// console.log('funcToJsonNode', funcToJsonNode);
// setNodes(funcToJsonNode);
// setEdges(funcToJsonEdge);



// import { createGlobalState } from "react-hooks-global-state";

// const initialState = {
//     paramsCount: 0
// };

// let { setGlobalState, useGlobalState } = createGlobalState(initialState);

// export { setGlobalState, useGlobalState };
