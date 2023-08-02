const funcList = [
    {
        "value": "opus.mboxes.wf_to_fvs.chunker",
        "label": "opus.mboxes.wf_to_fvs.chunker",
        "inputs": ['A', 'B', 'C', 'D']
    },
    {
        "value": "opus.mboxes.wf_to_fvs.chks",
        "label": "opus.mboxes.wf_to_fvs.chks",
        "inputs": ['1', '2']
    },
    {
        "value": "opus.mboxes.wf_to_fvs.chks_to_spectrs",
        "label": "opus.mboxes.wf_to_fvs.chks_to_spectrs",
        "inputs": ['i', 'ii', 'iii', 'ix', 'x']
    },
    {
        "value": "opus.mboxes.wf_to_fvs.spectrs",
        "label": "opus.mboxes.wf_to_fvs.spectrs",
        "inputs": ['']
    },
    {
        "value": "opus.mboxes.wf_to_fvs.projector",
        "label": "opus.mboxes.wf_to_fvs.projector",
        "inputs": ['B', 'C', 'D']
    },
    {
        "value": "opus.mboxes.wf_to_fvs.fvs",
        "label": "opus.mboxes.wf_to_fvs.fvs",
        "inputs": ['D']
    },
    {
        "value": "opus.mboxes.wf_to_fvs.list_fvs",
        "label": "opus.mboxes.wf_to_fvs.list_fvs",
        "inputs": ['A', 'F', 'D']
    }
];

const sampleInput = {
    "func_nodes": [
        {
            "name": "function_754",
            "func_label": "opus.mboxes.wf_to_fvs.chks",
            "bind": {
                "1": "w",
                "2": "b"
            },
            "out": "bb"
        }
    ]
};

export {
    funcList,
    sampleInput
};


  // const nodeTypes = useMemo(() => ({
    //     custom: (props: any) => <TextEditorNode {...props} type='funcNode' />,
    //     textUpdater: (props: any) => <TextEditorNode {...props} type='varNode'  />,
    // }), []);

    // const handleUpload = (data: any) => {
    //     const funcToJsonNode: any = convertFuncNodeToJsonNode(data);
    //     const funcToJsonEdge: any = convertFuncNodeToJsonEdge(data);
    //     setNodes(funcToJsonNode);
    //     setEdges(funcToJsonEdge);
    //     setUploadOver(true);
    // };