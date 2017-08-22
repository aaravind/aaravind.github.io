import React from 'react';
import Constants from './../constants';
import {connect} from 'react-redux';
import {addcart,subtractproduct} from './../actions/appActions';
class ChangeQuantity extends React.Component{
   
  clickAdd(data){
    this.props.addcart(data);
  }
  clickSubtract(data){
    this.props.subtractproduct(data);
  } 
	render(){
      const {data,addcart,subtractproduct} = this.props;
	return (
   	    <div className="change-product">
          <span className="subtract" onClick={this.clickSubtract.bind(this,data)}></span>
          <span className="quantity">{data.count}</span>
          <span className="add" onClick={this.clickAdd.bind(this,data)}></span>
        </div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    location:ownProps.location,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    addcart : (data) => dispatch(addcart(data)),
    subtractproduct : (data) => dispatch(subtractproduct(data)),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(ChangeQuantity);