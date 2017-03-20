import React from 'react';
import $ from 'jquery';

class CreateButton extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }

  render(){
    return (
            <div className={"createtrip "+this.props.classtype}>
            <span>create my trip</span>
            </div>
      )
  }
}



export{
  CreateButton
}

