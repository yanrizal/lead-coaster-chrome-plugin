import $ from 'jquery';
import NProgress from 'nprogress-npm';

function requestPosts() {
  return {
    type: 'REQUEST_POSTS'
  };
}

function receivePosts(type, json) {
  return {
    type: 'RECEIVE_POSTS',
    posts: json.data,
    meta: json.meta,
    status: json.status,
    receivedAt: Date.now(),
  };
}

export function fetchPosts(email) {
  return dispatch => {
    NProgress.start();
    dispatch(requestPosts());
    return $.ajax({
      url: '/api/v1/getdata',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        lkdUsername: email,
      },
      success: function(response) {
        NProgress.done();
        dispatch(receivePosts('fetch', response));
      },
      error: function(xhr, status, err) {
        console.error(xhr);
      }
    });
  };
}

export function postJson(url, e) {
  return dispatch => {
    NProgress.start();
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    //dispatch(requestPosts());
    return $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      type: 'post',
      data: e,
      success: function(response) {
        console.log(response);
        NProgress.done();
        dispatch({
          type: 'POST_SUCCESS',
          messages: [response]
        });
      },
      error: function(xhr, status, err) {
        console.error(xhr);
      }
    });
  };
}

