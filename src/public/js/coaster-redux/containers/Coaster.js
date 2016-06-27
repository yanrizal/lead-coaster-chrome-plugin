import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { fetchPosts, postJson } from '../actions/actions';
import TableCoaster from '../components/TableCoaster';
import swal from 'sweetalert';
import config from '../config.json'
// import $ from 'jquery';
const URL_POST_STARTBOT = `${config.serverURL}/startapitest`;

class Coaster extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const email = document.getElementById('idEmail').value;
    dispatch(fetchPosts(email));
  }

  handleStartClick = e => {
    const { dispatch } = this.props;
    console.log(e);
    if(e.start){
      swal({   
        title: "Bot Running",   
        text: "Please wait about 10 minutes to see the result",   
        type: "info",  
        closeOnConfirm: false, 
      });
      dispatch(postJson(URL_POST_STARTBOT,e));
    }
  }

  handleViewResult = e => {
    const { dispatch } = this.props;
    dispatch(routerActions.push(`/result/${e.id}`));
  }

  handleDeleteCoaster = e => {
    const { dispatch } = this.props;
    //dispatch(routerActions.push(`/result/${e.id}`));
  }

  render() {
    const {items, isFetching} = this.props
    return (
      <div className="dashboard">
        <div className="container">
          <h1>Coaster</h1>
          {!isFetching && <TableCoaster items={items} 
          onStartClick={this.handleStartClick} 
          onViewResult={this.handleViewResult} 
          onDeleteCoaster={this.handleDeleteCoaster}/>}
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
