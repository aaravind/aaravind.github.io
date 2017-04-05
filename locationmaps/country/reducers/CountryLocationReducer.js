       const initialState = {
       	selectedcountry:"India",
       	latitude:"20.5937",
        longitude:"78.9629"
};
export default (state = initialState, action) => {
  switch (action.type){
        case 'UPDATE_COUNTRY_LOCATION':
        return Object.assign({}, action.data);
    default:
          return state;
  }
};