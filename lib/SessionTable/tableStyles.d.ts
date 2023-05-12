import { type CSSProperties } from 'react';
export declare const cellMW160: CSSProperties;
export declare const cellIconSpacing: CSSProperties;
export declare const cellDateTime: CSSProperties;
export declare const DataTableContainer: import("@emotion/styled").StyledComponent<{
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material").TableContainerClasses> | undefined;
    sx?: import("@mui/material").SxProps<import("@mui/material").Theme> | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/material/OverridableComponent").CommonProps | "children" | "sx"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const firstLetterStyle: {
    textTransform: string;
    '::first-letter': {
        textTransform: string;
    };
};
export declare const centerTableFooter: CSSProperties;
export declare const StyledCollapse: import("@emotion/styled").StyledComponent<import("@mui/material").CollapseProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
