/// <reference types="react" />
interface IProps {
    stepNumber: number;
    value: any;
    items: any[];
    renderItem: (item: any) => string | JSX.Element;
    stringRepr: (item: any) => string;
    darkMode: boolean;
    onChange: (stepNumber: number, value: any) => void;
    onDelete: (stepNumber: number) => void;
    onOpen: (stepNumber: number) => void;
    onClose: (stepNumber: number) => void;
}
declare const StepSelect: (props: IProps) => JSX.Element;
export default StepSelect;
