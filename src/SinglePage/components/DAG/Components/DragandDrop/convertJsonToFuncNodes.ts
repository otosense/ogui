export function convertJsonToFuncNodes(jsonData: any) {
    console.log('jsonData', jsonData);
    const { edges, nodes } = jsonData;

    console.log({ edges, nodes });
    let funcNodes = nodes.filter((node: { type: string; }) => node.type === "custom");
    let varNodes = nodes.filter((node: { type: string; }) => node.type !== "custom");
    let mapping: any[] = [];
    funcNodes.forEach((node: {
        id: any; data: {
            label: any; userInput: any;
        };
    }) => {

        console.log('node', node);
        let eachFuncNode: any = {};
        eachFuncNode['name'] = node.id;
        eachFuncNode['func_label'] = node.data.label;
        let bindObject = {};
        edges.map((edge: {
            targetHandle: any; id: string | any[]; target: any; source: any;
        }) => {
            const edgerIds = (edge.id?.split("+"));
            if ((edgerIds[0].trim() === (node.id) || (edgerIds[1].trim() === (node.id)) && edge.target === node.id)) {
                varNodes.map((varNode: {
                    id: string | any[]; data: {
                        label: any; userInput: any;
                    };
                }, i) => {
                    // console.log('varNode', varNodes[i], i);
                    if (varNode.id === (edge.source)) {
                        console.log('varNode.data', varNode.data);
                        // if (varNode.data.userInput) {
                        //     Object.assign(bindObject, { [varNode.data?.userInput]: varNode.data.userInput });
                        // }
                        // if (varNode.data.label) {
                        Object.assign(bindObject, { [edge.targetHandle]: varNode.data.label });
                        // Object.assign(bindObject, { [node?.data?.params[i]]: varNode.data.label });
                        // node.data.params.map(x => {

                        //     return Object.assign(bindObject, { [x]: varNodes[i].data.label });
                        // });
                        // }
                    }
                });
            }
            eachFuncNode['bind'] = bindObject;
            if ((edgerIds[0].trim() === (node.id) || (edgerIds[1].trim() === (node.id)) && edge.source === node.id)) {
                varNodes.map((varNode: {
                    id: string | any[]; data: {
                        label: any; userInput: any;
                    };
                }) => {
                    if (varNode.id === (edge.target)) {
                        eachFuncNode['out'] = varNode.data.label;
                    }
                });
            }

        });

        mapping.push(eachFuncNode);
    });
    return mapping;
}