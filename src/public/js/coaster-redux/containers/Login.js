import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { loginPost } from '../actions/auth';
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
    dispatch(loginPost(email,password));
  }

  signupPage = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(routerActions.push('/signup'));
  }

  render() {
    const { messages } = this.props;
    return (
        <div className="container">
          <form className="form-signin">
            {messages.error && <div className="alert alert-danger" role="alert">username/password is wrong</div>}
            <label className="sr-only">Email</label>
            <input id="logEmail" type="email" className="form-control" placeholder="Email" name="email" />
            <label className="sr-only">Password</label>
            <input id="logPassword" type="password" className="form-control" placeholder="Password" name="password" />
            <button className="btn btn-lg btn-primary btn-block get-start" onClick={this.handleSubmit}>Get Started</button>
            <label className="pull-left"><a href="" className="crt-acc" onClick={this.signupPage}>Create Account</a></label>
            <label className="crt-acc pull-right">Need Help?</label>
          </form>

        </div>
    );
  }
}

function mapStateToProps(state) {
  const { messages } = state;
  return {
    messages
  };
}

export default connect(mapStateToProps)(Login);
