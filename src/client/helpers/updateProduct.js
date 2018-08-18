import _ from 'lodash';

export const updateProductQuantity = (newQuantity, id, productList) => {
  return productList.map((product, index) => {
    if (product._id !== id) {
      return product;
    }
    product.quantity = newQuantity;
    return product;
  });
};
