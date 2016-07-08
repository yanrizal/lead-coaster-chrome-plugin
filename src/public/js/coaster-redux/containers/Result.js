import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/actions';
import ListUser from '../components/ListUser';


class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const user = localStorage.getItem('user');
    dispatch(fetchPosts(JSON.parse(user).username));
  }

  render() {
    const {items, isFetching, profileVisit, params} = this.props
    console.log(profileVisit);
    return (
      <div className="dashboard">
        <div className="container">
          <h1>Result</h1>
          {!isFetching && <ListUser items={items} profileVisit={profileVisit} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const path = window.location.pathname;
  const str = path.split("/");
  let index = 0;
  if(str[1] === 'result'){
    index = parseInt(str[2]);
  }
  console.log(str);
  const { postsByApi } = state;
  const { meta, isFetching, items } = postsByApi.data || {
    meta: {},
    isFetching: false,
    items: []
  };
  const { profileVisit } = items[index] || {
    profileVisit: []
  }
  return {
    meta,
    isFetching,
    items,
    profileVisit
  };
}

export default connect(mapStateToProps)(Result);
