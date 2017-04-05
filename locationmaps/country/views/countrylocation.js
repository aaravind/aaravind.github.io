import React from 'react';
import {connect} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import {updatecountryposition} from './../actions/countryActions';
import $ from 'jquery';
import {browserHistory} from 'react-router';
const MarkerComponent = () => <div className="redmarker"></div>;
class CountryList extends React.Component {

constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
  }

  static defaultProps = {
  	center: {lat: 20.5937, lng: 78.9629},
    zoom: 5
  };
 componentDidMount(){
    let location=this.props.location.query;
         const beforefetchdata = Object.assign({}, this.props.countrylocation);
      beforefetchdata.selectedcountry = location.country;
      beforefetchdata.latitude = location.lat;
      beforefetchdata.longitude = location.lng;
      this.props.updatecountryposition(beforefetchdata);
   }
   updatepos(target){
   	         const beforefetchdata = Object.assign({}, this.props.countrylocation);
      beforefetchdata.latitude = target.target.parentElement.children[0].value;
      beforefetchdata.longitude = target.target.parentElement.children[0].value;
      this.props.updatecountryposition(beforefetchdata);
   }
   back(target){
    browserHistory.push('country-list');
     //window.location.assign(tabName);
  }
  render() {
  	let locationposition = {lat: this.props.countrylocation.latitude/1, lng: this.props.countrylocation.longitude/1};
    return (
    	<div>
    	<div className="searchlatlong">
    	<input type="button" value="Back" onClick={this.back.bind(this)}></input>
    	<input type="text" placeholder={locationposition.lat}></input>
    	<input type="text" placeholder={locationposition.lng}></input>
    	<input type="button" value="search" onClick={this.updatepos.bind(this)}></input>
    	</div>
    	<div className="maps">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDPC3R_aVyWkFdVmRF86PZI-NWTjuURpus"
          }}
        defaultCenter={locationposition}
        defaultZoom={this.props.zoom}>
        <MarkerComponent
          lat={locationposition.lat}
          lng={locationposition.lng}/>
      </GoogleMapReact>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
  	location:ownProps.location,
  	countrylocation:state.countrylocation
  }
}

function mapDispatchToProps(dispatch) {
  return{
  	updatecountryposition : data => dispatch(updatecountryposition(data))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CountryList);
