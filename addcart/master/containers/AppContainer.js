import React ,{PropTypes} from 'react';
// import Notifications from 'react-notify-toast';
class AppContainer extends React.Component {

constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){

  }
  render(){
    return (
    	<div>
      <div className = "notification-wrapper"></div>
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
