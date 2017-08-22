       const initialState = {
        cartData: {},
        extradiscountTypes:{"fiction":15}
};
export default (state = initialState, action) => {
  switch (action.type){    
        case 'ADD_CART_PRODUCT':
        let cartData = Object.assign({},state.cartData);
          if(cartData[action.data.id] === undefined){
            cartData[action.data.id] = Object.assign({},action.data);
            cartData[action.data.id].count = 1;
          }
          else{
            cartData[action.data.id] = Object.assign({},cartData[action.data.id]);
            cartData[action.data.id].count = cartData[action.data.id].count + 1;
          }
        return {
        ...state,
        cartData
               }
        case 'SUBTRACT_CART_PRODUCT':
        let subtractCartData = Object.assign({},state.cartData);
          if(subtractCartData[action.data.id].count-1 <= 0){
            subtractCartData[action.data.id] = Object.assign({},action.data);
            subtractCartData[action.data.id].count = 0;
          }
          else{
            subtractCartData[action.data.id] = Object.assign({},action.data);
            subtractCartData[action.data.id].count = subtractCartData[action.data.id].count - 1;
          }
        return {
        ...state,
        cartData:subtractCartData
               }        
        case 'REMOVE_CART_PRODUCT':
        let removedCartData = Object.assign({},state.cartData);
        if(removedCartData[action.id] != undefined){
          delete removedCartData[action.id];
        }
        return {
        ...state,
        cartData:removedCartData
               }                            
        default:
              return state;
  }
};