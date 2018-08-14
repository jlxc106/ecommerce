import axios from 'axios';

export const CURRENT_USER = 'current_user';

export const getCurrentUser = () => async dispatch => {
  const res = await axios.get('/auth/currentUser');
  dispatch({
    type: CURRENT_USER,
    payload: res.data
  });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  console.log(res);
  dispatch({
    type: CURRENT_USER,
    payload: res.data
  });
};

// export function getCurrentUser() {
//   const res = axios.get('/auth/currentUser');
//   return {
//     type: CURRENT_USER,
//     payload: res.data
//   };
// }
