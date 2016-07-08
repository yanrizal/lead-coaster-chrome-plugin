import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCoaster } from '../actions/coaster';
import config from '../config.json'
import NProgress from 'nprogress-npm';

class AddCoaster extends React.Component {

  constructor(props) {
    super(props);
    this.state = { url: '', name: '' };
  }

  componentDidMount(){
    NProgress.start();
    NProgress.done();
  }

  handleAddCoaster = e => {
    const { dispatch} = this.props;
    const user = localStorage.getItem('user');
    const data = {
      username:JSON.parse(user).username,
      urlSearch:this.state.url,
      searchName:this.state.name
    }
    dispatch(addCoaster(data));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <h1>Add Coaster</h1>
          <form style={{width:'50%'}}>
            <div className="form-group">
              <label>Coaster</label>
              <input type="text" name="name" onChange={this.handleChange} className="form-control" value={this.state.name}/>
            </div>
            <div className="form-group">
              <label>Add Search Links</label>
              <input type="text" name="url" className="form-control" onChange={this.handleChange} value={this.state.url}/>
            </div>
            <div className="form-group">
              <label>Schedule</label>
              <input className="form-control" id="exampleInputPassword1" disabled/>
            </div>
            <a href="javascript:void(0)" onClick={this.handleAddCoaster} className="btn btn-success">Add Coaster</a>
          </form>
        </div>
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

export default connect(mapStateToProps)(AddCoaster);
