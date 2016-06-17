import React from 'react'
import $ from 'jquery'

class TableCoaster extends React.Component{

  startBot = e => {
    $(e.target).hide();
    $(e.target).next().show();
    this.props.onStartClick({
      'start':true
    });
  }

  pauseBot = e => {
    $(e.target).hide();
    $(e.target).prev().show();
    this.props.onStartClick({
      'start':false
    });
  }

  viewResult = () => {
    this.props.onViewResult({
      'start':true
    });
  }

	render(){
      const { items } = this.props;
      const listNode = items.map((items,idx) => { 
        console.log(items.profileVisit)
        return(
          <tr key={idx}> 
            <th scope="row">Yanuar</th> 
            <td style={{width:'100px'}}><a href="">{items.urlSearch}</a></td> 
            <td>{JSON.parse(items.profileVisit).length} views</td> 
            <td>{items.totalSearch}</td> 
            <td>0 Leads</td>
            <td><a style={{cursor:'pointer'}} onClick={this.startBot}>Start</a><a style={{display:'none',cursor:'pointer'}} className="pause" onClick={this.pauseBot}>Pause</a></td>
            <td><button onClick={this.viewResult}>View Result</button></td>
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

