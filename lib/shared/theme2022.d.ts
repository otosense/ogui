declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
    }
}
declare module '@mui/material/Icon' {
    interface IconPropsColorOverrides {
        gray: true;
        accent: true;
    }
}
declare module '@mui/material/Box' {
    interface BoxPropsColorOverrides {
        gray: true;
        accent: true;
    }
}
declare module "@mui/material/styles/createTypography" {
    interface Typography {
        link: CSSProperties | {
            [key: string]: CSSProperties;
        };
    }
    interface TypographyOptions {
        link?: CSSProperties | {
            [key: string]: CSSProperties;
        };
    }
}
declare module "@mui//material/Typography/Typography" {
    interface TypographyPropsVariantOverrides {
        link: true;
    }
}
declare module '@mui/material/InputBase' {
    interface InputBasePropsColorOverrides {
        whiteBg: true;
        accent: true;
    }
}
declare module '@mui/material/FormControl' {
    interface FormControlPropsSizeOverrides {
        xsmall: true;
    }
}
declare module '@mui/material/TextField' {
    interface TextFieldPropsSizeOverrides {
        xsmall: true;
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        cancel: true;
        critical: true;
        gray: true;
    }
}
declare module '@mui/material/styles' {
    interface Palette {
        cancel: Palette['primary'];
        critical: Palette['primary'];
        gray: Palette['primary'];
        whiteBg: Palette['primary'];
        accent: Palette['primary'];
    }
    interface PaletteOptions {
        cancel: PaletteOptions['primary'];
        critical: PaletteOptions['primary'];
        gray: PaletteOptions['primary'];
        whiteBg: PaletteOptions['primary'];
        accent: PaletteOptions['primary'];
    }
}
declare let otosenseTheme2022: import("@mui/material/styles").Theme;
export default otosenseTheme2022;
