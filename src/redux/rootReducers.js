/* Modules */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

/* Reducers */
import toastReducer from './toast/reducer';
import authenticationReducer from './authentication/reducer';


// all the reducers are in one place
const rootReducers = combineReducers({
    toastReducer: toastReducer,
    form: formReducer,
    authenticationReducer: authenticationReducer,
})

export default rootReducers;
