import React from 'react';
import {connect} from 'react-redux';
import {fetchapiandcalldispatch} from './../actions/commonActions';
import {getcountrydata} from './../actions/countryActions';
import {CountryContainer} from './../containers/country/countrycontainer';
import $ from 'jquery';
class CountryList extends React.Component {

constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
  }

  render(){
    return (
      <div>
      <CountryContainer store={this.props} />
      </div>
      )
  }
}

function mapStateToProps(state, ownProps){
  return {
   country_list:state.countrylist
  }
}

function mapDispatchToProps(dispatch) {
  return{
    fetchdata : (api,method) => dispatch(fetchapiandcalldispatch(api,method)),
    getcountrydata : data => dispatch(getcountrydata(data)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CountryList);
