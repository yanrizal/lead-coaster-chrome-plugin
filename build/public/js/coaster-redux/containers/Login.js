import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { routeActions } from 'react-router-redux';
import { loginPost } from '../actions/actions';
// import $ from 'jquery';


class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    const email = document.getElementById('logEmail').value;
    const password = document.getElementById('logPassword').value;
    console.log(email,password);
    dispatch(loginPost(email,password));
  }

  render() {
    return (
        <div className="container">
          <form className="form-signin">
            <label className="sr-only">Email</label>
            <input id="logEmail" type="email" className="form-control" placeholder="Email" name="email" />
            <label className="sr-only">Password</label>
            <input id="logPassword" type="password" className="form-control" placeholder="Password" name="password" />
            <button className="btn btn-lg btn-primary btn-block get-start" onClick={this.handleSubmit}>Get Started</button>
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
