import React from 'react';
import $ from 'jquery';

class Language extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }
      showdropdown(target){
          let a = $(target.target).parent().parent().parent().find('.dropdown').toggleClass('active');
        }
  render(){
    return (
            <div className={"language " + this.props.classtype}>
                  <a href="#" className="selected" onClick={this.showdropdown.bind(this)}>
                  <span className="flag us select">&nbsp;</span>
                  </a>
                  <ul className="dropdown ">
                        <li>
                        <a data-locale="gb"><span className="flag gb">&nbsp;</span><span className="text">GBR</span></a>
                        </li>
                        <li>
                        <a data-locale="in"><span className="flag fr">&nbsp;</span><span className="text">FRA</span></a>
                        </li>
                        <li>
                        <a data-locale="us"><span className="flag us">&nbsp;</span><span className="text">USA</span></a>
                        </li>
                  </ul>
            </div>
      )
  }
}



export{
  Language
}

