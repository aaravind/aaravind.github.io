import React from 'react';
import {connect} from 'react-redux';
import 'whatwg-fetch';
import {fetchapiandcalldispatch} from './../actions/commonActions';
import {updateproductsList,finalBreakdown} from './../actions/appActions';
import {browserHistory} from 'react-router';
import Constants from './../constants';
import Header from './../components/Header';
import CartContainer from './../containers/cartContainer';
import FinalOrder from './../components/finalOrder';
import {notify} from 'react-notify-toast';
import $ from 'jquery';
class ProductsList extends React.Component {

constructor(props){
    super(props);
    this.state = {
      loading: true}
  }
  componentWillMount(){
    if(Object.keys(this.props.cartList.cartData).length == 0){
      browserHistory.push('products');
    }
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
    this.setState({ loading: false });
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(){
    if(window.scrollY > window.innerHeight && window.innerWidth > 767)
      $(".total-cart").css("top","calc(100% - 160px)");
    else if(window.scrollY == 0 && window.innerWidth > 767)
      $(".total-cart").css("top","20px")
    else if(window.innerWidth < 768){
      $(".total-cart").css("top","0px")
    }
    else{
      
    }
}
  componentWillReceiveProps(nextProps){
    if(Object.keys(nextProps.cartList.cartData).length == 0){
      browserHistory.push('products');
    }
  }
  render(){
    const {cartData} = this.props.cartList;
    const cartDataKeys = Object.keys(cartData);
    const {loading} = this.state;
    let finalAmount = this.props.finalBreakdown(this.props.cartList);
    return (
      <div className="main-container cart">
       <Header data={[]} enableGoCart={false} enableBack={true} description = {"Order Summary"}/>   
        {loading ?  
          <span className="loader">Fetching products</span>
           :
           null
        }
          <div>
          <div className="cart-container">
            <div className="cart-list-container">

            <div className="cart-wrapper head">
            <div className ="each-cart">Items {"("+finalAmount.count+")"}</div>
            <div className ="change-product">Qty</div>
            <div className ="amount">Price</div>
            </div>

            {loading === false ?
              (
                cartDataKeys.map(function(each_product, i){
                return (
                        <CartContainer data = {cartData[each_product]} />
                       )
                  })
               )
              :
              null
            }
            </div>
            <FinalOrder data={this.props.cartList}/>
        </div>
        </div>
      </div>
      )
  }
}

function mapStateToProps(state, ownProps){
  return {
    cartList : state.cartList,
    location:ownProps.location
  }
}

function mapDispatchToProps(dispatch) {
  return{

    updateproductsList : (data) => dispatch(updateproductsList(data)),
    finalBreakdown : (data) => dispatch(finalBreakdown(data))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsList);
