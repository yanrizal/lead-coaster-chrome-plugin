import React from 'react'
import $ from 'jquery'

class TableCoaster extends React.Component{

  startBot = e => {
    $(e.target).hide();
    $(e.target).next().show();
    const user = localStorage.getItem('user');
    this.props.onStartClick({
      'start':true,
      'searchId':e.target.getAttribute('data-id'),
      'username':JSON.parse(user).username
    });
  }

  pauseBot = e => {
    $(e.target).hide();
    $(e.target).prev().show();
    this.props.onStartClick({
      'start':false
    });
  }

  viewResult = e => {
    this.props.onViewResult({
      'start':true,
      'id':e.target.getAttribute('data-id')
    });
  }

  deleteCoaster = e => {
    this.props.onDeleteCoaster({
      'name':e.target.getAttribute('data-name'),
      'id':e.target.getAttribute('data-id')
    });
  }

	render(){
      const { items } = this.props;
      const listNode = items.map((items,idx) => { 
        let lengthPV = (items.profileVisit.length === 0 ? 0 : JSON.parse(items.profileVisit).length);
        return(
          <tr id={'tcoaster-'+idx} key={idx}> 
            <th scope="row">{items.searchName}</th> 
            <td style={{width:'295px',textOverflow:'ellipsis',display:'block',overflow:'hidden',height:'58px'}}><a href={items.urlSearch}>{items.urlSearch}</a></td> 
            <td>{lengthPV} views</td> 
            <td>{items.totalSearch}</td> 
            <td>0 Leads</td>
            <td>
              <a style={{cursor:'pointer'}} data-id={idx} onClick={this.startBot}>Start</a>
              <a style={{display:'none',cursor:'pointer'}} className="pause" onClick={this.pauseBot}>Pause</a> | 
              <a style={{cursor:'pointer'}} data-id={idx} data-name={items.searchName} onClick={this.deleteCoaster}>Delete</a></td>
            <td><button data-id={idx} onClick={this.viewResult}>View Result</button></td>
          </tr> 
        )
      });

        return(
          <table className="table">
            <thead> 
              <tr> 
                <th>Coaster Name</th> 
                <th>Search Link</th> 
                <th>Profile Visits</th> 
                <th>Total In Search</th> 
                <th>Leads</th> 
                <th>Pause/Delete</th> 
                <th>Results</th>
              </tr> 
            </thead> 
            <tbody> 
              {listNode}
            </tbody> 
          </table>
        )
	}
}


export default TableCoaster;

