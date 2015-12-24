

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
               $('#map_legend').html('<div class="header">'+ title +'</div><div class="image_slide_content"></div><div class="detail_container" style="visibility:hidden;"></div>');
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
       
$('.detail_container').imagesLoaded( function() {
  $('.detail_container').css('visibility','visible')
  $('.detail_container').jScrollPane({showArrows: true});
});

    


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
   
          for( i = 0; i < marker_object.length; i++ ) {
        var position = new google.maps.LatLng(marker_object[i].latitude, marker_object[i].longitude);
        bounds.extend(position);

          var iconqwe = {
        
        path: "M 0,0 c 0,19.882-36,44.8-36,44.8 s -36-24.918-36-44.8 A 36,36,0,1,1,0,0 Z",
        fillColor: '#6d4d8b',
        fillOpacity: .6,
        strokeWeight: 2,
        strokeColor:'#ffffff',
        scale: 0.5,
    }
    var iconred = {
        
        path: "M 0,0 c 0,19.882-36,44.8-36,44.8 s -36-24.918-36-44.8 A 36,36,0,1,1,0,0 Z",
        fillColor: '#bf6aa5',
        fillOpacity: .6,
        strokeWeight: 2,
        strokeColor:'#ffffff',
        scale: 0.5
    }

       /* marker = new google.maps.Marker({
            position: position,
            map: map,
            title: marker_object[i].title,
            idnumber : marker_object[i].id,
            data: marker_object[i].data,
            icon: iconqwe
        });*/

    var marker = new MarkerWithLabel({
       position: position,
       draggable: false,
       raiseOnDrag: false,
       map: map,
      title: marker_object[i].title,
      idnumber : marker_object[i].id,
      data: marker_object[i].data,
      icon: iconqwe,
       labelContent: marker_object[i].id,
       labelAnchor: new google.maps.Point(25, 10),
       labelClass: "map_labels",
       labelStyle: {opacity: 1}
     });

        
           var prev_marker='';
          marker.addListener('click', function() {
     // this.setIcon({ url:'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg_container(this.idnumber,'#bf6aa5'))});
     if(prev_marker == '')
      {
        prev_marker = this;
        this.setIcon(iconred);
        each_marker_detail(this.title,this.data);
      }
      else{
         prev_marker.setIcon(iconqwe);
         prev_marker = this;
         this.setIcon(iconred);
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