interface ApiResponse {
    signature: {
        parameters: {
            name: string;
        }[];
    };
    // Add other properties if needed
}

interface ApiPayloadAttrName {
    _attr_name: string;
}

// Define the interface for the API payload with "_attr_name" and "k" properties
interface ApiPayloadWithK extends ApiPayloadAttrName {
    k: string[] | string;
}

// Define the interface for the API payload with "_attr_name", "k", and "v" properties
interface ApiPayloadWithV extends ApiPayloadWithK {
    v: any;
}

interface ApiPayloadWithKWithName extends ApiPayloadAttrName {
    k: string;
}

interface IDropDownNode {
    id: string;
    data: { ddType: string; label: string; initialEdge: string; selects: any; };
    type: string;
    sourcePosition: string;
    funcLists: { value: string; label: string; }[];
    isConnectable: boolean;
    errorMapping: [];
    flowNodes: [];
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
    selector: any[];
    isConnectable: boolean;
    labels: string;
    selectedValue: string;
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
}

interface IEdgeObject {
    id: string;
    markerEnd: {
        type: string;
    };
    source: any;
    sourceHandle: any;
    target: string;
    targetHandle: any;
    type: string;
    animated: boolean;
}




export type {
    ApiResponse,
    ApiPayloadAttrName,
    ApiPayloadWithK,
    ApiPayloadWithV,
    IDropDownNode,
    IFlowNode,
    IParamsDropDown,
    ITextEditorNode,
    ApiPayloadWithKWithName,
    ILoadProps,
    IEdgeObject
};