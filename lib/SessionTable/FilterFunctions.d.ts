/// <reference types="react" />
import { type Operator, type Optional } from './types';
export declare const MultilineOperatorFilter: (label: string, linesValue: Optional<string[]>, onChangeLines: (lines: string[]) => void, operatorValue: Optional<Operator>, onChangeOperator: (op: Operator) => void, operatorOptions: Operator[]) => JSX.Element;
export declare const renderSearchableFilter: (label: string, value: Optional<string>, onChange: any, options: any) => JSX.Element;
export declare const DateTimeFilter: (label: string, fromValue: Optional<number>, toValue: Optional<number>, onChangeFrom: (value: number) => void, onChangeTo: (value: number) => void) => JSX.Element;
