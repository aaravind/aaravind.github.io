import React from 'react';
import $ from 'jquery';
import {browserHistory} from 'react-router';
class CountryContainer extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
    componentWillReceiveProps(nextProps) {
    // const prevstatus = this.props.store.country_list.changed;
    // const nextstatus = nextProps.store.country_list.changed;
    // if(prevstatus != nextstatus){

    // }
  }
   componentDidMount(){
    debugger;
    let that = this;
    this.props.store.fetchdata('https://restcountries.eu/rest/v2/all?fields=name;latlng','GET').then((data) => {
     debugger;
     const beforefetchdata = Object.assign({}, that.props.store.country_list);
      beforefetchdata.data = data.slice(0);
      beforefetchdata.changed = true;
      that.props.store.getcountrydata(beforefetchdata);
    });
   }
   onClick(target){
    debugger;
    let data = target.target.parentElement.parentElement.dataset;
    browserHistory.push('country-location?lat='+data.lat+'&lng='+data.lng+'&country='+data.country);
     //window.location.assign(tabName);
  }
  render(){
    const country_list = this.props.store.country_list.data;
    const that = this;
    return (
      <div className="country-container">

        {country_list.map(function(country, i){
        return (
            <div className="each_country_card" data-lat={country.latlng[0]} data-lng={country.latlng[1]} data-country={country.name} onClick={that.onClick.bind(this)}>
            <div className="inner">
            <div className="country">{country.name}</div>
            <img src={country.flag}/>
               <div className="latlong">{country.latlng[0] +' , '+ country.latlng[1]}</div>
            </div>
            </div>
          )}
        )}
      </div>
      )
  }
}



export{
  CountryContainer
}

