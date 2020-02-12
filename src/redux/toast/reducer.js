// Types
import {
    SHOW_TOAST
} from './types';

const INITIAL_STATE = {
    message: '',
    type: '',
}

const toastReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_TOAST.REQUEST:
            return {
                ...state,
                message: action.newMessage,
                type: action.messageType,
            }

        default:
            return state

    }
}

export default toastReducer;

