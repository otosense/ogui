/// <reference types="react" />
import { type Column } from './DataTable';
export interface RowProps {
    isExpanded: boolean;
    onClickExpand: VoidFunction;
    renderExpandedData?: () => JSX.Element;
    onSelectItem: VoidFunction;
    data: any;
    columns: Column[];
    id: string;
    isSelected?: boolean;
}
export declare const Row: (props: RowProps) => JSX.Element;
