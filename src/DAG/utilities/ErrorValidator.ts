export function ValidationError(flowJSON: { nodes: any; edges: any; }) {
    let groupingNode: any = [];
    const { nodes, edges } = flowJSON;

    // console.log({ nodes, edges });
    nodes.filter((node: any) => {
        // if any node label is empty, grouping the nodes
        if (node?.data?.label === '' || node.data?.label === 'new') {
            // console.log('node', node?.data?.label);
            groupingNode.push(node);
        }

        // if the no of parameters is for the func node should get value from varNode, if any empty params exists will group the nodes together
        if (node?.data?.selects?.hasValue) {
            let localInputsValid: any = [];
            // console.log('node', node?.id);
            edges.map((edge: any) => {
                // console.log('edge', edge);
                if (edge.target === node?.id) {
                    localInputsValid.push(edge);
                }
            });
            if (localInputsValid.length !== node?.data?.selects?.hasValue) {
                groupingNode.push(node);
            }

        }
    });
    // console.log('groupingNode', groupingNode);
    return groupingNode;
}

