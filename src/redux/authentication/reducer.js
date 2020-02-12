// Types
import {
    TOKEN_DECODED,
    EDIT_PURCHASE
} from './types';

const INITIAL_STATE = {
    tokenDecoded: {},
    editingPurchase: null,
}

const authenticationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOKEN_DECODED.SUCCESS:
            return {
                ...state,
                tokenDecoded: action.tokenDecoded,
            }

        case TOKEN_DECODED.RESET:
            return {
                ...state,
                tokenDecoded: {},
            }

        case EDIT_PURCHASE.SUCCESS:
            return {
                ...state,
                editingPurchase: action.purchase
            }



        default:
            return state

    }
}

export default authenticationReducer;

