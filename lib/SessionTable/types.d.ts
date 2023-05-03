export interface Session {
    id: string;
    device_id?: string;
    bt: number;
    tt: number;
    sr: number;
    bit_depth: number;
    channels: Array<{
        name: string;
        description: string;
    }>;
    annotations: Array<{
        name: string;
        bt: number;
        tt: number;
    }>;
    [key: string]: any;
}
export interface TestResult extends Session {
    class: string;
    class_predicted: string;
    prediction_accuracy: string;
}
export interface DppMetadata {
    name: string;
    date_created: number;
    sample_rate: number;
    precision: number;
    recall: number;
}
export declare type Operator = 'and' | 'or';
export declare type Optional<T> = T | null | undefined;
export interface SessionFilterOptions {
    device_ids: Optional<string[]>;
    from_bt: Optional<number>;
    to_bt: Optional<number>;
    from_tt: Optional<number>;
    to_tt: Optional<number>;
    annotations?: Optional<{
        names: string[];
        operator: Operator;
    }>;
    channels: Optional<{
        names: string[];
        operator: Operator;
    }>;
    sr: Optional<number>;
}
export declare type SortField = 'device_id' | 'bt' | 'tt' | 'sr' | string;
export declare type CompareFunction = (a: Record<string, any>, b: Record<string, any>) => number;
export interface SessionSortOptions {
    field: SortField | CompareFunction;
    mode: 'asc' | 'desc';
}
export interface PaginationOptions {
    from_idx: number;
    to_idx: number;
}
