import React from 'react';
import {connect} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import $ from 'jquery';
const MarkerComponent = () => <div className="redmarker"><img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png"></img></div>;
class MapContainer extends React.Component {

constructor(props){
    super(props);
    this.state = {
                  mapStyles: {
                  styles:[
                 {
                     "featureType": "administrative",
                     "elementType": "labels.text.fill",
                     "stylers": [
                         {
                             "color": "#444444"
                         }
                     ]
                 },
                 {
                     "featureType": "landscape",
                     "elementType": "all",
                     "stylers": [
                         {
                             "color": "#f2f2f2"
                         }
                     ]
                 },
                 {
                     "featureType": "poi",
                     "elementType": "all",
                     "stylers": [
                         {
                             "visibility": "off"
                         }
                     ]
                 },
                 {
                     "featureType": "poi.park",
                     "elementType": "geometry.fill",
                     "stylers": [
                         {
                             "visibility": "on"
                         },
                         {
                             "color": "#dfe9db"
                         }
                     ]
                 },
                 {
                     "featureType": "road",
                     "elementType": "all",
                     "stylers": [
                         {
                             "saturation": -100
                         },
                         {
                             "lightness": 45
                         }
                     ]
                 },
                 {
                     "featureType": "road.highway",
                     "elementType": "all",
                     "stylers": [
                         {
                             "visibility": "simplified"
                         }
                     ]
                 },
                 {
                     "featureType": "road.arterial",
                     "elementType": "labels.icon",
                     "stylers": [
                         {
                             "visibility": "off"
                         }
                     ]
                 },
                 {
                     "featureType": "transit",
                     "elementType": "all",
                     "stylers": [
                         {
                             "visibility": "off"
                         }
                     ]
                 },
                 {
                     "featureType": "water",
                     "elementType": "all",
                     "stylers": [
                         {
                             "color": "#c4eaf9"
                         },
                         {
                             "visibility": "on"
                         }
                     ]
                 }
            ]
            }
    }
  }
  componentWillReceiveProps(nextProps){
  }

  static defaultProps = {
  	center: {lat: 20.5937, lng: 78.9629},
    zoom: 16
  };
 componentDidMount(){

   }

  render() {
    let markers = this.props.data.map(function(each){return {lat:each.lat,lng:each.lng}})
    let locationposition = markers[0];
    if(markers.length == 0)
        locationposition = this.props.defaultLocation;
    
    return (
    	<div className="mapContainer" style={{"height":300}}>
      <GoogleMapReact
        options={this.state.mapStyles}
        bootstrapURLKeys={{
          key: "AIzaSyDPC3R_aVyWkFdVmRF86PZI-NWTjuURpus"
          }}
        center={locationposition}
        defaultZoom={13}>
        {markers.map(function(each_row, i){
                  return (
                          <MarkerComponent
                          lat={each_row.lat}
                          lng={each_row.lng} />
                  )
                })
            }
      </GoogleMapReact>
      </div>
    );
  }
}

export{
  MapContainer
}
