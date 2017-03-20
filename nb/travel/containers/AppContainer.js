import React ,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {Header} from './../containers/top/header';
import {Navigation} from './../containers/top/navigation';
class AppContainer extends React.Component {

constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){
  }
  render(){
    return (
    	<div>
      <Header/>
      <Navigation/>
      {this.props.children}
      </div>
      )
  }
}

AppContainer.propTypes = {
    children: PropTypes.object.isRequired
};

export{
	AppContainer
}
