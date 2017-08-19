       const initialState = {
       currentTab : "REGISTER"
};
export default (state = initialState, action) => {
  switch (action.type){ 
        case 'UPDATE_CURRENT_TAB':
          return {
          ...state,
          currentTab:action.name
                 }                
        default:
              return state;
  }
};