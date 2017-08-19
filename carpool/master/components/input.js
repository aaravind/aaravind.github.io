import React from 'react';

class Input extends React.Component{

	render(){
	const {type, name, value, placeholder, label, holderClass,clickEvent,keyUpEvent} = this.props;
    return (
   	  <div className={holderClass}>
   	  	{label !== "" ? 
	   	  <label>{label}</label>
	   	  :
	   	  null
	   	}
	   	{type === "button" ? 
	   	  <input type={type} 
	      		 name={name} 
	      		 placeholder={placeholder}
	      		 value={value} 
	      		 onClick={clickEvent}
	      		 onKeyUp={keyUpEvent} />
	   	  :
	   	  <input type={type} 
	      		 name={name} 
	      		 placeholder={placeholder} 
	      		 onClick={clickEvent}
	      		 onKeyUp={keyUpEvent} />
	   	}
	      
      </div>
		);
	}
};

export default Input;