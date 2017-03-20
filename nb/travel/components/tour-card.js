import React from 'react';
import $ from 'jquery';

class Tourcard extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }
  render(){
    const tours = this.props.tours;
    return (
           <div className="each_tour col-md100">
               <div className="image-container">
               <img src={tours.image}/>
               <div className="image-title">{tours.title}</div>
               </div>
             <div className="tour-info-container">
                 <div className="price-days">
                 <span className="days">{tours.days + ' Days: '}</span>
                 <span className="price">{'$' + tours.cost} <span className="font16"> / person </span> </span>
                 </div>
                 <div className="tour-description">
                 <span>
                 {tours.description}
                 </span>
                 </div>
             </div>
             <div className="inquire-details">
             <p className="details">Details</p>
             <p className="inquire">inquire</p>
             </div>
           </div>
      )
  }
}



export{
  Tourcard
}

