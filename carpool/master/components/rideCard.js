import React from 'react';

class RideCard extends React.Component{

	render(){
	const {ride,selectedRide} = this.props;
    return (
   	    <div className="each-ride-card-wrapper">
	   	  	<div className="left">
	   	  		{selectedRide != ride.ride_number ?
	   	  		<i className="material-icons">person</i>
	   	  		:
	   	  		<i className="material-icons">done</i>
	   	  		}
	   	  	</div>
	   	  	<div className="center">
			    <div className="top">
			    <span className="name">{ride.u_name}</span>
			    <span className="duration">{ride.time + " min away" }</span>
			    </div>
			    <div className="route">
			    <span>route:<b>{ride.start + " to " + ride.destination}</b></span>
			    </div>
			    <div className="car-details">
			    <span>car:<b>{ride.car_model}</b></span>
			    <span>seats available:<b>{ride.seats}</b></span>
			    <span></span>
			    </div>
		    </div>
		    <div className="right">
		    	{selectedRide != ride.ride_number ?
	   	  		<span>
	   	  		<span className="rating">{ride.rating}</span>
			    <span className="favorite"><i className="material-icons">star</i></span>	
	   	  		</span>
	   	  		:
	   	  		<i className="material-icons call">call</i>
	   	  		}
		    </div>
	    </div>
		);
	}
};

export default RideCard;