// Scale
import { pxToRem } from 'utils/scale';

// Themes
const primaryTheme = {
    breakpoint: {
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
    },
    colors: {
        white: '#ffffff',
        none: 'transparent',
        active: {
            blue2: '#004367',
        },
        blue2: '#004367',
        // New Colors
        grey1: '#333',
        grey2: '#cecece',
    },
    spacing: {
        px0: pxToRem(0),
        px3: pxToRem(3),
        px5: pxToRem(5),
        px8: pxToRem(8),
        px10: pxToRem(10),
        px12: pxToRem(12),
        px15: pxToRem(15),
        px16: pxToRem(16),
        px20: pxToRem(20),
        px24: pxToRem(24),
        px25: pxToRem(25),
        px30: pxToRem(30),
        px32: pxToRem(32),
        px35: pxToRem(35),
        px40: pxToRem(40),
        px50: pxToRem(50),
        px60: pxToRem(60),
        px70: pxToRem(70),
        px90: pxToRem(90),

        none: '0',
        quarter: '25%',
        middle: '50%',
        full: '100%',
    },
    fontSize: {
        none: '0',
        px8: pxToRem(8),
        px10: pxToRem(10),
        px11: pxToRem(11),
        px12: pxToRem(12),
        px14: pxToRem(14),
        px16: pxToRem(16),
        px18: pxToRem(18),
        px20: pxToRem(20),
        px24: pxToRem(24),
        px25: pxToRem(25),
        px30: pxToRem(30),
        px32: pxToRem(32),
        px35: pxToRem(35),
        px40: pxToRem(40),
        px45: pxToRem(45),
        px60: pxToRem(60),
    },
    fontWeight: {
        light: 300,
        normal: 400,
        bold: 700,
    },
    fontFamily: {
        default: `"Lato", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"`,
    },
    rounded: {
        px3: '3px',
        px5: '5px',
        px10: '10px',

        none: '0',
        full: '100%',
    },
};

export { primaryTheme };
