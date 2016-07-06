import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { routerActions } from 'react-router-redux';
import { isLogin } from '../actions/auth';
// import $ from 'jquery';


class CoasterApp extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(isLogin());
  }

  handleNavClick = e => {
    console.log(e);
    const { dispatch } = this.props;
    dispatch(routerActions.push(`/${e.page}`));
  }

  render() {
    const user = localStorage.getItem('user');
    return (
      <div>
        <Navbar isUser={user} onLearnClick={this.handleNavClick} />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLog } = state;
  return {
    isLog
  };
}

export default connect(mapStateToProps)(CoasterApp);
