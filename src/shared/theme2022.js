"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IBMPlexSans_Medium_ttf_1 = __importDefault(require("../assets/IBMPlexSans-Medium.ttf"));
const IBMPlexSans_Regular_ttf_1 = __importDefault(require("../assets/IBMPlexSans-Regular.ttf"));
const IBMPlexSans_SemiBold_ttf_1 = __importDefault(require("../assets/IBMPlexSans-SemiBold.ttf"));
const IBMPlexSans_Bold_ttf_1 = __importDefault(require("../assets/IBMPlexSans-Bold.ttf"));
const OpenSans_Regular_ttf_1 = __importDefault(require("../assets/OpenSans-Regular.ttf"));
const styles_1 = require("@mui/material/styles");
let otosenseTheme2022 = (0, styles_1.createTheme)({
    palette: {
        primary: {
            main: '#009fbd',
            // dark: '#101820',
            contrastText: '#fff',
        },
        secondary: {
            main: '#CBD4EB',
            contrastText: '#003965',
            dark: '#A1B4DC',
            light: '#fff',
        },
        cancel: {
            main: '#C6D6DA',
            light: '#fff',
            dark: '#9CB3B9',
            contrastText: '#146474',
        },
        accent: {
            main: '#8637BA',
            light: '#fff',
            dark: '#9CB3B9',
            contrastText: '#fff',
        },
        critical: {
            main: '#CC4734',
            contrastText: '#fff',
            light: '#E9D0D9',
            dark: '#8C2026',
        },
        gray: {
            main: '#767989',
            contrastText: '#fff',
            light: '#dfe1e8',
            dark: '#000',
        },
        error: {
            main: '#bd1e00',
            contrastText: '#fff',
            dark: '#CC4734',
        },
        warning: {
            main: '#ED6C02',
            contrastText: '#101820'
        },
        info: {
            main: '#47afff',
            contrastText: '#101820',
        },
        success: {
            main: '#00aa55',
            contrastText: '#101820'
        },
        whiteBg: {
            main: '#009fbd',
            contrastText: '#fff',
        },
        background: {
            paper: '#fff',
            default: '#f3f3f3',
        },
        text: {
            primary: '#101820',
            secondary: '#767989',
            disabled: '#A9ABB7',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1280,
            xl: 1920,
        }
    },
    typography: {
        htmlFontSize: 16,
        fontFamily: '"IBMPlexSans-Regular", "IBMPlexSans-SemiBold", "IBMPlexSans-Bold", "OpenSans-Regular", sans-serif',
        h1: {
            fontFamily: '"IBMPlexSans-SemiBold", sans-serif',
            fontSize: 24,
            lineHeight: 1,
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 32,
            },
            '::first-letter': {
                textTransform: 'uppercase',
            },
        },
        h2: {
            fontFamily: '"IBMPlexSans-SemiBold", sans-serif',
            fontSize: 20,
            lineHeight: 1,
            '::first-letter': {
                textTransform: 'uppercase',
            },
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 24,
            },
        },
        h3: {
            fontFamily: '"IBMPlexSans-Medium", sans-serif',
            fontSize: 18,
            lineHeight: 1.5,
            '::first-letter': {
                textTransform: 'uppercase',
            },
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 20,
            },
            // letterSpacing: '',
        },
        h4: {
            fontFamily: '"IBMPlexSans-Medium", sans-serif',
            fontSize: 16,
            lineHeight: 1,
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 18,
            },
        },
        h5: {
            fontFamily: '"IBMPlexSans-Medium", sans-serif',
            fontSize: 14,
            lineHeight: 1,
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 16,
            },
        },
        body1: {
            fontFamily: '"IBMPlexSans-Regular", sans-serif',
            fontSize: 14,
            lineHeight: 1.5,
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 16,
            },
        },
        body2: {
            fontFamily: '"IBMPlexSans-Regular", sans-serif',
            fontSize: 16,
            lineHeight: 1.5,
            letterSpacing: '',
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 18,
            },
        },
        subtitle1: {
            fontFamily: '"IBMPlexSans-Regular", sans-serif',
            fontSize: 18,
            lineHeight: 1.5,
            textTransform: 'none',
            '::first-letter': {
                textTransform: 'uppercase',
            },
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 20,
            },
        },
        subtitle2: {
            fontFamily: '"IBMPlexSans-Regular", sans-serif',
            fontSize: 20,
            lineHeight: 1,
            textTransform: 'none',
            '::first-letter': {
                textTransform: 'uppercase',
            },
            color: '#101820',
            '@media (min-width:1280px)': {
                fontSize: 24,
            },
        },
        caption: {
            fontFamily: '"IBMPlexSans-Regular", sans-serif',
            fontSize: 14,
            color: '#101820',
            '::first-letter': {
                textTransform: 'uppercase',
            },
        },
        overline: {
            fontFamily: '"IBMPlexSans-Regular", sans-serif',
            fontSize: '16px !important',
            textTransform: 'none',
            '::first-letter': {
                textTransform: 'uppercase',
            },
            color: '#101820',
        },
        button: {
            fontFamily: '"IBMPlexSans-SemiBold", sans-serif',
            fontSize: 16,
            lineHeight: 1,
            letterSpacing: 1,
            textTransform: 'none',
            '::first-letter': { textTransform: 'uppercase' }
        },
        link: {
            textTransform: 'none',
            '::first-letter': {
                textTransform: 'uppercase',
            },
            fontFamily: '"IBMPlexSans-Regular", sans-serif',
            color: '#009fbd',
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    },
    shape: {
        borderRadius: 0,
    },
    spacing: 24,
    components: {
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    marginTop: 0,
                },
                positionStart: {
                    marginTop: 0,
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'IBMPlexSans-Regular';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('IBMPlexSans-Regular'), local('IBMPlexSans-Regular'), url(${IBMPlexSans_Regular_ttf_1.default}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            },
            @font-face {
              font-family: 'IBMPlexSans-Medium';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('IBMPlexSans-Medium'), local('IBMPlexSans-Medium'), url(${IBMPlexSans_Medium_ttf_1.default}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            },
            @font-face {
              font-family: 'IBMPlexSans-SemiBold';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('IBMPlexSans-SemiBold'), local('IBMPlexSans-SemiBold'), url(${IBMPlexSans_SemiBold_ttf_1.default}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            },
            @font-face {
              font-family: 'IBMPlexSans-Bold';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('IBMPlexSans-Bold'), local('IBMPlexSans-Bold'), url(${IBMPlexSans_Bold_ttf_1.default}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            },
            @font-face {
              font-family: 'OpenSans-Regular';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('OpenSans-Regular'), url(${OpenSans_Regular_ttf_1.default}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    '::first-letter': {
                        textTransform: 'uppercase',
                    },
                    width: 'auto',
                },
            },
            defaultProps: {
                variant: 'contained',
                disableElevation: true,
            },
            variants: [
                {
                    props: { variant: 'contained', size: 'large' },
                    style: {
                        fontSize: 20,
                        minHeight: 60,
                        lineHeight: 1.5,
                        letterSpacing: 2,
                        minWidth: 140,
                    },
                }, {
                    props: { variant: 'outlined', size: 'medium', color: 'primary' },
                    style: {
                        border: '2px solid #009fbd',
                    },
                }, {
                    props: { variant: 'text', color: 'secondary' },
                    style: {
                        color: '#003965',
                        ':hover': {
                            backgroundColor: '#CBD4EB'
                        }
                    }
                }, {
                    props: { size: 'medium' },
                    style: { height: 45, fontSize: 16, minWidth: 100 }
                }
            ],
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'filled',
                size: 'medium'
            },
            variants: [
                {
                    props: { variant: 'filled', size: 'medium' },
                    style: { minWidth: 315, height: 45 },
                },
                {
                    props: { size: 'small' },
                    style: { minWidth: 175, minHeight: 45, width: 175 }
                },
                {
                    props: { variant: 'filled', size: 'xsmall' },
                    style: { minWidth: 100, height: 45 }
                }
            ],
        },
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
                size: 'medium',
            },
            variants: [
                {
                    props: { variant: 'filled', size: 'medium' },
                    style: { height: 45, minWidth: 315 }
                },
                {
                    props: { size: 'small' },
                    style: { maxWidth: 175 }
                },
                {
                    props: { variant: 'outlined' },
                    style: { height: 45 }
                },
                {
                    props: { size: 'xsmall' },
                    style: { height: 45, maxWidth: 100, minWidth: 80 }
                }
            ],
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            },
            variants: [
                {
                    props: { variant: 'overline' },
                    style: {
                        marginBottom: 7,
                        lineHeight: 'initial',
                        fontSize: 14
                    },
                },
                {
                    props: { variant: 'caption' },
                    style: { fontSize: 14 },
                },
            ],
            defaultProps: {
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                    subtitle1: 'header',
                    subtitle2: 'span',
                    body1: 'span',
                    body2: 'p',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '::first-letter': {
                        textTransform: 'uppercase',
                    },
                    fontFamily: '"OpenSans-Regular", sans-serif',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    '::first-letter': {
                        textTransform: 'uppercase',
                    },
                    fontFamily: '"OpenSans-Regular", sans-serif',
                    fontSize: 18,
                    color: '#101820',
                    paddingLeft: 0,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: 424,
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    'paddingLeft': '1rem',
                    'paddingRight': '1rem',
                    'textTransform': 'none',
                    '::first-letter': {
                        textTransform: 'uppercase',
                    },
                    'backgroundColor': '#f3f3f3',
                    '&:hover': {
                        backgroundColor: '#fff',
                    },
                    'fontFamily': '"IBMPlexSans-Regular", sans-serif',
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '1rem',
                    fontFamily: '"IBMPlexSans-Regular", sans-serif',
                },
            },
        },
        MuiTable: {
            defaultProps: {
                size: 'small'
            },
            styleOverrides: {
                root: {
                    fontFamily: '"IBMPlexSans-Regular", sans-serif',
                    fontSize: 18,
                    '@media (max-width:1280px)': {
                        fontSize: 16,
                    },
                },
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: '#757575',
                    fontSize: 18,
                    '@media (max-width:1280px)': {
                        fontSize: 16,
                    },
                    textTransform: 'none',
                    '::first-letter': {
                        textTransform: 'uppercase',
                    },
                    whiteSpace: 'nowrap'
                },
                root: {
                    fontSize: 18,
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }
            }
        },
        // MuiTableRow: {
        //   styleOverrides: {
        //     root: {
        //       borderBottom: '1px solid rgba(224, 224, 224, 1)'
        //     }
        //   }
        // },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 0,
                    paddingBottom: 24,
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    padding: 24,
                    fontFamily: '"IBMPlexSans-SemiBold", sans-serif',
                    fontSize: 24,
                    textTransform: 'none',
                    '::first-letter': {
                        textTransform: 'uppercase',
                    },
                    color: '#101820',
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                filled: {
                    padding: 0, margin: 'auto',
                    height: 'auto',
                }
            }
        },
        MuiInput: {
            variants: [
                {
                    props: { size: 'medium' },
                    style: { height: 45, minHeight: 45, }
                }
            ]
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    height: '100%', paddingLeft: 8, paddingTop: 0, paddingBottom: 0
                },
                input: {
                    padding: 0, margin: 'auto',
                },
                underline: {
                    paddingTop: 0,
                }
            },
            variants: [
                {
                    props: { size: 'medium' },
                    style: { minHeight: 45, paddingLeft: 5, paddingTop: 0, paddingBottom: 0, paddingRigght: 0, margin: 'auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }
                },
                {
                    props: { size: 'small' },
                    style: { minHeight: 45 }
                },
            ]
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: '100%',
                }
            },
            variants: [
                {
                    props: { size: 'medium' },
                    style: { height: 45 }
                },
            ]
        },
        MuiSnackbar: {
            defaultProps: {
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    fontSize: 16,
                    padding: '16px 24px',
                    fontFamily: '"IBMPlexSans-Regular", sans-serif',
                },
                filled: {
                    display: 'flex',
                    alignItems: 'center',
                },
                message: {
                    padding: 0,
                },
                action: {
                    padding: 0,
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    paddingTop: 0,
                }
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    paddingTop: 0,
                },
                input: {
                    '&:-webkit-autofill': {
                        transitionDelay: '9999s',
                        transitionProperty: 'background-color, color',
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: 16,
                    backgroundColor: '#003965',
                    fontFamily: '"IBMPlexSans-Regular", sans-serif',
                    width: 'max-content',
                }
            }
        },
    },
});
exports.default = otosenseTheme2022;
