import { browserHistory } from 'react-router';
import swal from 'sweetalert';
import NProgress from 'nprogress-npm';

export function addCoaster(e) {
  console.log(e);
  //NProgress.start();
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/api/v1/adddata', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: e.username,
        urlSearch: e.urlSearch,
        searchName: e.searchName,
        startDate: e.startDate
      })
    }).then((response) => {
      console.log(response);
      //NProgress.done();
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'ADD_COASTER_SUCCESS',
            messages: [json]
          });
          browserHistory.push('/coaster/active');
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'ADD_COASTER_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function deleteCoaster(username,e) {
  console.log(e);
  NProgress.start();
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/api/v1/deletedata', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchName:e.name,
        username:username
      })
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'DELETE_COASTER_SUCCESS',
            messages: `${e.name} coaster deleted`
          });
          NProgress.done();
          $(`#tcoaster-${e.id}`).remove();
          swal("Deleted!", "success");
          //browserHistory.push('/coaster/active');
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'DELETE_COASTER_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
