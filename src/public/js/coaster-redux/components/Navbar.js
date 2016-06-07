import React from 'react'
import $ from 'jquery'

class Navbar extends React.Component{

    handleNavClick = e => {
      const url = e.target.getAttribute('data-page');
      console.log(url);
      this.props.onLearnClick({
        'page':url
      })
    }

	render(){
      const { isLogin } = this.props;

        return(
          <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container">
                <div className="navbar-header">
                  {isLogin &&<ul className="nav navbar-nav">
                    <li className="active"><a href="#">Coasters <span className="sr-only">(current)</span></a></li>
                    <li><a data-page='result' onClick={this.handleNavClick} >Results</a></li>
                    <li><a data-page='help' onClick={this.handleNavClick} >Help</a></li>
                    <li><a href="#">Invite</a></li>
                    <li><a href="#">Account</a></li>
                    <li><a href="#">Login</a></li>
                  </ul>}
                  <a className="pull-right" href="/logout">Logout</a>
                </div>
              </div>
            </nav>
        )
	}
}


export default Navbar;

