import React from 'react';
import $ from 'jquery';
import tourData from './../../json/api';
import Select from 'antd/lib/select';
import Slider from 'antd/lib/slider'
const Option = Select.Option;
class FilterContainer extends React.Component {
constructor(props,context){
      super(props,context);
    }
      
   
    componentWillReceiveProps(nextProps) {
      const prevdestinations = JSON.stringify(this.props.store.filters_list.destinations);
      const nextdestinations = JSON.stringify(nextProps.store.filters_list.destinations);
      const prevupdate = this.props.store.filters_list.update;
      const nextupdate = nextProps.store.filters_list.update;
      const prevdays = this.props.store.filters_list.days;
      const nextdays = nextProps.store.filters_list.days;
      const prevregions = this.props.store.filters_list.selectedregion.toString();
      const nextregions = nextProps.store.filters_list.selectedregion.toString();
      const prevrange = this.props.store.filters_list.range.toString();
      const nextrange = nextProps.store.filters_list.range.toString();
      if(prevdestinations != nextdestinations || (nextupdate != prevupdate) || (prevdays != nextdays) || (prevregions != nextregions) || (prevrange != nextrange)){
     
        let checkedcountry = nextProps.store.filters_list.destinations.filter(function (el) {
            return el.checked == true
          });
        if(checkedcountry.length == 0){
        let tours_popular = tourData;
        let beforeupdatedata = Object.assign({}, nextProps.store.tours_list);
        
                 tours_popular = tourData.filter(function (el) {
                  if(nextProps.store.filters_list.selectedregion.length == 0){
            return el.days <=  nextProps.store.filters_list.days && el.cost >= nextProps.store.filters_list.range[0] && el.cost <= nextProps.store.filters_list.range[1];
            }
            else{
                for(let j=0;j<nextProps.store.filters_list.selectedregion.length;j++){
              if( el.days <=  nextProps.store.filters_list.days && el.region == nextProps.store.filters_list.selectedregion[j] && el.cost >= nextProps.store.filters_list.range[0] && el.cost <= nextProps.store.filters_list.range[1])
              return true;
            }
               }
          });
               
               
        beforeupdatedata.data = tours_popular.slice(0);
        beforeupdatedata.update = false;
        this.props.store.gettours(beforeupdatedata);
      }
      else{
        let temparray = [];
        let beforeupdatedata = Object.assign({}, nextProps.store.tours_list);
        let finalarray = [];
        for(let i=0;i<checkedcountry.length;i++){
         temparray = tourData.filter(function (el) {
          if(nextProps.store.filters_list.selectedregion.length == 0)
            return el.country == checkedcountry[i].country && el.days <=  nextProps.store.filters_list.days && el.cost >= nextProps.store.filters_list.range[0] && el.cost <= nextProps.store.filters_list.range[1];
          else{
            for(let j=0;j<nextProps.store.filters_list.selectedregion.length;j++){
              if(el.country == checkedcountry[i].country && el.days <=  nextProps.store.filters_list.days && el.region == nextProps.store.filters_list.selectedregion[j] && el.cost >= nextProps.store.filters_list.range[0] && el.cost <= nextProps.store.filters_list.range[1])
              return true;
            }
          }

          });
        finalarray = finalarray.concat(temparray);
        }
        beforeupdatedata.data = finalarray.slice(0);
        this.props.store.gettours(beforeupdatedata);
      }
        }
      }
  handledate(target){
  let beforeupdatedata = Object.assign({}, this.props.store.filters_list);
  beforeupdatedata.days = target;
  this.props.store.getfilters(beforeupdatedata);
  }
handlecheck(target){
  let currentcountry = $(target.target).parent().find('.text').html();
  let beforeupdatedata = Object.assign({}, this.props.store.filters_list);
  let newdestinations = beforeupdatedata.destinations.slice(0);
  let newarray = [];
  for(let i=0;i<newdestinations.length;i++){
    let tempobj={}
    if(newdestinations[i].country == currentcountry){
      tempobj.country = newdestinations[i].country;
      tempobj.checked = !newdestinations[i].checked;
      tempobj.regions = newdestinations[i].regions;
      newarray.push(tempobj);
    }
    else{
      tempobj.country = newdestinations[i].country;
      tempobj.checked = newdestinations[i].checked;
      tempobj.regions = newdestinations[i].regions;
      newarray.push(tempobj);
    }
  }
  beforeupdatedata.destinations = newarray.slice(0);
              // beforeupdatedata.destinations = !beforeupdatedata.popular;
  this.props.store.getfilters(beforeupdatedata);
}
handleChange(target){
  let beforeupdatedata = Object.assign({}, this.props.store.filters_list);
  let temparray = [];
  temparray = temparray.concat(target);
  beforeupdatedata.selectedregion = temparray.slice(0);
  this.props.store.getfilters(beforeupdatedata);
}
handleslider(target){
  let beforeupdatedata = Object.assign({}, this.props.store.filters_list);
  let temparray = [];
  temparray = temparray.concat(target);
  beforeupdatedata.range = temparray.slice(0);
  this.props.store.getfilters(beforeupdatedata);
}
  render(){
    const filters = this.props.store.filters_list;
    const that = this.handlecheck.bind(this);
    let options = [];
    let count = 0;
    for (let i = 0; i < this.props.store.filters_list.destinations.length; i++) {
      if(this.props.store.filters_list.destinations[i].checked){
        for (let j = 0; j < this.props.store.filters_list.destinations[i].regions.length; j++) {
      options.push(<Option value={this.props.store.filters_list.destinations[i].regions[j].region}>{this.props.store.filters_list.destinations[i].regions[j].region}</Option>);
      }
      count = count + 1;
      }   
    }
    if(count == 0){
      for (let i = 0; i < this.props.store.filters_list.destinations.length; i++) {
        for (let j = 0; j < this.props.store.filters_list.destinations[i].regions.length; j++) {
      options.push(<Option value={this.props.store.filters_list.destinations[i].regions[j].region}>{this.props.store.filters_list.destinations[i].regions[j].region}</Option>);
      }
    }
    } 
    return (
      <div className="filter-container">
      <div className="left">
      <div className="destinations">
      <p>Select Destination</p>
                   {filters.destinations.map(function(filters, i){
                    return (
                    <span className="check-box" onClick={that}>
                     <input type="checkbox" value={filters.country} id="checkbox-popular" className={filters.checked == false ? "" : 'checked'} />
                       <label for="checkbox-popular">
                       <span className="check"></span>
                       <span className="text">{filters.country}</span>
                       </label>
                     </span>
                      )}
                    )}
      </div>
      <div className="region">
          <Select multiple style={{ width: '100%' }} placeholder="Select Country or Region" onChange={this.handleChange.bind(this)} >
        {options}
      </Select>
      </div>
      </div>
      <div className="left">
            <div className="slider">
      <p>Price Range / Person</p>
      <Slider range min={0} max={20000} defaultValue={[0, 20000]} onChange={this.handleslider.bind(this)}/>
      </div>
      <div className="duration" >
                          <Select defaultValue="30" style={{ width: '100%' }} onChange={this.handledate.bind(this)}>
                      <Option value="7">Less than 7 Days</Option>
                      <Option value="14">Less than 14 Days</Option>
                      <Option value="30">Less than 30 Days</Option>
                  </Select>
              </div>             
              </div>
      </div>
      )
  }
}



export{
  FilterContainer
}

