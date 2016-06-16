import React from 'react'
import $ from 'jquery'

class ListUser extends React.Component{

  startBot = () => {
    this.props.onStartClick({
      'start':true
    });
  }

	render(){
      const { items } = this.props;
      const listNode = items.map((items,idx) => { 
        return(
          <tr key={idx}>
            <td>{JSON.parse(items.profileVisit).length} views</td> 
            <td>{items.totalSearch}</td>
          </tr> 
        )
      });

        return(
          <table className="table">
            <thead> 
              <tr> 
                <th>Name</th> 
                <th>Profile Url</th>
              </tr> 
            </thead> 
            <tbody> 
              {listNode}
            </tbody> 
          </table>
        )
	}
}


export default ListUser;

