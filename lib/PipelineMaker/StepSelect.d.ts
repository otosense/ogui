/// <reference types="react" />
interface IProps {
    items: string[];
    onChange: (val: string, i: number) => void;
    val: string;
    index: number;
}
export declare const selectBox: {
    width: string;
};
declare const StepSelect: (props: IProps) => JSX.Element;
export default StepSelect;
