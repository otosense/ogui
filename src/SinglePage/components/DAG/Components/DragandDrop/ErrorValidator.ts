export function ValidationError(flowJSON: { nodes: any; edges: any; }) {
    let groupingNode: any = [];
    const { nodes, edges } = flowJSON;
    nodes.filter((node: any) => {
        if (node?.data?.label === '' || node.data?.label === 'new') {
            console.log('node', node?.data?.label);
            groupingNode.push(node);
        }
    });
    return groupingNode;
}

