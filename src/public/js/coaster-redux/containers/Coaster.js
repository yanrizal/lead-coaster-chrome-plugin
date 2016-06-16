import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { fetchPosts, startBot } from '../actions/actions';
import TableCoaster from '../components/TableCoaster';
// import $ from 'jquery';


class Coaster extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const email = 'yanuar.rizal@mbiz.co.id'
    dispatch(fetchPosts(email));
  }

  handleStartClick = e => {
    const { dispatch } = this.props;
    console.log(e);
    if(e.start){
      dispatch(startBot());
    }
  }

  handleViewResult = e => {
    const { dispatch } = this.props;
    dispatch(routerActions.push(`/result`));
  }

  render() {
    const {items, isFetching} = this.props
    return (
      <div className="dashboard">
        <div className="container">
          <h1>Coaster</h1>
          {!isFetching && <TableCoaster items={items} onStartClick={this.handleStartClick} onViewResult={this.handleViewResult} />}
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

export default connect(mapStateToProps)(Coaster);
