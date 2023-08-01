export function ValidationError(flowJSON: { nodes: any; edges: any; }) {
    let groupingNode: any = [];
    const { nodes, edges } = flowJSON;

    // console.log({ nodes, edges });
    nodes.filter((node: any) => {
        if (node?.data?.label === '' || node.data?.label === 'new') {
            // console.log('node', node?.data?.label);
            groupingNode.push(node);
        }

        if (node?.data?.selects?.hasValue) {
            let localInputsValid: any = [];
            // console.log('node', node?.id);
            edges.map((edge: any) => {
                // console.log('edge', edge);
                if (edge.target === node?.id) {
                    localInputsValid.push(edge);
                }

                // console.log('node', node);
                // if (node.type === 'custom') {
                //     // console.log('edge', edge);
                //     if (edge.source !== node?.id) {
                //         console.log('nodenode', node);
                //         groupingNode.push(node);
                //     }
                // }

            });
            if (localInputsValid.length !== node?.data?.selects?.hasValue) {
                groupingNode.push(node);
            }

        }
    });
    // console.log('groupingNode', groupingNode);
    return groupingNode;
}

