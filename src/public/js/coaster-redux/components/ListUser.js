import React from 'react'
import $ from 'jquery'

class ListUser extends React.Component{

  startBot = () => {
    this.props.onStartClick({
      'start':true
    });
  }

	render(){
      const { items, profileVisit } = this.props;
      console.log(profileVisit);
      let pv = []
      if (profileVisit[0] != null) {
        pv = JSON.parse(profileVisit);
      }
      //
      const listNode = pv.map((items,idx) => { 
        return(
          <tr key={idx}>
            <td>{items.fullName}</td> 
            <td><a href={items.idUrl}>{items.idUrl}</a></td>
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

