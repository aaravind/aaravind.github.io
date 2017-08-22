import React from 'react';
import {connect} from 'react-redux';
import {removeproduct} from './../actions/appActions';
import Constants from './../constants';
class CartCard extends React.Component{
  
  removeItem(data){
    this.props.removeproduct(data.id);
  } 
	render(){
      const {data} = this.props;
	return (
   	    <div className="each-cart">
          <span className="img-wrapper">
          <img src={data.img_url} />
          </span>
          <span className="name">{data.name}</span>
          <span className="close" onClick={this.removeItem.bind(this,data)}>x</span>
        </div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return{
    removeproduct : (id) => dispatch(removeproduct(id))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CartCard);