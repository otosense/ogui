interface IFunctionCallerProps {
    schema: Object; // please refer to Schema File inside assets Folder. that how the schema structure is expected 
    liveValidate: boolean;
    func: (...args: any[]) => any | void;
}

interface IFormData { [key: string]: any; }

export type {
    IFunctionCallerProps,
    IFormData
};