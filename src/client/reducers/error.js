import {SIGN_IN_ERROR, SIGN_UP_ERROR, ACCOUNT_ERROR, PRODUCT_ERROR} from '../actions/index';

export default (state = {}, action) =>{
    switch(action.type){
        case SIGN_UP_ERROR:
        case ACCOUNT_ERROR:
        case PRODUCT_ERROR:
        case SIGN_IN_ERROR:
            // console.log(action);
            return {message: action.payload.message, type: action.type};
        default:
            return state;
    }
}
