       const initialState = {
      data: [],
};
export default (state = initialState, action) => {
  switch (action.type){
        case 'GET_FILTER_LIST':
        return Object.assign({}, action.filter_list);
    default:
          return state;
  }
};