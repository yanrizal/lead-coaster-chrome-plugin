import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { routeActions } from 'react-router-redux';
// import { fetchPosts, selectedFilter } from '../actions/actions';
// import $ from 'jquery';


class Help extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container">
          <h1>Hello, world!</h1>
          <p>...</p>
          <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
          </p>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { postsByApi } = state;
  const { meta, isFetching } = postsByApi.data || {
    meta: {},
    isFetching: false
  };
  return {
    meta,
    isFetching
  };
}

export default connect(mapStateToProps)(Help);
