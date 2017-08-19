import React from 'react';
import {connect} from 'react-redux';
import 'whatwg-fetch';
import {fetchapiandcalldispatch} from './../actions/commonActions';
import {updatedestinations,updaterides,updateselectedride,setInitialState,updateTab} from './../actions/appActions';
import {browserHistory} from 'react-router';
import Header from './../components/Header';
import Constants from './../constants';
import {MapContainer} from './../containers/mapContainer';
import {RideListContainer} from './../containers/rideListContainer';
import Input from './../components/input';
import {notify} from 'react-notify-toast';
import $ from 'jquery';
class Rides extends React.Component {

constructor(props){
    super(props);
    this.state = {
      loading: false}
  }
  componentWillMount(){
    if(localStorage.getItem("carpoollogin") == "" || localStorage.getItem("carpoollogin") == undefined){
      this.props.updateTab("LOGIN");
      browserHistory.push('login');
    }
    else{
      this.props.updateTab("RIDES");
      browserHistory.push('rides');
      this.props.setInitialState();
    }
  }
  componentWillReceiveProps(nextProps){
    let currentTab = this.props.app.currentTab;
    //currentTab = (currentTab === undefined) ? this.props.location.pathname.toUpperCase() : currentTab.toUpperCase();
    const {start,destination} = this.props.rides;
    if(start != nextProps.rides.start || destination != nextProps.rides.destination){
      let currentTabProp = Constants.endpoints[currentTab];
      let url = currentTabProp.url +"start="+ nextProps.rides.start 
                + "&destination="+ nextProps.rides.destination
                + "&key="+localStorage.getItem("carpoollogin");
      this.setState({ loading: true });          
      this.props.fetchdata(url,currentTabProp.method).then((data) => {
      this.setState({ loading: false });
        if(data.description === "Session ended"){
          localStorage.setItem("carpoollogin","");
          notify.show('Please login again',"error",2000);
          this.props.updateTab("LOGIN");
          browserHistory.push('login');
        }
        else{  
          this.props.updaterides(data.data);
          }
    });

    }
  }
  handleKeyPress(target,func) {
    const key = target.which || target.keyCode || target.charCode;
      if(key ==13){
       let search_val = (key==8 && target.target.value.length ==0) ? '' : [escape(target.target.value)];
       let allValue = $(this.refs.rideform).serializeArray();
       let dataPresent = allValue.filter(function(each){ return each.value != "" });
       if(allValue.length == dataPresent.length){
        this.props.updatedestinations(allValue[0].value,allValue[1].value)
       }

      }
  }
  confirmride(target){
    if(this.props.rides.selectedRide != ""){
    const {u_name,contact_number} = this.props.rides.selectRideData;
    notify.show('Your ride is on the way.For any queries call '+ u_name + "("+contact_number+")" ,"success",5000 );
    }
    else{
    notify.show('Please choose a ride',"error",2000);
    }
  }
  render(){
    let currentTab = this.props.app.currentTab;
    //currentTab = (currentTab === undefined) ? this.props.location.pathname.toUpperCase() : currentTab.toUpperCase();
    const {defaultLocation,data,selectedRide} = this.props.rides;
    return (
      <div className="main-container RidesContainer">
            <Header currentTab={currentTab} enableLogout={true} store={this.props}/>
            <div className="search-container">
              <div className="wrapper">
                  <form ref="rideform">
                  <Input type="text" name="start" value=""
                           placeholder="silkboard"
                           label="Start from" holderClass=""
                           clickEvent="" keyUpEvent={this.handleKeyPress.bind(this)} />
                  <Input type="text" name="destination" value=""
                           placeholder="sarjapur"
                           label="Destination" holderClass=""
                           clickEvent="" keyUpEvent={this.handleKeyPress.bind(this)} />
                  </form> 
              </div>                
            </div>
            <MapContainer data={this.props.rides.data} defaultLocation= {defaultLocation}/>
            {!this.state.loading ?
            <RideListContainer data={data} selectedRide = {selectedRide} cardAction = {this.props.updateselectedride}/>
            :
            <span className="loader">Fetching rides for saving</span>
            }
            {(data.length != 0 && !this.state.loading) ?
            <Input type="button" name="confirmride" value="confirm ride"
                           placeholder=""
                           label="" holderClass= {"confirmbutton " + (selectedRide != "" ? "active" : "inactive")}
                           clickEvent={this.confirmride.bind(this)} keyUpEvent="" />
              :
              null
            }
      </div>
      )
  }
}

function mapStateToProps(state, ownProps){
  return {
    rides : state.rides,
    location:ownProps.location,
    app:state.app
  }
}

function mapDispatchToProps(dispatch) {
  return{
    fetchdata : (api,method) => dispatch(fetchapiandcalldispatch(api,method)),
    updatedestinations:(start,destination) => dispatch(updatedestinations(start,destination)),
    updaterides:(data) => dispatch(updaterides(data)),
    updateselectedride : (ride,data) => dispatch(updateselectedride(ride,data)),
    setInitialState:() => dispatch(setInitialState()),
    updateTab : (name) => dispatch(updateTab(name))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Rides);
