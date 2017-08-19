       const initialState = {
        start:"",
        destination:"",
        data: [],
        defaultLocation:{lat: 12.9716, lng: 77.5946},
        selectedRide:"",
        selectRideData:{}
};
export default (state = initialState, action) => {
  switch (action.type){
        case 'UPDATE_DESTINATIONS':
        return {
        ...state,
        start:action.start,
        destination:action.destination,
        selectedRide:""
               }
        case 'UPDATE_RIDES':
        let data = [];
        data = action.data;
        return {
        ...state,
        data
               }
        case 'UPDATE_SELECTED_RIDE':
        let currentride = ((action.ride == state.selectedRide) ? "" : action.ride);
        let selectdata = Object.assign({},((action.ride == state.selectedRide) ? {} : action.data));
        return {
        ...state,
        selectedRide:currentride,
        selectRideData: selectdata
               }
        case 'SET_INITIAL_RIDE_STATE':
        let initialstate = Object.assign({},initialState);
        return {
        ...initialstate
               }                     
        default:
              return state;
  }
};