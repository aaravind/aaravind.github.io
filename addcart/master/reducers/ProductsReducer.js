       const initialState = {
        data: [],
        currency:"$"
};
export default (state = initialState, action) => {
  switch (action.type){    
        case 'UPDATE_PRODUCTS_LIST':
        return {
        ...state,
        data:action.data
               }                
        default:
              return state;
  }
};