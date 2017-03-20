import React from 'react';
import $ from 'jquery';
import {MenuItem} from './../../components/menuitem';
import {Language} from './../../components/language';
import {CreateButton} from './../../components/createbutton';
class Navigation extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }

  render(){
       const menu_items = [{"title": "Our Destinations","active":false},{"title": "Tours & Trips","active":true},{"title": "About Us","active":false},{"title": "Travel Blogs","active":false},{"title": "Special Offers","active":false},{"title": "Guest Reviews","active":false}]
    return (
           <div className="navigation clearboth">
               <nav>
               <div className="inner">
                   <ul className="menu">
                   <li className="each_menu hide-lg show-lg">
                   <a href="#" className="home">
                   <span className="icon home_icon"></span>
                   </a>
                   </li>
                   {menu_items.map(function(each_row, i){
                          return (
                                  <MenuItem description={each_row}/>
                                  )},this
                    )}
                   <li className="each_menu hide-lg show-tab bg-trans">
                    <CreateButton classtype = {'all'}/>
                   </li>
                   <li className="each_menu">
               <div className="search">
                   <input className="input" type="text" name="search" placeholder="Search" value="">
                   </input> 
                   <span className="icon search search_icon"></span>
               </div>
                   </li>
                   </ul>
                </div>
               </nav>
           </div>
      )
  }
}



export{
  Navigation
}

