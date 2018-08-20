import {
  REGISTER_PRODUCT,
  USER_PRODUCTS,
  ALL_PRODUCTS,
  UPDATE_PRODUCT
} from '../actions/index';

import { updateProductQuantity } from '../helpers/updateProduct';

export default (state = [], action) => {
  switch (action.type) {
    case REGISTER_PRODUCT:
      return [...state, action.payload];
    case USER_PRODUCTS:
      return action.payload;
    case ALL_PRODUCTS:
      return action.payload;
    case UPDATE_PRODUCT:
      return updateProductQuantity(action.newQuantity, action.id, state);
    default:
      return state;
  }
};
