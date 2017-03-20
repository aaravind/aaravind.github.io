
import React from 'react';
import $ from 'jquery';

class InputType extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }

  render(){
  	const value = this.props.value;
  	const active = this.props.active;
  	const type = this.props.type;
    return (
                     <span className="check-box" onClick={this.handlecheck.bind(this)}>
                     <input type={type} value={value} id="checkbox-popular" className={active == 0 ? "" : 'checked'} />
                       <label for="checkbox-popular">
                       <span className="check"></span>
                       <span className="text">Most Popular</span>
                       </label>
                     </span>
      )
  }
}



export{
  InputType
}

