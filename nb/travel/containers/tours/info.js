import React from 'react';
import $ from 'jquery';
import {Starcontainer} from './../../components/star';
class Info extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
  }

  render(){
    return (
      <div className={"info "+this.props.classtype}>
           <div className="info-details">
           <p className="header">Find the best trip for you</p>
           <p>Search through hundreds of our best curated trips that our guests have loved or customize one that’s perfect for you.</p>
           </div>
           <div className="info-details">
           <p className="header">Want a tailor-made trip?</p>
           <p>Design your own itinerary with the help of our destination experts.</p>
           <p className="redcolor"><strong><a href="#">Create My Trip</a></strong></p>
           </div>
          <div className="info-details review-container">
             <div className="review">
             <span className="logo"></span>
             <Starcontainer count={5} />
             <span className="">See our reviews</span>
             </div>
           </div>
           <div className="info-details contact">
           <a href="tel:18882632574">
           <div className="contact-image"></div>
            <span className="content">
             <p className="top">Talk to a travel expert</p>
              <p className="bottom">1 888 263 2574</p> 
              </span>
            </a>
            </div>
            <div className="info-details destinations">
            <p>Destinations</p>
              <ul>
                <li>India Tours</li>
                <li>Asia Tours</li>
                <li>Africa Tours</li>
                <li>South America Tours</li>
              </ul>
            </div>
      </div>

      )
  }
}



export{
  Info
}

