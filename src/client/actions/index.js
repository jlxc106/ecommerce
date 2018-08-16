import axios from 'axios';

export const CURRENT_USER = 'current_user';
export const SIGN_IN_ERROR = 'sign_in_error';
export const SIGN_UP_ERROR = 'sign_up_error';
export const ACCOUNT_ERROR = 'account_error';

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
  const res = await axios.post('/api/stripe', token);
  // console.log(res);
  dispatch({
    type: CURRENT_USER,
    payload: res.data
  });
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

export const handleAdminRequest = () => async dispatch =>{
  try{
    const res = await axios.get('/auth/requestAdmin');
    if(res.data.isAdmin){
      dispatch({
        type: CURRENT_USER,
        payload: res.data
      })
    }
    else{
      dispatch({
        type: ACCOUNT_ERROR,
        payload: res.data
      })
    }
  }catch(err){
    console.error(err);
  }
}

// export function getCurrentUser() {
//   const res = axios.get('/auth/currentUser');
//   return {
//     type: CURRENT_USER,
//     payload: res.data
//   };
// }
