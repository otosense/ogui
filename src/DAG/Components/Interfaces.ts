interface IDropDownNode {
    id: string;
    data: { ddType: string; label: string; initialEdge: string; selects: any; };
    type: string;
    sourcePosition: string;
    funcLists: string[];
    isConnectable: boolean;
    errorMapping: [];
    flowNodes: [];
    loadParamsList: (...args: any[]) => any | void;
}

interface IFlowNode {
    id: string;
    data: {
        label: string; // Replace 'any' with the actual type of 'data' if possible
    };
}

interface IParamsDropDown {
    value: string;
    handleId: string;
    nodeId: string;
    sourcePosition: string;
    data: any;
    selector?: any[];
    isConnectable: boolean;
    labels: string;
    selectedValue: string;
    loadParamsList: (...args: any[]) => any | void;
}

interface ITextEditorNode {
    id: string,
    isConnectable: boolean,
    type: string,
    sourcePosition: string,
    data: { label: string, initialEdge: string; },
    errorMapping: any[];
}

interface ILoadProps {
    data?: any;
    onDataUploaded?: (data: any) => void;
    type?: string;
    onClose?: () => void;
    userData?: any[] | (() => any[]) | (() => Promise<any[]>);
    onSave?: (...args: any[]) => any | void;
    loadSavedDag?: (...args: any[]) => any | void;

}

interface IEdgeObject {
    id: string;
    markerEnd?: {
        type: string;
    };
    source: any;
    sourceHandle: any;
    target: string;
    targetHandle: any;
    type: string;
    animated: boolean;
}

interface IEdges {
    id: string;
    markerEnd?: { type: string; };
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: any;
};


interface IFuncNode {
    bind: any;
    func: string;
    func_label: string;
    name: string;
    out: string;
}

interface IEachFuncNode {
    name: string;
    func_label: string;
    func: string;
    out: string;
    bind: any;
}

interface INodes {
    id: string;
    data: {
        label: string; userInput: string;
    };
}

interface IDaggerProps {
    DagFuncList: any[] | (() => any[]) | (() => Promise<any[]>),
    LoadDagList: any[] | (() => any[]) | (() => Promise<any[]>);
    onSave: (...args: any) => any | void;
    onloadSavedDag: (...args: any) => any | void;
    loadParamsList: (...args: any) => any | void;
}

interface IDeleteAllEdgesNodes {
    setEdges: any;
    setNodes: any;
    setShowSchema: any;
    handleClose: any;
}


export type {
    IDropDownNode,
    IFlowNode,
    IParamsDropDown,
    ITextEditorNode,
    ILoadProps,
    IEdgeObject,
    IEdges,
    IFuncNode,
    INodes,
    IEachFuncNode,
    IDaggerProps,
    IDeleteAllEdgesNodes
};