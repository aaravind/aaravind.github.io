       const initialState = {
       	selectedcountry:"",
       	latitude:"",
        longitude:"",
        search:"",
        changed:false,
        data: [],
};
export default (state = initialState, action) => {
  switch (action.type){
        case 'GET_COUNTRY_DATA':
        return Object.assign({}, action.data);
    default:
          return state;
  }
};