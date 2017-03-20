import React from 'react';
import $ from 'jquery';

class MenuItem extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }

  render(){
    return (
            <li className={this.props.description.active ? 'active each_menu' : 'each_menu'}>
               <a href="#">{this.props.description.title}<span className="arrow"></span></a>
            </li>
      )
  }
}



export{
  MenuItem
}

