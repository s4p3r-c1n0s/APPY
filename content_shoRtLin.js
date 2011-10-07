(function(config) {
  
  var shoRtLin = { // Start

    init : function() {
    },



    options : function() {
      shoRtLin.createDom();
    },



        // Dom function creating  Dialog box and Tabs inside it
    createDom : function() {

      $j("#shoRtLin-form").remove(); // cleanup any old invocation...
      var shoRtLin_href = document.location.href, shoRtLin_display;

          // if length exceeds 50 display 47 URL characters followed by "..."
      if(shoRtLin_href.length > 50)
        shoRtLin_display = shoRtLin_href.substring(0,46).concat("...");
      else
        shoRtLin_display = shoRtLin_href;

          // form appends the DOM body to 
      var form = $j("<div/>", {id : "shoRtLin-form"}).html("\
        <center>\
      	  <div id = 'shoRtLin-tab'>\
      	    <ul>\
      	      <li><a href = '#shoRtLin-slf'>For current page</a></li>\
      	      <li><a href = '#shoRtLin-odr'>For other page</a></li>\
      	    </ul>\
      	    <div id = 'shoRtLin-slf' class = 'shoRtLin-link' style = 'overflow:hidden; margin:0px; width:450px'>\
              <form>\
                <span style = 'color:#A0A0A0; padding-right:5px;'>(Current Page URL)<br></span>\
      	        <span style = 'color:#000000; padding-right:5px; font-size:16px'>" + shoRtLin_display + "</span>\
      	        <input type = 'hidden' id = 'shoRtLin-slf-url' value = '" + shoRtLin_href + "'>\
      	        <p style = 'margin-top:10px; font-size:12px;'><button id = 'shoRtLin-slf-convert'>Short</button></p>\
              </form>\
      	    </div>\
      	    <div id = 'shoRtLin-odr' class = 'shoRtLin-link' style = 'overflow:hidden; margin:0px; width: 450px'>\
              <form>\
                <span style = 'color:#A0A0A0; padding-right:5px'>(Include http://) </span>\
                <input type = 'text' size = '40' id = 'shoRtLin-odr-url' style = 'font-size:16px; padding:2px; border:1px solid grey;'>\
      	        <p style = 'margin-top:10px; font-size:12px;'><button id = 'shoRtLin-odr-convert'>Short</button></p>\
              </form>\
            </div>\
      	  </div>\
      	</center>\
      ").appendTo($j("body"));

          // To prevent verical scrolling in the Dialog Box
      $j('#shoRtLin-form').css('overflow','hidden');
     
      	  // create the dialog box
      $j("#shoRtLin-form").wijdialog({width: 650, height: 150, scrollable: false, modal: true, title : "Shortening the URL",
      	captionButtons: {
                    pin: { visible: false },
                    refresh: { visible: false },
                    toggle: { visible: false },
                    minimize: { visible: false },
                    maximize: { visible: false }
        }	
      });

          // create the tabs
      var $shoRtLin = $j("#shoRtLin-tab").wijtabs({alignment: 'left',scrollable: false});
	
          //on clicking "Short" button of SELF tab 
      $j("#shoRtLin-slf-convert").button({
        icons: {
          primary: "ui-icon-link"
        }
      })
      .click(function(event) {
        var longrUrl = $j("#shoRtLin-slf-url").val();
        if(shoRtLin.isValidUrl(longrUrl) == true)
        {
          config.api.setData("longrUrl", longrUrl);
          shoRtLin.shortURL(longrUrl);
        }
        return false;
      });

          // on clicking "Short" button of OTHER tab
      $j("#shoRtLin-odr-convert").button({
        icons: {
          primary: "ui-icon-link"
        }
      })
      .click(function(event) {
        var longrUrl = $j("#shoRtLin-odr-url").val();
        if(shoRtLin.isValidUrl(longrUrl) == true)
        {
          config.api.setData("longrUrl", longrUrl);
          shoRtLin.shortURL(longrUrl);
        }
        return false;
      });

    },  // createDom function ends



        // checks validity of the URL before conversion
    isValidUrl : function(url) {
      return ((url) && (url.length > 0) && ((url.indexOf("http://") != -1) || (url.indexOf("https://") != -1)))
    },


    
        // uses bitly API (login ID and apiKey) 
    shortURL : function(url) {

      var id="umangjeet", apik="R_0aa77d04e6f747473c71020ed1c24237";
      var encoded_url=encodeURI(url);

      $j.ajax({

        url:"http://api.bit.ly/v3/shorten",
        data:{longUrl:encoded_url,apiKey:apik,login:id},
        dataType:"jsonp",

        error : function(bitly_url) {
          $j('#shoRtLin-tab')
          .empty()
          .html("<div style='padding-top:10px; font-size:24px;'>There was an error. Please retry.</div>");
        },

        success:function(bitly_url) {

          var shoRtLin_url= bitly_url.data.url;

          $j('#shoRtLin-tab').empty().html("\
            <div style='padding-top:10px; font-size:24px;'>\
              <b>" + shoRtLin_url + "</b>\
            </div>\
            <div style='font-size:10px;'>\
              <a style='text-decoration:none;' href='" + shoRtLin_url + "' target='_blank'>" + shoRtLin_url + "</a>\
            </div>\
            <br>\
            <div style='cursor:pointer;'>\
              <img id='fbClick' src='http://cs.adomado.com/url_shortner/fb.png'/>\
              <img id='twClick' src='http://cs.adomado.com/url_shortner/tw.png'/>\
              <img id='liClick' src='http://cs.adomado.com/url_shortner/li.png'/>\
            </div>\
          ");

          $j("#fbClick").click(function() {
            shoRtLin.appClick("http://www.facebook.com/sharer.php?u=" + shoRtLin_url);
          });

          $j("#twClick").click(function() {
            shoRtLin.appClick("https://twitter.com/share?url=" +shoRtLin_url);
          });

          $j("#liClick").click(function() {
            shoRtLin.appClick("http://www.linkedin.com/shareArticle?mini=true&url=" + shoRtLin_url);
          });

        },  // success:function() ends

      }); // ajax ends

    },  // function shortURL ends
	


        //crete window on clicking social icon
    appClick : function(url) {
      window.open(url, "mywindow", "width=400, height=400");
    },

  }; // shoRtLin Ends HERE

  config.api.callbacks({
    init : shoRtLin.init,
    options : shoRtLin.options
  });

})({
  api : new IJAppApi.v1({appId : "__APP_ID__"})
});
