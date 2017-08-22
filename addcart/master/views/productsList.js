import React from 'react';
import {connect} from 'react-redux';
import 'whatwg-fetch';
import {fetchapiandcalldispatch} from './../actions/commonActions';
import {updateproductsList} from './../actions/appActions';
import {browserHistory} from 'react-router';
import Constants from './../constants';
import Header from './../components/Header';
import ProductsCard from './../components/ProductsCard';
import {notify} from 'react-notify-toast';
import $ from 'jquery';
class ProductsList extends React.Component {

constructor(props){
    super(props);
    this.state = {
      loading: true}
  }
  componentDidMount(){
    const { fetchdata,updateproductsList } = this.props;
    const {url,method} = Constants.endpoints["GETPRODUCTS"];
    fetchdata(url,method).then((data) => {
      updateproductsList(data);
      this.setState({ loading: false });
    });

  }
  componentWillReceiveProps(nextProps){
   
  }

  render(){
    const {data} = this.props.productsList;
    const {loading} = this.state;
    return (
      <div className="main-container products">
       <Header data={data} enableGoCart={true} enableBack={false} description = {"All Items"}/>   
        {loading ?  
          <span className="loader">Fetching products</span>
           :
           null
        }
        <div className="products-container">
          {data.length != 0 && loading === false ?
              (
              data.map(function(each_product, i){
              return (
                      <ProductsCard data = {each_product} />
                     )
                })
              )
            :
            null
          }
        </div>
      </div>
      )
  }
}

function mapStateToProps(state, ownProps){
  return {
    productsList : state.productsList,
    location:ownProps.location,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    fetchdata : (api,method) => dispatch(fetchapiandcalldispatch(api,method)),
    updateproductsList : (data) => dispatch(updateproductsList(data))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsList);
