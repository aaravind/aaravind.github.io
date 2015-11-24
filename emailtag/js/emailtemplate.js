  var emailarray = [];
  $(document).ready(function () {

      function isValidEmailAddress(emailAddress) {
          var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
          // alert( pattern.test(emailAddress) );
          return pattern.test(emailAddress.trim());
      };

      var flagtemp = false;
      $('.emailbox').keyup(function (e) {
          if (e.keyCode === 0 || e.keyCode === 32) {
              e.preventDefault();
              if (emailarray.length == 0) {
                  debugger;
                  var emailstring = $(this).text().replace(/&nbsp;/gi, '');
                  emailstring = emailstring.replace(/ /gi, '');
                  emailstring = emailstring.replace(/<br>/gi, '');
                  emailarray = emailstring.split(',');
              }

              $(".emailbox").html('');
              for (i = 0; i < emailarray.length; i++) {
                  if (isValidEmailAddress(emailarray[i])) {

                      $(".emailbox").append("<div class='emailparent'><div class='emailtag' data-emailid = '" + i + "' contenteditable='false'><span class='alignleft emailmax'>" + emailarray[i] + "</span><span class='alignleft delete'>x</span></div><div class='typenext' contenteditable='true'></div></div>");

                      $(".emailbox").attr("contenteditable", "false");
                      $(".typenext").focus();

                  }
                  else {
                      // alert(emailarray[i] + " - Invalid Email Address")
                      emailarray.splice(i, 1);

                  }
              }
              $(".delete").click(function () {
                  debugger;
                  emailarray.splice($(this.parentNode).attr('data-emailid'), 1);
                  //this.parentNode.parentNode.remove();
                  $(this.parentNode.parentNode).remove();
                  if (emailarray.length == 0 || $(".emailbox").html() == '') {
                      emailarray = [];
                      $(".emailbox").attr("contenteditable", "true");
                  }
                  else {
                      $(".typenext").focus();
                  }
              });
          }
          var flagnow = false
          /*$('.typenext').keyup(function (e) {
          if (e.keyCode === 8 || e.keyCode === 46) {
          if (flagnow == false)
          $(this.parentNode).find('.emailtag').css('border', '1px solid blue');

          }
          });*/

          var twice_back = 0;

          $('.typenext').on('keyup', function (e) {

              if (e.which === 8 && $(this).text() == '') {

                  if (twice_back === 1) {       // (remember that twice_37 is 0 initially)
                      emailarray.splice($(this).attr('data-emailid'), 1);
                      //this.parentNode.remove();
                      $(this.parentNode).remove()
                      if (emailarray.length == 0) {
                          $(".emailbox").attr("contenteditable", "true");
                      }
                  }
                  if (twice_back === 0) {
                      $(this.parentNode).find('.emailtag').css('box-shadow', '1px 0px 5px 2px #BFBFC1');
                  }
                  twice_back = 1;          // Set to 1 and...
                  setTimeout(function () { // ...reset to 0 after 1s
                      twice_back = 0;
                  }, 1000);

              }
              var tempflag = 0;
              if (e.which === 32) {
                  e.preventDefault();
                  var emailstringtem = $(this).text().replace(/&nbsp;/gi, '');
                  emailstringtem = emailstringtem.replace(/ /gi, '');
                  emailstringtem = emailstringtem.replace(/<br>/gi, '');
                  var emailarraytemp = emailstringtem.split(',');

                  $(".typenext").html('');
                  if (tempflag == 0) {
                      for (i = 0; i < emailarraytemp.length; i++) {

                          if (isValidEmailAddress(emailarraytemp[i])) {
                              emailarray.push(emailarraytemp[i]);
                              $(".emailbox").append("<div class='emailparent'><div class='emailtag' data-emailid = '" + (emailarray.length + i) + "' contenteditable='false'><span class='alignleft emailmax'>" + emailarraytemp[i] + "</span><span class='alignleft delete'>x</span></div><div class='typenext' contenteditable='true'></div></div>");

                              $(".emailbox").attr("contenteditable", "false");
                              $(".typenext").focus();

                          }
                          else {
                              //  alert(emailarraytemp[i] + " - Invalid Email Address");
                              $(".typenext").html('');

                          }
                      }
                      tempflag = 1;
                      $(".delete").click(function () {
                          emailarray.splice($(this.parentNode).attr('data-emailid'), 1);
                          $(this.parentNode.parentNode).remove();
                          //this.parentNode.parentNode.remove();

                          if (emailarray.length == 0 || $(".emailbox").html() == '') {
                              emailarray = [];
                              $(".emailbox").attr("contenteditable", "true");
                          }
                          else {
                              $(".typenext").focus();
                          }
                      });
                  }



              }
          });

      })


  });

