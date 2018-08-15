import {SIGN_IN_ERROR} from '../actions/index';

export default (state = {}, action) =>{
    switch(action.type){
        case SIGN_IN_ERROR:
            return {message: action.payload.message, type: action.type};
        default:
            return state;
    }
}
