import axios from 'axios';

export const CURRENT_USER = 'current_user';
export const SIGN_IN_ERROR = 'sign_in_error';


export const getCurrentUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/currentUser');
    dispatch({
      type: CURRENT_USER,
      payload: res.data
    });
  } catch (err) {
    console.log('disconnected from api server');
  }
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  console.log(res);
  dispatch({
    type: CURRENT_USER,
    payload: res.data
  });
};

export const handleFormSubmit = (form, history) => async dispatch => {
  try {
    // console.log(form);
    const res = await axios.post('/auth/signIn', form);
    console.log('post response: ',res);
    //deal with errors here//
    if(res.data.email){
      dispatch({
        type: CURRENT_USER,
        payload: res.data
      });
      history.push('/')
    }else{
      console.log(res.data);
      dispatch({
        type: SIGN_IN_ERROR,
        payload: res.data
      })
    }

  } catch (err) {
    console.log(err);

  }
};

// export function getCurrentUser() {
//   const res = axios.get('/auth/currentUser');
//   return {
//     type: CURRENT_USER,
//     payload: res.data
//   };
// }
