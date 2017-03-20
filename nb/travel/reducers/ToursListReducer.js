       const initialState = {
       	popular:0,
       	sorton:"",
       	sortby:"",
      data: [],
};
export default (state = initialState, action) => {
  switch (action.type){
        case 'GET_TOURS_DATA':
        return Object.assign({}, action.data);
    default:
          return state;
  }
};