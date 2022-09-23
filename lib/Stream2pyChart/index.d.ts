/// <reference types="react" />
interface IProps {
    arr: {
        X: number;
    }[];
    setArr: VoidFunction;
    speed: number;
}
declare const Stream2pyChart: (props: IProps) => JSX.Element;
export default Stream2pyChart;
