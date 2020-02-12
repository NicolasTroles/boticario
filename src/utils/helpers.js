import { startOfMonth, endOfMonth, endOfDay } from 'date-fns';
import moment from 'moment';

const formatCurrencyLanguageAndDots = value => {
    let newValue = value
        .split('R$')
        .join('')
        .split(',')
        .join('')
        .split('.')
        .join('')
        .trim();
    newValue =
        newValue.substring(0, newValue.length - 2) + '.' + newValue.substring(newValue.length - 2, newValue.length); // Adiciona somente o ponto dos centavos

    return +newValue;
};

const getTimezone = () => {
    let date = new Date();
    let timezone = (date.getTimezoneOffset() / 60) * -1;
    return timezone;
};

const handleValueTooBig = val => {
    // Transforma 15654 em 15.6k, 15000 em 15k, 15123456 em 15.1M, 15000000 em 15M
    let newVal = 0;

    if (!!val) {
        newVal = val.toString();
        if (newVal > 1000 && newVal < 1000000) {
            newVal = mountNewNumber(newVal, 2, 'k');
        } else if (newVal >= 1000000) {
            newVal = mountNewNumber(newVal, 5, 'M');
        }
    }
    return newVal;
};

const handleSizeTooBig = val => {
    // Transforma 15654 em 15.6k, 15000 em 15k, 15123456 em 15.1M, 15000000 em 15M
    let newVal = 0;
    if (!!val) {
        newVal = val.toString();

        if (newVal < 1048576) {
            newVal = mountNewNumber(newVal, 2, 'KB');
        } else if (newVal >= 1048576 && newVal < 1073741824) {
            newVal = mountNewNumber(newVal, 5, 'MB');
        } else if (newVal >= 1073741824) {
            newVal = mountNewNumber(newVal, 5, 'GB');
        }
    }
    return newVal;
};

const mountNewNumber = (val, numbersToRemove, endLetter) => {
    // 155555, 4, k
    val = val.substring(0, val.length - numbersToRemove);
    if (val.substring(val.length - 1) === '0') {
        val = val.substring(0, val.length - 1) + endLetter;
    } else {
        val = val.substring(0, val.length - 1) + '.' + val.substring(val.length - 1) + endLetter;
    }
    return val;
};

const LightenDarkenColor = (col, amt) => {
    let usePound = false;

    if (col[0] === '#') {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

const setNavigator = () => {
    let isFirefox,
        isSafari,
        isIE,
        isEdge,
        isChrome = false;

    isFirefox = typeof InstallTrigger !== 'undefined';
    isSafari =
        /constructor/i.test(window.HTMLElement) ||
        (function(p) {
            return p.toString() === '[object SafariRemoteNotification]';
        })(!window['safari']);
    isIE = /*@cc_on!@*/ false || !!document.documentMode;
    isEdge = !isIE && !!window.StyleMedia;
    isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    if (isFirefox === true) return 'Firefox';
    else if (isSafari === true) return 'Safari';
    else if (isIE === true) return 'explorer';
    else if (isEdge === true) return 'edge';
    else if (isChrome === true) return 'chrome';
    else return undefined;
};


export {
    formatCurrencyLanguageAndDots,
    getTimezone,
    verifyReachDate,
    validateUserInfoCapability,
    handleValueTooBig,
    setNavigator,
    groupColors,
    permitedVideos,
    permitedImages,
    handleSizeTooBig,
    LightenDarkenColor,
};
