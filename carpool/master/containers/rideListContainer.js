import React from 'react';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import RideCard from './../components/rideCard';
class RideListContainer extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
    componentWillReceiveProps(nextProps) {
  }
   componentDidMount(){
   }
   selectRide(target){
    this.props.cardAction(target.ride_number,target);
  }
  render(){
    const rideData = this.props.data;
    const selectedRide = this.props.selectedRide;
    const cardAction = this.props.cardAction;
    const self = this;
    return (
      <div className="ride-wrapper">
          { (rideData.length !== 0) ?
            (rideData.map(function(each_row, i){
                  return (
                    <div className={"each-ride-card " + ((selectedRide == each_row.ride_number) ? "active" : "")}
                     data-ride={each_row.ride_number} onClick={self.selectRide.bind(self,each_row)}>
                    <RideCard ride={each_row} selectedRide = {selectedRide}/>
                    </div>
                    )
                })
            )
            :
            <span className="norides">No rides available.Please try some other routes</span>
          }
      </div>
      )
  }
}



export{
  RideListContainer
}

