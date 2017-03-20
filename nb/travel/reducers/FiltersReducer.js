       const initialState = {
       	update:false,
       	days:30,
       	selectedregion:[],
       	range:[0,20000],
      destinations:[{
      	"country":"india",
      	"checked":true,
      	"regions":[{
      		"region":"east india",
      		"checked":false
      	},
      	{
      		"region":"north india",
      		"checked":false
      	},
      	{
      		"region":"south india",
      		"checked":false
      	}
      	]
      },
      {
      	"country":"africa",
      	"checked":true,
      	"regions":[{
      		"region":"south africa",
      		"checked":false
      	},
      	{
      		"region":"namibia",
      		"checked":false
      	},
      	{
      		"region":"kenya",
      		"checked":false
      	},
      	{
      		"region":"tanzania",
      		"checked":false
      	}]
      }]
};
export default (state = initialState, action) => {
  switch (action.type){
        case 'GET_FILTERS_DATA':
        return Object.assign({}, action.data);
    default:
          return state;
  }
};