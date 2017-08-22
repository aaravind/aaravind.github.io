import React from 'react';
import {connect} from 'react-redux';
import {finalBreakdown} from './../actions/appActions';
import Constants from './../constants';
class FinalOrder extends React.Component{
  
	render(){
      const {data,finalBreakdown,productsList} = this.props;
      let finalAmount = finalBreakdown(data);
      let symbol = productsList.currency;
	return (
   	    <div className="total-cart">
          <p className="head">Total</p>
          <p className="items"><span className="title">Items{"(" + finalAmount.count + ")"} </span><span className="value">: <p>{symbol + finalAmount.total}</p></span></p>
          <p className="discount"><span className="title">Discount </span><span className="value">: <p>{'-'+symbol + finalAmount.discount}</p></span></p>
          <p className="typediscount"><span className="title">Type Discount </span><span className="value">: <p>{'-'+symbol + finalAmount.extraDiscount}</p></span></p>
          <p className="ordertotal"><span className="title">Order Total </span> <span className="value">: <p>{symbol + finalAmount.finalAmount}</p></span></p>
        </div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    productsList : state.productsList
  }
}

function mapDispatchToProps(dispatch) {
  return{
    finalBreakdown : (data) => dispatch(finalBreakdown(data))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(FinalOrder);