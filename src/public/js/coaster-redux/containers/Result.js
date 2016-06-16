import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { routeActions } from 'react-router-redux';
import { fetchPosts } from '../actions/actions';
import ListUser from '../components/ListUser';
// import $ from 'jquery';


class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const email = 'yanuar.rizal@mbiz.co.id'
    dispatch(fetchPosts(email));
  }

  handleStartClick = e => {
    console.log(e);
  }

  render() {
    const {items, isFetching} = this.props
    return (
      <div className="dashboard">
        <div className="container">
          <h1>Result</h1>
          {!isFetching && <ListUser items={items}/>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { signupApi, postsByApi } = state;
  const { meta, isFetching, items } = postsByApi.data || {
    meta: {},
    isFetching: false,
    items: []
  };
  return {
    meta,
    isFetching,
    items
  };
}

export default connect(mapStateToProps)(Result);
