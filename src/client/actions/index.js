import axios from 'axios';
import { resolve } from 'url';

export const CURRENT_USER = 'current_user';
export const SIGN_IN_ERROR = 'sign_in_error';
export const SIGN_UP_ERROR = 'sign_up_error';
export const ACCOUNT_ERROR = 'account_error';
export const PRODUCT_ERROR = 'product_error';
export const REGISTER_PRODUCT = 'register_product';
export const USER_PRODUCTS = 'user_products';
export const ALL_PRODUCTS = 'all_products';
export const UPDATE_PRODUCT = 'update_product';
export const GET_PRODUCT = 'get_product';

export const getCurrentUser = errorCallback => async dispatch => {
  try {
    const res = await axios.get('/auth/currentUser');
    dispatch({
      type: CURRENT_USER,
      payload: res.data
    });
  } catch (err) {
    errorCallback('disconnected from api server');
    return;
  }
};

export const handleToken = (
  token,
  successCallback,
  errorCallback
) => async dispatch => {
  try {
    const res = await axios.post('/api/stripe', token);
    if (res.error) {
      errorCallback('There was an error with checkout.');
      return;
    }
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
      newQuantity: res.data.quantity,
      id: res.data._id
    });
    successCallback();
  } catch (err) {
    console.error(err);
  }
};

export const handleSignInFormSubmit = (
  form,
  history,
  errorCallback
) => async dispatch => {
  try {
    const res = await axios.post('/auth/signIn', form);
    if (res.data.email) {
      dispatch({
        type: CURRENT_USER,
        payload: res.data
      });
      history.push('/');
    } else {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: res.data
      });
      errorCallback(res.data.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export const handleSignUpFormSubmit = (form, history) => async dispatch => {
  try {
    const res = await axios.post('/auth/signUp', form);
    if (res.data.email) {
      dispatch({
        type: CURRENT_USER,
        payload: res.data
      });
      history.push('/');
    } else {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: res.data
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const handleAdminRequest = () => async dispatch => {
  try {
    const res = await axios.get('/auth/requestAdmin');
    if (res.data.isAdmin) {
      dispatch({
        type: CURRENT_USER,
        payload: res.data
      });
    } else {
      dispatch({
        type: ACCOUNT_ERROR,
        payload: res.data
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const getUserProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/userProducts');
    dispatch({
      type: USER_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const createProduct = (formValues, file, callback) => async dispatch => {
  try {
    let imageUrl = [];
    if (file && file.length > 0) {
      const uploadConfig = await axios.get(
        `/api/aws_presignedUrl/${file.length}`
      );
      console.log(uploadConfig);
      // return;
      // console.log(file);
      // return;
      imageUrl = await Promise.all(
        uploadConfig.data.map(async (s3Object, index) => {
          return new Promise(async (resolve, reject) => {
            try {
              await axios.put(s3Object.url, file[index], {
                headers: { 'Content-Type': file[index].type }
              });
              resolve(s3Object.key);
            } catch (e) {
              reject(e);
            }
          });
        })
      );
      // await axios.put(uploadConfig.data.url, file, {
      //   headers: { 'Content-Type': file.type }
      // });
      // imageUrl = uploadConfig.data.key;
    }
    // console.log('imageUrl: ', imageUrl);
    const res = await axios.post('/api/createProduct', {
      ...formValues,
      imageUrl: imageUrl.length > 0 ? imageUrl : ['']
    });
    dispatch({
      type: REGISTER_PRODUCT,
      payload: res.data
    });
    callback();
  } catch (err) {
    console.error(err);
  }
};

export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/getProducts');
    dispatch({
      type: ALL_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getProductById = id => async dispatch => {
  try {
    const res = await axios.get('/api/getProductById');
    console.log(res);
    if (res.data.message) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: res.data
      });
    } else {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const editProduct = data => async dispatch => {
  try {
    // await axios.post()
  } catch (err) {
    console.error(err);
  }

  // dispatch({

  // })
};
