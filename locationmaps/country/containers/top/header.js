import React from 'react';
import $ from 'jquery';
class Header extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }

  render(){
    debugger;
    return (
      <div className="top">
        <h1>Countries</h1>
      </div>
      )
  }
}



export{
  Header
}

