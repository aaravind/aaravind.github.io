const Constants = {
endpoints: {
	LOGIN: {
			url:'https://aravindtwitter.herokuapp.com/login?',
			method:"GET",
			successRedirect:"rides",
			description:"Login to App",
			loadMessage:"Sharing is saving...",
			form:[{
					label:"Username",
					placeholder:"10 digit mobile number or email id",
					type:"text",
					name:"uname",
					value:"",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				},
				{
					label:"Password",
					placeholder:"enter your password",
					type:"password",
					name:"password",
					value:"",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				},
				{
					label:"",
					placeholder:"",
					type:"button",
					name:"login",
					value:"login",
					holderClass:"loginbutton",
					clickEvent:"",
					keyUpEvent:""
				}
				],
			link:[{
					label:"Don't have an account now?",
					placeholder:"",
					type:"link",
					name:"link",
					href:"register",
					value:"Register Now",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				}]	
			},
	REGISTER:{
			url:'https://aravindtwitter.herokuapp.com/register?',
			method:"POST",
		    successRedirect:"login",
		    description:"Register with App",
		    loadMessage:"Green living with car pooling...",
		    form:[{
					label:"Full Name",
					placeholder:"enter your firstname & lastname",
					type:"text",
					name:"uname",
					value:"",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				},
				{
					label:"Email Id",
					placeholder:"enter your email Id",
					type:"text",
					name:"email",
					value:"",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				},
				{
					label:"Mobile Number",
					placeholder:"enter your 10 digit mobile number",
					type:"text",
					name:"contactnumber",
					value:"",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				},
				{
					label:"Car Model",
					placeholder:"name of the car you have",
					type:"text",
					name:"carmodel",
					value:"",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				},
				{
					label:"Password",
					placeholder:"set your password",
					type:"text",
					name:"password",
					value:"",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				},
				,
				{
					label:"Re-enter password",
					placeholder:"re-enter your password",
					type:"text",
					name:"confirmpassword",
					value:"",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				},
				{
					label:"",
					placeholder:"",
					type:"button",
					name:"register",
					value:"register",
					holderClass:"loginbutton",
					clickEvent:"",
					keyUpEvent:""
				}
				],
			link:[{
					label:"Already have an account?",
					placeholder:"",
					type:"link",
					name:"link",
					href:"login",
					value:"Login Now",
					holderClass:"",
					clickEvent:"",
					keyUpEvent:""
				}]
		},
	LOGOUT:{
			url:'https://aravindtwitter.herokuapp.com/logout?',
			method:"POST"
			},
	RIDES:{
			url:'https://aravindtwitter.herokuapp.com/rides?',
			method:"GET",
			description:"Pick a Ride"
			}
}
};

export default Constants;