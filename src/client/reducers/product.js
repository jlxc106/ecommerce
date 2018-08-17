import { REGISTER_PRODUCT, USER_PRODUCTS } from '../actions/index';

export default (state = { user: [], entire: [], query: [] }, action) => {
  switch (action.type) {
    case REGISTER_PRODUCT:
      return { ...state, user: [...state.user, action.payload] };
    case USER_PRODUCTS:
        return {...state, user: action.payload }
      default:
      return state;
  }
};
