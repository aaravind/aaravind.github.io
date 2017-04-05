import React ,{PropTypes} from 'react';

class AppContainer extends React.Component {

constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){
  }
  render(){
    return (
    	<div>
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
