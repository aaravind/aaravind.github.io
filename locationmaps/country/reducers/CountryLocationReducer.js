       const initialState = {
       	selectedcountry:"India",
       	latitude:"20.5937",
        longitude:"78.9629",
        mapStyles:{
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
};
export default (state = initialState, action) => {
  switch (action.type){
        case 'UPDATE_COUNTRY_LOCATION':
        return Object.assign({}, action.data);
    default:
          return state;
  }
};