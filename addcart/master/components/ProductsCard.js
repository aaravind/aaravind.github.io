import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {addcart} from './../actions/appActions';
import Constants from './../constants';
// import {notify} from 'react-notify-toast';
import {browserHistory} from 'react-router';

var notifyProductAdded = (function (fn,sec) {
  var timer;
  return function (fn,sec) {
    window.clearTimeout(timer);
    timer = window.setTimeout(fn,sec); 
  };
})();

class ProductsCard extends React.Component{
   
   addcart(target){
      this.props.addcart(target);
      $(".notification-wrapper").html('<span>'+target.name + " is added to cart" + '</span>').css("display","block");
      notifyProductAdded(function(){
         $(".notification-wrapper").css("display","none");
      },3000) 
     // notify.show(target.name + " is added to cart","success",3000);
   }
	render(){
      const {data,productsList} = this.props;
      const symbol = productsList.currency;
	return (
   	  <div className="each-product">
            <div className="each-product-wrapper">
                 <span className="img-wrapper">
                 <img src={data.img_url} />
                 </span>
                 {data.discount != 0 ?
                 <div className="show-discount">
                 <p>{data.discount + "% off"}</p> 
                 </div>
                 :
                 null
                  }
                 <div className="details">
                 <p>{data.name}</p>
                 <p className={"left " + (data.discount != 0 ? "strike" : "")}>
                 <span className="actual">{symbol + data.price}</span>
                 {data.discount != 0 ?
                 <span className="discount">{symbol + (data.price - (data.price*data.discount/100))}</span> 
                 :
                 null
                 }
                 </p>
                 <p className="right add-cart" onClick={this.addcart.bind(this,data)}>Add to cart</p>
                 </div>
              </div>
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
    addcart : (data) => dispatch(addcart(data))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductsCard);