import React from 'react';
import {connect} from 'react-redux';
import {fetchapiandcalldispatch} from './../actions/commonActions';
import {updateTab} from './../actions/appActions';
import {browserHistory} from 'react-router';
import Constants from './../constants';
import Header from './../components/Header';
import Input from './../components/input';
import $ from 'jquery';
import {notify} from 'react-notify-toast';
class StartForm extends React.Component {

constructor(props){
    super(props);
    this.state = {
      loading: false}
  }
  componentWillReceiveProps(nextProps){
  }
  componentWillMount(){
    if(localStorage.getItem("carpoollogin") != "" && localStorage.getItem("carpoollogin") != undefined){
      this.props.updateTab("RIDES");
      browserHistory.push('rides');
    }
  }
  handleClick(){
    let currentTab = this.props.app.currentTab;
    let url = Constants.endpoints[currentTab].url + $(this.refs.loginform).serialize();
    this.setState({ loading: true });
    this.props.fetchdata(url,Constants.endpoints[currentTab].method).then((data) => {
      this.setState({ loading: false });
      if(currentTab === "LOGIN" && data.data.length != 0){
     localStorage.setItem("carpoollogin",data.data[0].islogin);
     browserHistory.push(Constants.endpoints[currentTab].successRedirect);
     this.props.updateTab(Constants.endpoints[currentTab].successRedirect.toUpperCase());
   }
   else if(currentTab === "LOGIN" && data.data.length == 0){
      let myColor = { background: '#0E1717', text: "#FFFFFF" }
     notify.show('Email or Password incorrect',"error",3000,myColor );
   }
   else if(currentTab === "REGISTER" && data.description == "User created successfully"){
    notify.show(data.description,"success",3000 );
     this.props.updateTab(Constants.endpoints[currentTab].successRedirect.toUpperCase());
     browserHistory.push(Constants.endpoints[currentTab].successRedirect);
   }
   else if(currentTab === "REGISTER" && data.description != "User created successfully"){
     let myColor = { background: '#0E1717', text: "#FFFFFF" }
     notify.show(data.description,"error",3000 );
   }
   else{

   }
    });
  }
  updateCurrentTab(target){
  this.props.updateTab(target.toUpperCase());
  browserHistory.push(target);
  }
  render(){
     let currentTab = this.props.app.currentTab;
    //currentTab = (currentTab === undefined) ? this.props.location.pathname.toUpperCase() : currentTab.toUpperCase();
    const formElements = Constants.endpoints[currentTab].form;
    const linkElements = Constants.endpoints[currentTab].link;
    const loadMessage = Constants.endpoints[currentTab].loadMessage;
    let that = this;
    return (
      <div className="main-container">
        <Header currentTab={currentTab} enableLogout={false}/>
        <div className="wrapper">
        <form ref="loginform" role="form">
        {formElements.map(function(each_row, i){
        return (
          each_row.type !== "button" ?
          <Input type={each_row.type} name={each_row.name} value={each_row.value}
                 placeholder={each_row.placeholder}
                 label={each_row.label} holderClass={each_row.holderClass}
                 clickEvent={each_row.clickEvent} keyUpEvent={each_row.keyUpEvent} />
          :
          <Input type={each_row.type} name={each_row.name} value={each_row.value}
                 placeholder={each_row.placeholder}
                 label={each_row.label} holderClass={each_row.holderClass}
                 clickEvent={that.handleClick.bind(that)} keyUpEvent={each_row.keyUpEvent} />
               )
              }
            )
          }
        {this.state.loading ?  
        <span className="loader">{loadMessage}</span>
         :
         null
        }             
        </form>
        {linkElements.map(function(each_row, i){
        return (
          <div className="link">
          <span>{each_row.label}</span>
          <a onClick={that.updateCurrentTab.bind(that,each_row.href)}>{each_row.value}</a>
          </div>
               )
              }
            )
          }
        </div>
      </div>
      )
  }
}

function mapStateToProps(state, ownProps){
  return {
    location:ownProps.location,
    app:state.app
  }
}

function mapDispatchToProps(dispatch) {
  return{
    fetchdata : (api,method) => dispatch(fetchapiandcalldispatch(api,method)),
    updateTab : (name) => dispatch(updateTab(name))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(StartForm);
