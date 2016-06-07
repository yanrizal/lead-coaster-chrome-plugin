import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { routeActions } from 'react-router-redux';
// import { fetchPosts, selectedFilter } from '../actions/actions';
// import $ from 'jquery';


class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container">
          <form className="form-signin">
            <h2>Login</h2>
            <label className="sr-only">Username</label>
            <input type="email" className="form-control" placeholder="Username" required="" autofocus=""/>
            <label className="sr-only">Password</label>
            <input type="password" className="form-control" placeholder="Password" required=""/>
            <div className="checkbox">
              <label>
                <input type="checkbox" value="remember-me"/> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Get Started</button>
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { signupApi } = state;
  const { meta, isFetching } = signupApi.data || {
    meta: {},
    isFetching: false
  };
  return {
    meta,
    isFetching
  };
}

export default connect(mapStateToProps)(Login);
