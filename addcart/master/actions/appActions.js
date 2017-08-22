
export function updateproductsList(data){
    return function(dispatch){
     dispatch({ type:'UPDATE_PRODUCTS_LIST', data: data});
    }
}

export function addcart(data){
    return function(dispatch){
     dispatch({ type:'ADD_CART_PRODUCT', data: data});
    }
}

export function getEachProductAmount(data){
  return function (dispatch) {
  	//return data.count * (data.price - (data.price*data.discount/100))
  	return data.count * data.price
 }
}
export function finalBreakdown(data){
  return function (dispatch) {
  	//return data.count * (data.price - (data.price*data.discount/100))
  	let allKeys = Object.keys(data.cartData);
  	let total = 0;
  	let discount = 0;
  	let extraDiscount = 0;
  	let count =0;
  	for(var i=0;i<allKeys.length;i++){
  		let eachproduct = data.cartData[allKeys[i]];
  		count = count + eachproduct.count;
  		total = total + (eachproduct.count * eachproduct.price)
  		discount = discount + (eachproduct.count * (eachproduct.price*eachproduct.discount/100));
  		if(data.extradiscountTypes[eachproduct.type] != undefined)
  		extraDiscount = extraDiscount 
  						+ (((eachproduct.count * eachproduct.price)
  					    - (eachproduct.count * (eachproduct.price*eachproduct.discount/100))) 
  					    * (data.extradiscountTypes[eachproduct.type] /100))

  	}
  	let finalAmount = total - discount - extraDiscount;
  	return {total:total,discount:discount,extraDiscount:extraDiscount,finalAmount:finalAmount,count:count}
  	//return data.count * data.price
 }
}


export function getTotalProductsCount(data){
  return function (dispatch) {
  	let allProducts = Object.keys(data);
  	let total = 0;
  	for(var i=0;i<allProducts.length;i++){
  		total = total + data[allProducts[i]].count
  	}
  	return total;
 }
}

export function subtractproduct(data){
    return function(dispatch){
     dispatch({ type:'SUBTRACT_CART_PRODUCT', data: data});
    }
}

export function removeproduct(id){
    return function(dispatch){
     dispatch({ type:'REMOVE_CART_PRODUCT', id: id});
    }
}


