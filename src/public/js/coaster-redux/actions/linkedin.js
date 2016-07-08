import NProgress from 'nprogress-npm';

export function submitlinkedinAcc(name, email, password) {
  NProgress.start();
  console.log(name,email,password);
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/api/v1/linkedin/post', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password
      })
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'LINKEDIN_FORM_SUCCESS',
            messages: [json]
          });
          NProgress.done();
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'LINKEDIN_FORM_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
