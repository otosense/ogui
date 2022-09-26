/// <reference types="react" />
interface IProps {
    options?: any[];
    handleSelectChange: (val: string, i: number) => void;
    handleSave: VoidFunction;
    selectedValues: string[];
    setSelectedValues: (arr: string[]) => void;
}
declare const PipelineMaker: (props: IProps) => JSX.Element;
export default PipelineMaker;
