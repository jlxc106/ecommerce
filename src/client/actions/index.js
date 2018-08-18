import axios from 'axios';

export const CURRENT_USER = 'current_user';
export const SIGN_IN_ERROR = 'sign_in_error';
export const SIGN_UP_ERROR = 'sign_up_error';
export const ACCOUNT_ERROR = 'account_error';
export const REGISTER_PRODUCT = 'register_product';
export const USER_PRODUCTS = 'user_products';
export const ALL_PRODUCTS = 'all_products';
export const UPDATE_PRODUCT = 'update_product';


export const getCurrentUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/currentUser');
    dispatch({
      type: CURRENT_USER,
      payload: res.data
    });
  } catch (err) {
    console.error('disconnected from api server');
  }
};

export const handleToken = token => async dispatch => {
  try {
    console.log('token', token);
    const res = await axios.post('/api/stripe', token);
    // // console.log(res);
    if(res.error){
      console.log('unable to purchase');
    }
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
      newQuantity: res.data.quantity,
      id: res.data._id
    });
  } catch (err) {
    console.error(err);
  }
};

export const handleSignInFormSubmit = (form, history) => async dispatch => {
  try {
    const res = await axios.post('/auth/signIn', form);
    // console.log('post response: ',res);
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
    let imageUrl = '';
    const uploadConfig = await axios.get('/api/aws_presignedUrl');
    if (file) {
      await axios.put(uploadConfig.data.url, file, {
        headers: { 'Content-Type': file.type }
      });
      imageUrl = uploadConfig.data.key;
    }

    const res = await axios.post('/api/createProduct', {
      ...formValues,
      imageUrl: imageUrl || ''
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

export const editProduct = data => async dispatch => {
  try {
    // await axios.post()
  } catch (err) {
    console.error(err);
  }

  // dispatch({

  // })
};
