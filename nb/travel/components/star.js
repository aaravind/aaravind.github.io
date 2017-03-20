import React from 'react';
import $ from 'jquery';

class Starcontainer extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }
  render(){
	  let tmp = [];
	  for (let i = 0; i < this.props.count; i++) {
	    tmp.push(i);
	  }
	  let indents = tmp.map(function (i) {
	    return (
	      <div className="each-star"><span>★</span></div>
	    );
	  });

    return (
       <div className="starcontainer">
       {indents}
       </div>
      )
  }
}



export{
  Starcontainer
}

