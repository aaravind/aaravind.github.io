import React from 'react';
import $ from 'jquery';
import {Language} from './../../components/language';
import {CreateButton} from './../../components/createbutton';
class Header extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }
  shownavigation(target){
          let a = $('.navigation').toggleClass('active');
        }
  render(){
    return (
      <div className="top">
        <div className="inner_content">
          <div className="left">
              <div className="logo">
              <a href="#"></a>
              </div>
              <div className="tagline hide-lg hide-md">
              <p>Private tailor-made journeys of a lifetime</p>
              </div>
          </div>
          <div className="right">
            <div className="phno hide-tab">
            <a href="tel:18882632574">1 888 263 2574</a>
            </div>
            <div className="usericon">
            <span className="icon chat_icon"></span>
            </div>
            <CreateButton classtype={'hide-tab'}/>
            <Language classtype={'hide-mb'}/>
            <div className="mobile-menu" onClick={this.shownavigation.bind(this)}>
               <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                </a>
            </div>
          </div>  
        </div>
      </div>
      )
  }
}



export{
  Header
}

