import React from 'react';
import {connect} from 'react-redux';
import {getEachProductAmount} from './../actions/appActions';
import Constants from './../constants';
import CartCard from './../components/cartCard';
import ChangeQuantity from './../components/changeQuantity';
import {browserHistory} from 'react-router';
class CartContainer extends React.Component{
   
	render(){
      const {data,getEachProductAmount,productsList} = this.props;
      const symbol = productsList.currency;
	return (
      <div className="cart-wrapper">
      <CartCard data={data} />
      <ChangeQuantity data={data} />
      <div className="amount">{symbol + getEachProductAmount(data)}</div>
      </div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    location:ownProps.location,
    productsList : state.productsList
  }
}

function mapDispatchToProps(dispatch) {
  return{
    getEachProductAmount : (data) => dispatch(getEachProductAmount(data))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CartContainer);