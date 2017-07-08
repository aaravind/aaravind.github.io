/*To use in your page
      Add script => <script src="js/cbox.js"></script>
      Add css    => <link rel="stylesheet" type="text/css" href="css/cbox.css">
      var commentBox = new cbox(".comment-box-wrapper");
      commentBox.render({})
*/

/* Author : Aravind Arivarasan */

/*InnerHTML is used which can be replaced by any template engine in future
Currently data stored and read from LocalStorage which can be changed to API calls in future
Default settings lastId => unique Id ; commentList => all comments ; users =>for that comments*/

var defaultLocalData = {
   "lastId":0,  
   "commentsList":[],
   "users":{  
      "aravind":123423,
      "arun":123789,
      "kumar":654356
   }
};
//Cbox Constructor
function cbox(name){
	this.domObject = document.querySelectorAll(name);
	this.default = {};
	this.user = "";
	this.comments={};
}
cbox.prototype={
	"constructor": cbox,
    "render" : function(defaultParams){
    	// render the comment box if default parms is set then config should be done based on it like which api url to be called and etc
    	this.setDefault(defaultParams).checkUser().createCommentBox(this.domObject);
    	return this;
    },
    "setDefault" : function(params){
    	//If data available show those comments are set default 
    	this.default = params;
    	if(this.getComments().comments == null || this.getComments().comments.commentsList == undefined || this.getComments().comments.commentsList.length == 0)
    	this.addComments(true);
        else
        this.addComments(false);
    	return this;
    },
    "addComments" : function(data){
    	//Create an object => render the extra comments => update localstorage/api
    	//timeago function is called at 60 sec interval to update when the comment posted
    	//in case of api update this method
    	var intervalexist;
        if(data == true){
        	this.setComments(defaultLocalData);
        }
        else if(data == false){
        	var commentsAll = this.getComments().comments.commentsList;
        	var self = this;
        	// commentsAll.forEach(function(each){
        	// 	self.addReplyBox(each); 
        	// });
        	for(i=0;i<commentsAll.length;i++){
        		this.addReplyBox(commentsAll[i]);
        	}
        	this.timeAgo();
        	intervalExist = setInterval(this.timeAgo, 60000);
        }
        else{
        	if(data.which == 13){
              var each_comment = {};
              each_comment.user = this.user;
              each_comment.id = this.comments.lastId+1;
              each_comment.comment = data.target.value;
              each_comment.date = new Date();
              each_comment.count = 0;
              each_comment.repliedTo = data.target.getAttribute("data-replyto");
              if(each_comment.repliedTo == 0)
              this.addReplyBox(each_comment);
              else
              this.addReplyBox(each_comment,data.target.parentElement.parentElement); 
              this.comments.lastId = each_comment.id;
              this.comments.commentsList.push(each_comment);
              if(each_comment.repliedTo != 0){
              	var node = data.target.parentElement.parentElement;
              	node.parentElement.removeChild(node);
              } 
              this.setComments(this.comments);
              data.target.value = '';
              this.timeAgo();
              clearInterval(intervalExist);
              intervalExist = setInterval(this.timeAgo, 60000);
        	}
        }
    },
    "addReplyBox" : function(data,domObject){
    	//Replied comment is added with respect to the previous comment and the object is updated with previous id
      	var self = this;
      	domObject = domObject == undefined ? this.domObject : [domObject];
          for(var i=0;i<domObject.length;i++){
          	var imageURL = (data.user != '' && self.getComments().comments.users[data.user] != undefined) ? self.getComments().comments.users[data.user]+'.jpg' : 'default.png';
          	var userName = data.user != '' ? data.user : "Anonymous";
          	var each_id  = "each-unique-"+data.id;
          	var commentThread = document.createElement("div");
          	commentThread.className = "comment-thread-wrapper " + each_id;
          	commentThread.innerHTML = '<div class="each-comment">'+
					              '<div class="main-thread">'+
					              	'<span class="left">'+
					              	'<img src="./assets/'+imageURL+'" class="comment-box-img"></img>'+
					                '</span>'+
					              	'<span class="right">'+
						              	'<div class="top">'+
						              		'<span class="name colorblue">'+userName+'</span>'+
						              		'<span class="time timeago colorgray" title="'+ data.date +'">'+data.date+'</span>'+
						              	'</div>'+
						              	'<div class="comment">'+
						              		data.comment+
						              	'</div>'+
						              	'<div class="feedback">'+
						              	  '<span class="count colordarkgray">'+data.count+'</span>'+
						              	  '<span class="borderright"><i class="icon icon-up" data-id="'+data.id+'" data-user="'+data.user+'" data-type="increase"></i></span>'+
						              	  '<span class=""><i class="icon icon-down" data-id="'+data.id+'" data-user="'+data.user+'" data-type="decrease"></i></span>'+
						              	  '<span class="reply colordarkgray" data-replyTo="'+data.id+'">Reply</span>'+
						              	 '</div>'+	
						              	'</span>'+
					     			'</div>'+	
									'</div>';
			if(data.repliedTo == 0 || data.repliedTo == undefined)
			domObject[i].appendChild(commentThread);
		    else{
		    document.querySelectorAll(".each-unique-"+data.repliedTo + " .each-comment")[0].appendChild(commentThread);
		    document.querySelectorAll(".each-unique-"+data.repliedTo)[0].getElementsByClassName("reply")[0].style.display = "inline-block";	
		    }
			commentThread.getElementsByClassName("reply")[0].onclick = self.createCommentBox.bind(self);
			commentThread.getElementsByClassName("icon-up")[0].onclick = self.updateCount.bind(self);
			commentThread.getElementsByClassName("icon-down")[0].onclick = self.updateCount.bind(self);	
          };
    },
    "updateCount":function(data){
    	//Search for the id in the localstorage/api and update the count
    	//in case of api update this method
    	self = this;
    	var id = data.target.getAttribute("data-id");
    	var user = data.target.getAttribute("data-user");
    	var type = data.target.getAttribute("data-type");
    	for(var i=0;i<this.comments.commentsList.length;i++){
    		var each = this.comments.commentsList[i];
            if(id == each.id){
               if(type == "increase")
               	each.count = each.count+1;
               else
               	each.count = each.count-1;
              data.target.parentElement.parentElement.getElementsByClassName("count")[0].innerHTML = each.count; 
            }
    	}
    	self.setComments(this.comments);
    },
    "getComments" : function(){
    	//in case of api update this method and api call value is set
        this.comments = JSON.parse(localStorage.getItem("comment-list"));
        return this;
    },
    "setComments" : function(data){
    	//in case of api update this method and api call value is set
        localStorage.setItem("comment-list", JSON.stringify(data));
        return this;
    },
    "checkUser" : function(){
    	//Current user session is made and read from the url 
    	this.user = window.location.search.split("=")[1] == undefined ? '' : window.location.search.split("=")[1];
    	return this;
    },
    "generatekey" : function(){
    	//If unique keysto generate update this methos
       return "coment-box-"+(this.comments.lastId);
    },
    "suggestUser" : function(){
       return "coment-box-"+(this.comments.lastId);
    },  
    "createCommentBox" : function(domObject){
    	// Comment adding feature
    	var reply = domObject.target == undefined ? 0 : (domObject.target.getAttribute("data-replyTo"));
    	var dom_actual = domObject.target;
    	domObject = domObject.target == undefined ? domObject : [domObject.target.parentElement];
    	if(domObject.length){
    		var self = this;
          for(var i=0;i<domObject.length;i++){
          	var dom = domObject[i];
          	var imageURL = (self.user != '' && self.getComments().comments.users[self.user] != undefined) ? self.getComments().comments.users[self.user]+'.jpg' : 'default.png';
          	var each_id  = "comment-box-type "+ self.generatekey();
          	var commentBox = document.createElement("div");
          	commentBox.className = each_id;
          	commentBox.innerHTML = '<img src="./assets/'+imageURL+'" class="comment-box-img"></img>'+
				        	'<span class="comment-box-input-wrapper">'+
				        	'<input type="text" placeholder="Join the discussion..." class="comment-box-input" data-replyto="'+ reply +'" />'+
				            '</span>';
			if(dom_actual == undefined)
			dom.insertBefore(commentBox, dom.firstChild);
			else{
			dom.appendChild(commentBox);
 			dom.getElementsByClassName("reply")[0].style.display = "none";
		    }		    
			dom.getElementsByTagName("input")[0].onkeyup = self.addComments.bind(self);
			dom.getElementsByTagName("input")[0].focus();	    
          };
    	}
    	return this;
    },
    "timeAgo" :function(){
        // When comment typed is updated via this function
		    var templates = {
		        prefix: "",
		        suffix: " ago",
		        seconds: "less than a minute",
		        minute: "about a minute",
		        minutes: "%d minutes",
		        hour: "about an hour",
		        hours: "about %d hours",
		        day: "a day",
		        days: "%d days",
		        month: "about a month",
		        months: "%d months",
		        year: "about a year",
		        years: "%d years"
		    };
		    var template = function(t, n) {
		        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
		    };

		    var timer = function(time) {
		        if (!time)
		            return;
		        time = time.replace(/\.\d+/, "");
		        time = time.replace(/-/, "/").replace(/-/, "/");
		        time = time.replace(/T/, " ").replace(/Z/, " UTC");
		        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
		        time = new Date(time * 1000 || time);

		        var now = new Date();
		        var seconds = ((now.getTime() - time) * .001) >> 0;
		        var minutes = seconds / 60;
		        var hours = minutes / 60;
		        var days = hours / 24;
		        var years = days / 365;

		        return templates.prefix + (
		                seconds < 45 && template('seconds', seconds) ||
		                seconds < 90 && template('minute', 1) ||
		                minutes < 45 && template('minutes', minutes) ||
		                minutes < 90 && template('hour', 1) ||
		                hours < 24 && template('hours', hours) ||
		                hours < 42 && template('day', 1) ||
		                days < 30 && template('days', days) ||
		                days < 45 && template('month', 1) ||
		                days < 365 && template('months', days / 30) ||
		                years < 1.5 && template('year', 1) ||
		                template('years', years)
		                ) + templates.suffix;
		    };

		    var elements = document.getElementsByClassName('timeago');
		    for (var i in elements) {
		        var current = elements[i];
		        if (typeof current === 'object') {
		            current.innerHTML = timer(current.getAttribute('title'));
		        }
		    }

    }
}

