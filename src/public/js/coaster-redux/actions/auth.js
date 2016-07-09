import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import NProgress from 'nprogress-npm';

export function loginPost(email, password) {
  NProgress.set(0);
  return dispatch => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return $.ajax({
      url: '/login',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        email: email,
        password: password
      },
      success: function(json) {
        console.log(json);
        dispatch({
            type: 'LOGIN_SUCCESS',
            token: json.token,
            username: json.username
          });
        NProgress.done();
        localStorage.setItem('user', JSON.stringify(json));
        cookie.save('token', json.token);
        browserHistory.push('/help');
        //window.location.href = '/help';
      },
      error: function(xhr, status, err) {
        NProgress.done();
        dispatch({
            type: 'LOGIN_FAILURE',
            messages: Array.isArray(err) ? err : [err]
          });
      }
    });
  };
}


// export function isLogin(){
//   return dispatch => {
//     const isLogin = document.getElementById('isLogin').value;
//     dispatch({
//       type: 'IS_LOGIN',
//       value: isLogin
//     });
//   }
// }


export function signupPost(email, password) {
  NProgress.start();
  return dispatch => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return $.ajax({
      url: '/signup',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        email: email,
        password: password
      },
      success: function(json) {
        console.log(json);
        NProgress.done();
        dispatch({
            type: 'SIGNUP_SUCCESS',
            token: json.token,
            user: json.user
          });
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          // browserHistory.push('/help');
          window.location.href = '/help';
      },
      error: function(xhr, status, err) {
        dispatch({
            type: 'SIGNUP_FAILURE',
            messages: Array.isArray(err) ? err : [err]
          });
      }
    });
  };
}
