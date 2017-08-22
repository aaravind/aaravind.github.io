import React from 'react';
import {connect} from 'react-redux';
import Constants from './../constants';
import 'whatwg-fetch';
import {getTotalProductsCount} from './../actions/appActions';
import {browserHistory} from 'react-router';
class Header extends React.Component{

	gocart(){
		if(this.props.data.length != 0)
			browserHistory.push('cart');
	}
	enableBack(){
		browserHistory.push('products');
	}
	render(){
		const {description,enableGoCart,enableBack,cartList,getTotalProductsCount} = this.props;
	return (
   	  <div className="header">
   	  	{ enableBack ?
   	  	<span className="back" onClick={this.enableBack.bind(this)}></span>
   	  	:
   	  	null
   	  	}
   	  	<h1>{description}</h1>
   	  	{
   	  	enableGoCart && getTotalProductsCount(cartList) != 0 ?
   	  	<p> 
   	  	<span className="cart" onClick={this.gocart.bind(this)}>
		Go to cart
   	  	</span>
   	  	<span className="count">{getTotalProductsCount(cartList)}</span>
   	  	</p>
   	  	:
   	  	null
   	  	}
      </div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    cartList:state.cartList.cartData,
  }
}

function mapDispatchToProps(dispatch) {
  return{
  	getTotalProductsCount : (data) => dispatch(getTotalProductsCount(data))
  	
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);