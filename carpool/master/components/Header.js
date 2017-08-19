import React from 'react';
import Constants from './../constants';
import 'whatwg-fetch';
import {browserHistory} from 'react-router';
class Header extends React.Component{

	logout(){
		let url = Constants.endpoints["LOGOUT"].url+ "key="+localStorage.getItem("carpoollogin");
		let method = Constants.endpoints["LOGOUT"].method;
		let self = this;
		this.props.store.fetchdata(url,method).then((data) => {
		if(data.data.length == 0){
		 localStorage.setItem("carpoollogin","");
		 self.props.store.updateTab("LOGIN");
		 browserHistory.push('login');
		 }	
		})
	}
	render(){
		const {currentTab,enableLogout} = this.props;
		const description = Constants.endpoints[currentTab].description;
	return (
   	  <div className="header">
   	  	<span className="home"><i className="material-icons">directions_car</i></span>
   	  	<h1>{description}</h1>
   	  	{
   	  	enableLogout ? 
   	  	<span className="logout" onClick={this.logout.bind(this)}>
		<i className="material-icons">exit_to_app</i>
   	  	</span>
   	  	:
   	  	null
   	  	}
      </div>
		);
	}
};

export default Header;