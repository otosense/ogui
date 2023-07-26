// export function ValidationError(MappedJson: { func_nodes: any[]; }) {
//     let errorFuncNode = {};
//     const { func_nodes } = MappedJson;
//     console.log({ func_nodes });
//     let groupingNode: any = [];
//     func_nodes.filter((funcNode: any) => {
//         if (funcNode.out === '') {
//             groupingNode.push(funcNode);
//             errorFuncNode = funcNode;
//         }
//         console.log('Object.keys(funcNode?.bind).length === 0', Object.keys(funcNode?.bind));
//         if (Object.keys(funcNode?.bind).length === 0) {
//             groupingNode.push(funcNode);
//         }
//     });
//     return groupingNode;
// }

export function ValidationError(flowJSON) {
    let groupingNode: any = [];
    const { nodes, edges } = flowJSON;
    nodes.filter((node: any) => {
        if (node?.data?.label === '') {
            console.log('node', node?.data?.label);
            groupingNode.push(node);
        }
    });
    return groupingNode;
}

