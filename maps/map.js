

  var marker_object=[{
    'id':'01',
    'title':'Toscana',
    'latitude':51.503454,
    'longitude':-0.119562,
    'data':{
    "slider_data":['https://images-grouptable.netdna-ssl.com/system/photos/photos/000/017/472/original/TOSCANO_grouptable.jpg?1425464593','http://im.timescitycontent.com/media/establishments/2015/Jan/1420537783_exterior-of-cafe-toscano.jpg','http://im.timescitycontent.com/media/establishments/2014/Jul/1405504290_toscano3.jpg'],
    "content_data":[{
    "image_logo":'https://d.zmtcdn.com/images/logo/zlogo5.png',
    "rating":3.8,
    "offer":2
  },
  {
    "image_logo":'http://6911423b9fba6142fe99-d2e2a24d602098fa0875d92f24ae24ac.r92.cf1.rackcdn.com/coupons-logos/003_swiggy.png',
    "rating":3.7,
    "offer":1
  },
  {
    "image_logo":'http://cdn.lmitassets.com/gograbon/images/merchant/foodpanda-1449060451833.jpeg',
    "rating":3,
    "offer":5
  }
  ]
  }
  },
  {
    'id':'02',
    'title':'Cafe Petu',
    'latitude':51.499633,
    'longitude':-0.124755,
    'data':{
    "slider_data":['https://b.zmtcdn.com/data/pictures/3/58463/d445b28faa81a1a611360b22984ac582_160_thumb.jpg','http://www.towntrendz.com/uploads/restaurant_photos/5903/user_photos/4236/6c7f55fde9fb8f27b345468301e8f323.jpg?v=1.0','https://c.zmtcdn.com/data/pictures/1/56141/478c69cf42b05fccf16a4563de9c392d_200_thumb.jpg'],
    "content_data":[{
    "image_logo":'https://d.zmtcdn.com/images/logo/zlogo5.png',
    "rating":5,
    "offer":3
  },
  {
    "image_logo":'http://6911423b9fba6142fe99-d2e2a24d602098fa0875d92f24ae24ac.r92.cf1.rackcdn.com/coupons-logos/003_swiggy.png',
    "rating":3,
    "offer":10
  },
  {
    "image_logo":'http://cdn.lmitassets.com/gograbon/images/merchant/foodpanda-1449060451833.jpeg',
    "rating":1.5,
    "offer":0
  }
  ]
  }
  }];

  function initialize() {
        var mapCanvas = document.getElementById('map');
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
        map.setTilt(45);
        //map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
  //document.getElementById('map_legend'));
          $(function() {

            function each_marker_detail(title,legend_object){

                $('#map_legend').html('');
                 $('#map_legend').css('display','block');
               $('#map_legend').html('<div class="header">'+ title +'</div><div class="image_slide_content"></div><div class="detail_container"></div>');
     $('#map_legend .image_slide_content').html('<div id="slider"><a href="#" class="control_next">></a><a href="#" class="control_prev"><</a><ul class="add_each_image"></ul></div>');
    for(j=0;j<legend_object.slider_data.length;j++){
     $('#map_legend .image_slide_content .add_each_image').append('<li><img src='+legend_object.slider_data[j] +'></img></li>');
    }
    for(i=0;i<legend_object.content_data.length;i++){
      $('#map_legend .detail_container').append('<div class="each_detail"><div class="image_url"><img src='
        + legend_object.content_data[i].image_logo 
         +' width="75%"></img></div>'
          +'<div class="image_details"><span><b>'+ legend_object.content_data[i].rating+'</b> Rating</span><span><b>'+legend_object.content_data[i].offer
          +'</b> offers</span></div></div>');
    }
       

$('.detail_container').jScrollPane({showArrows: true});
    


             var slideCount = $('#slider ul li').length;
  var slideWidth = $('#slider ul li').width();
  var slideHeight = $('#slider ul li').height();
  var sliderUlWidth = slideCount * slideWidth;
  
  $('#slider').css({ width: slideWidth, height: slideHeight });
  
  $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
  
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });


            }
   
     


             function svg_container(number,color,floodcolor){
              var svg_form = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="49" height="53.5" viewBox="0 0 98 107">'
  +'<defs>'
  +'<style> .cls-1 {fill: '+color+';stroke: #fff;stroke-linejoin: round;stroke-opacity: 0.79;stroke-width: 7px;fill-rule: evenodd;filter: url(#filter);}'
      +'.svgtext{font-size: 2em;fill: white;font-weight: bold;} </style>'
    +'<filter id="filter" x="1007" y="406" width="91" height="100" filterUnits="userSpaceOnUse">'
     +'<feOffset result="offset" dx="3" in="SourceAlpha"/>'
     +'<feGaussianBlur result="blur" stdDeviation="3.162"/>'
     +'<feFlood result="flood" flood-opacity="0.1"/>'
     +'<feComposite result="composite" operator="in" in2="blur"/>'
     +'<feBlend result="blend" in="SourceGraphic"/>' 
     +'<feFlood result="flood-2" flood-color="'+floodcolor+'"/>' 
     +'<feComposite result="composite-2" operator="in" in2="SourceGraphic"/>'
     +'<feBlend result="blend-2" in2="blend"/>'
     +'</filter>'
   +'</defs>'
  +'<g transform="translate(-1003.5 -402.5)" style="fill: '+ color +'; ">'
    +'<path id="path" class="cls-1" d="M1091,451.1c0,19.882-36,44.8-36,44.8s-36-24.918-36-44.8A36,36,0,1,1,1091,451.1Z" style="stroke: inherit; filter: none;fill: inherit"/>'
  +'</g>'
    +'<text class="svgtext" xmlns="http://www.w3.org/2000/svg" x="50" text-anchor="middle" y="60">'+ number +'</text>'
  +'<use transform="translate(-1003.5 -402.5)" xlink:href="#path" style="stroke: #fff; filter: none; fill: none"/>'
+'</svg>';
             return svg_form
             }
          for( i = 0; i < marker_object.length; i++ ) {
        var position = new google.maps.LatLng(marker_object[i].latitude, marker_object[i].longitude);
        bounds.extend(position);

        
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: marker_object[i].title,
            idnumber : marker_object[i].id,
            data: marker_object[i].data,
            icon: { url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg_container(marker_object[i].id,'#6d4d8b')) } 
        });
        
           var prev_marker='';
          marker.addListener('click', function() {
     // this.setIcon({ url:'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg_container(this.idnumber,'#bf6aa5'))});
     if(prev_marker == '')
      {
        prev_marker = this;
       this.setIcon('data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg_container(this.idnumber,'#bf6aa5')));
       each_marker_detail(this.title,this.data);
      }
      else{
         prev_marker.setIcon('data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg_container(prev_marker.idnumber,'#6d4d8b')));
         prev_marker = this;
         this.setIcon('data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg_container(this.idnumber,'#bf6aa5')));
          each_marker_detail(this.title,this.data);
      }
    
  });
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }


            var max_radius =0;
            var boundscenter_lat = bounds.getCenter().lat();
            var boundscenter_long =bounds.getCenter().lng();

       for( k = 0; k < marker_object.length; k++ ) {
          var latLngA = new google.maps.LatLng(marker_object[k].latitude,marker_object[k].longitude);
          var latLngB = new google.maps.LatLng(boundscenter_lat, boundscenter_long);
          var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
          if(distance > max_radius)
            max_radius = distance;
       }
                   var circle = new google.maps.Circle({
  map: map,
  radius: max_radius+100,    // 10 miles in metres
  fillColor: '#c9c5dd',
  strokeColor:'#6d4d8b',
  strokeOpacity: .7,
    strokeWeight: 1
});
            circle.setCenter(new google.maps.LatLng(boundscenter_lat,boundscenter_long));



});


  

      }
      google.maps.event.addDomListener(window, 'load', initialize);