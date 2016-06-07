import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { routerActions } from 'react-router-redux';
import { isLogin } from '../actions/actions';
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
    return (
      <div>
        <Navbar isLogin={false} onLearnClick={this.handleNavClick} />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { signupApi, isLogin } = state;
  const { meta, isFetching } = signupApi.data || {
    meta: {},
    isFetching: false
  };
  return {
    meta,
    isFetching
  };
}

export default connect(mapStateToProps)(CoasterApp);
