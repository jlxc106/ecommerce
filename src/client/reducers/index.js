import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import errorReducer from './error';
import authReducer from './auth';
import productReducer from './product';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    error: errorReducer,
    product: productReducer
})