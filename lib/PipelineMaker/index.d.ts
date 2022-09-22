/// <reference types="react" />
interface IProps {
    options: string[];
    handleSelectChange: (val: string, i: number) => void;
    handleSave: VoidFunction;
    selectedValues: string[];
    setSelectedValues: (arr: string[]) => void;
    isMixedData?: boolean;
    mixedData?: any;
    filterMixedDataFunc?: (data: any) => string[];
}
declare const PipelineMaker: (props: IProps) => JSX.Element;
export default PipelineMaker;
