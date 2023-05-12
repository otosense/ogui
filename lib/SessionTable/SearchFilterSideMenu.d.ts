import React from 'react';
import { type Operator, type Optional } from './types';
interface DateFilterOption {
    label: string;
    options: 'date';
    fromValue: Optional<number>;
    toValue: Optional<number>;
    onChangeFrom: (value: number) => void;
    onChangeTo: (value: number) => void;
}
interface ArrayFilterOption {
    label: string;
    options: any[];
    value: any;
    onChange: (value: any) => void;
}
interface MultilineOperatorFilterOption {
    label: string;
    options: 'multilineOperator';
    linesValue: Optional<string[]>;
    onChangeLines: (lines: string[]) => void;
    operatorValue: Operator;
    onChangeOperator: (op: Operator) => void;
    operatorOptions: Operator[];
}
export declare type FilterOption = ArrayFilterOption | DateFilterOption | MultilineOperatorFilterOption;
interface FilterProps {
    clearFilters: VoidFunction;
    submitFilters: VoidFunction;
    filterOptions: FilterOption[];
}
export declare const Filter: (props: FilterProps) => JSX.Element;
export declare const SearchFooter: import("@emotion/styled").StyledComponent<import("@mui/system").SystemProps<import("@mui/material").Theme> & {
    children?: React.ReactNode;
    component?: React.ElementType<any> | undefined;
    ref?: React.Ref<unknown> | undefined;
    sx?: import("@mui/material").SxProps<import("@mui/material").Theme> | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/material/OverridableComponent").CommonProps | "children" | "sx" | "ref" | ("p" | "color" | "border" | "boxShadow" | "fontWeight" | "zIndex" | "alignContent" | "alignItems" | "alignSelf" | "bottom" | "boxSizing" | "columnGap" | "display" | "flexBasis" | "flexDirection" | "flexGrow" | "flexShrink" | "flexWrap" | "fontFamily" | "fontSize" | "fontStyle" | "gridAutoColumns" | "gridAutoFlow" | "gridAutoRows" | "gridTemplateAreas" | "gridTemplateColumns" | "gridTemplateRows" | "height" | "justifyContent" | "justifyItems" | "justifySelf" | "left" | "letterSpacing" | "lineHeight" | "marginBottom" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "order" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop" | "position" | "right" | "rowGap" | "textAlign" | "textOverflow" | "textTransform" | "top" | "visibility" | "whiteSpace" | "width" | "borderBottom" | "borderColor" | "borderLeft" | "borderRadius" | "borderRight" | "borderTop" | "flex" | "gap" | "gridArea" | "gridColumn" | "gridRow" | "margin" | "overflow" | "padding" | "bgcolor" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "marginX" | "my" | "marginY" | "pt" | "pr" | "pb" | "pl" | "px" | "paddingX" | "py" | "paddingY" | "typography" | "displayPrint") | "component"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const SearchHeader: import("@emotion/styled").StyledComponent<import("@mui/system").SystemProps<import("@mui/material").Theme> & {
    children?: React.ReactNode;
    component?: React.ElementType<any> | undefined;
    ref?: React.Ref<unknown> | undefined;
    sx?: import("@mui/material").SxProps<import("@mui/material").Theme> | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/material/OverridableComponent").CommonProps | "children" | "sx" | "ref" | ("p" | "color" | "border" | "boxShadow" | "fontWeight" | "zIndex" | "alignContent" | "alignItems" | "alignSelf" | "bottom" | "boxSizing" | "columnGap" | "display" | "flexBasis" | "flexDirection" | "flexGrow" | "flexShrink" | "flexWrap" | "fontFamily" | "fontSize" | "fontStyle" | "gridAutoColumns" | "gridAutoFlow" | "gridAutoRows" | "gridTemplateAreas" | "gridTemplateColumns" | "gridTemplateRows" | "height" | "justifyContent" | "justifyItems" | "justifySelf" | "left" | "letterSpacing" | "lineHeight" | "marginBottom" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "order" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop" | "position" | "right" | "rowGap" | "textAlign" | "textOverflow" | "textTransform" | "top" | "visibility" | "whiteSpace" | "width" | "borderBottom" | "borderColor" | "borderLeft" | "borderRadius" | "borderRight" | "borderTop" | "flex" | "gap" | "gridArea" | "gridColumn" | "gridRow" | "margin" | "overflow" | "padding" | "bgcolor" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "marginX" | "my" | "marginY" | "pt" | "pr" | "pb" | "pl" | "px" | "paddingX" | "py" | "paddingY" | "typography" | "displayPrint") | "component"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
interface SearchFilterProps {
    filterOptions: FilterOption[];
    drawerState: boolean;
    toggleState: VoidFunction;
    title: string;
    btnTxtSearch: string;
    btnTxtClear: string;
    resetFilters: VoidFunction;
    formatAndCallSetFilters: VoidFunction;
}
export declare const SearchFilter: (props: SearchFilterProps) => JSX.Element;
export {};
