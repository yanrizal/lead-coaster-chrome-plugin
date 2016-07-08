import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NProgress from 'nprogress-npm';

class Help extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    NProgress.start();
    NProgress.done();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <h1>How to create a coaster video</h1>
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

export default connect(mapStateToProps)(Help);
