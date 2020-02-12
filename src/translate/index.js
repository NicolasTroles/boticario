import { LoginPT, LoginEN } from 'containers/Login/LoginTranslator';
import { HeaderPT, HeaderEN } from 'components/Header/HeaderTranslator';

let translationsPT = {
    locale: 'pt-BR',
    ...LoginPT,
    ...HeaderPT,
}

let translationsEN = {
    locale: 'en-US',
    ...LoginEN,
    ...HeaderEN,
}

export { translationsPT, translationsEN };