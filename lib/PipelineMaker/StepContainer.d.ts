/// <reference types="react" />
interface IProps {
    children: JSX.Element;
    index: number;
    onClick: (index: number) => void;
}
declare const StepContainer: (props: IProps) => JSX.Element;
export default StepContainer;
