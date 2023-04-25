/// <reference types="react" />
interface IProps {
    items: any[];
    steps: any[];
    renderItem: (item: any) => string | JSX.Element;
    stringRepr: (item: any) => string;
    style?: Record<string, string>;
    onAddStep: (step: any, stepNumber: number) => void;
    onModifyStep: (step: any, stepNumber: number) => void;
    onDeleteStep: (step: any, stepNumber: number) => void;
    onShowItems: (stepNumber: number) => void;
    onHideItems: (stepNumber: number) => void;
    onPipelineChange: (steps: any[]) => void;
}
declare const PipelineMaker: {
    (props: IProps): JSX.Element;
    defaultProps: {
        items: never[];
        steps: never[];
        renderItem: (x: any) => string;
        stringRepr: (x: any) => string;
        style: {};
        onAddStep: (step: any, stepNumber: number) => void;
        onModifyStep: (step: any, stepNumber: number) => void;
        onDeleteStep: (step: any, stepNumber: number) => void;
        onShowItems: (stepNumber: number) => void;
        onHideItems: (stepNumber: number) => void;
        onPipelineChange: (steps: any[]) => void;
    };
};
export default PipelineMaker;
