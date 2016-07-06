import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { fetchPosts, postJson } from '../actions/actions';
import { submitlinkedinAcc } from '../actions/linkedin';
import TableCoaster from '../components/TableCoaster';
import swal from 'sweetalert';
import config from '../config.json';

const URL_POST_STARTBOT = `${config.serverURL}/startapitest`;

class Coaster extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { dispatch, meta } = this.props;
    const user = localStorage.getItem('user');
    dispatch(fetchPosts(JSON.parse(user).username));
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

  handleSaveLkd = e => {
    const { dispatch } = this.props;
    const useremail = document.getElementById('idEmail').value;
    const emailLkd = document.getElementById('emailLkd').value;
    const passwordLkd = document.getElementById('passwordLkd').value;
    dispatch(submitlinkedinAcc(useremail, emailLkd, passwordLkd))
  }

  handleViewResult = e => {
    const { dispatch } = this.props;
    dispatch(routerActions.push(`/result/${e.id}`));
  }

  handleDeleteCoaster = e => {
    const { dispatch } = this.props;
    //dispatch(routerActions.push(`/result/${e.id}`));
  }

  handleAddCoaster = e => {
    const { dispatch } = this.props;
    dispatch(routerActions.push(`/addcoaster`));
    return false;
    //dispatch(routerActions.push(`/result/${e.id}`));
  }

  render() {
    const {items, isFetching , meta, messages} = this.props
    return (
      <div className="dashboard">
        <div className="container">
          <h1>Coaster</h1>
          <a href className="btn btn-primary" data-toggle="modal" data-target="#myModal">linkedin account</a>
          <a href="javascript:void(0)" className="pull-right" onClick={this.handleAddCoaster}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Coaster</a>
          {!isFetching && <TableCoaster items={items} 
          onStartClick={this.handleStartClick} 
          onViewResult={this.handleViewResult} 
          onDeleteCoaster={this.handleDeleteCoaster}/>}
        </div>
        {/* Modal */}
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Linkedin Account</h4>
              </div>
              <div className="modal-body">
              {messages.success &&<div className="alert alert-success" role="alert">updated!</div>}
                {!isFetching &&<form>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="emailLkd" placeholder="Email" defaultValue={meta.linkedin.email}/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="passwordLkd" placeholder="Password" defaultValue="123213123"/>
                  </div>
                </form>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.handleSaveLkd}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { postsByApi, messages } = state;
  const { meta, isFetching, items } = postsByApi.data || {
    meta: {
      linkedin: '',
      passwordLkd: ''
    },
    isFetching: false,
    items: []
  };
  return {
    meta,
    isFetching,
    items,
    messages
  };
}

export default connect(mapStateToProps)(Coaster);
