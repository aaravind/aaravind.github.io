import React from 'react';
import {connect} from 'react-redux';
import {FilterContainer} from './../containers/tours/filter';
import {CardContainer} from './../containers/tours/cardcontainer';
import {Info} from './../containers/tours/info';
import { gettoursdata } from './../actions/toursListActions';
import $ from 'jquery';
class Tours extends React.Component {

constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
  }

  render(){
    return (
      <div className="tourscontainer">
          <Info classtype={'left hide-tab col25'}/>
      <div className="package right inner col75 col-tab100">
      <FilterContainer store={this.props}/>
      <CardContainer store={this.props}/>
      </div>
      </div>
      )
  }
}

function mapStateToProps(state, ownProps){
  return {
    // You can now say this.props.books
    tours_list: state.tourslist,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    gettours: tours => dispatch(gettoursdata(tours))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Tours);
