(function(config) {
  
  var shoRtLin = { // Start

    init : function() {
      config.api.log("shoRtLin Loaded");
    },

    options : function() {
      config.api.log("shoRtLin Dialog Box");
shoRtLin.createDom();
    },
//Dom function creating  Dialog box 
createDom : function() {
      $j("#shoRtLin-form").remove(); // cleanup any old invocation...
      var tab_count = 2, shoRtLin_href = document.location.href;
      var form = $j("<div/>", {id : "shoRtLin-form"}).html(
                  "<center>\
		<div id='shoRtLin-tab' style='position:fixed; width:650px; left: 400px; top: 150px'>\
			<ul>\
				<li><a href='#shoRtLin-slf'>Shorten URL for current page</a>\
					<span style='float: left;margin:0.1em 0.1em 0 0;cursor: pointer;' class='ui-icon ui-icon-close'>\
					Remove Tab</span>\
				</li>\
				<li><a href='#shoRtLin-odr'>Shorten for any other page</a>\
					<span style='float: left;margin:0.1em 0.1em 0 0;cursor: pointer;' class='ui-icon ui-icon-close'>\
					Remove Tab</span>\
				</li>\
			</ul>\
			<div id='shoRtLin-slf' class='shoRtLin-link' style='margin-top:1px;'>\
				<form>\
				<span style='color:#A0A0A0; padding-right:5px; font-size:16px'>"+shoRtLin_href+"</span>\
				<input type='hidden' id='shoRtLin-slf-url' value='"+shoRtLin_href+"'>\
				<p style='margin-top:10px; font-size:12px;'><button id='shoRtLin-slf-convert'>Short It</button></p>\
				</form>\
			</div>\
			<div id='shoRtLin-odr' class='shoRtLin-link' style='margin-top:1px;'>\
				<form>\
                	        <span style='color:#A0A0A0; padding-right:5px;'>(Include http://) </span>\
	                        <input type='text' size='40' id='shoRtLin-odr-url' style='font-size:16px; padding:2px; border:1px solid grey;'>\
	                        <p style='margin-top:10px; font-size:12px;'><button id='shoRtLin-odr-convert'>Short That</button></p>\
				</form>\
                        </div>\
		</div>\
		</center>"
                ).appendTo($j("body"));

      //$j(".shoRtLin-url").val(config.api.getData("longrUrl") || "");
      
      		//create tabs
      var $shoRtLin = $j("#shoRtLin-tab").wijtabs({alignment: top,scrollabe: true, event : "mouseover"});
	
		//on clicking SELF tab 
      $j("#shoRtLin-slf-convert").button({
        icons: {
          primary: "ui-icon-gear"
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

		// on clicking OTHER tab
      $j("#shoRtLin-odr-convert").button({
        icons: {
          primary: "ui-icon-gear"
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
		
		// remove div from DOM on closing all tabs
	$j("#shoRtLin-tab span.ui-icon-close").live("click", function () {
		var index = $j("li", form).index($j(this).parent());
		$shoRtLin.wijtabs("remove", index);
		if(--tab_count==0) {$j("#shoRtLin-form").remove();}
	});
    },

    		// checks validity of the URL before conversion
       isValidUrl : function(url) {
       return ((url) && (url.length > 0) && ((url.indexOf("http://") != -1) || (url.indexOf("https://") != -1)))
                   },
    
    
                // uses bitly API (login ID and apiKey)
                // replaces the Button with short URL
       shortURL : function shoRtLin_url(url) {
	var id="umangjeet", apik="R_0aa77d04e6f747473c71020ed1c24237", vurl=encodeURI(url);
	$j.ajax({
	url:"http://api.bit.ly/v3/shorten",
	data:{longUrl:vurl,apiKey:apik,login:id},
	dataType:"jsonp",

	error : function(vd){
          $j('#shoRtLin-tab')
          .empty()
          .html("<div style='padding-top:10px; font-size:24px;'>There was an error. Please retry.</div>");
        },

	success:function(vd)
	{
	var shoRtLin_url= vd.data.url;
	config.api.log(shoRtLin_url);
	$j('#shoRtLin-tab')
          .empty()
	  .html("<div style='padding-top:10px; font-size:24px;'>\
                <b>" + shoRtLin_url + "</b></div><div style='font-size:10px;'><a style='text-decoration:none;' href='" + shoRtLin_url + "' target='_blank'>" + shoRtLin_url + "</a></div><br><div style='cursor:pointer;'>\
                <img id='fbClick' src='http://cs.adomado.com/url_shortner/fb.png'/>\
                <img id='twClick' src='http://cs.adomado.com/url_shortner/tw.png'/>\
                <img id='liClick' src='http://cs.adomado.com/url_shortner/li.png'/>\
                </div>");

          $j("#fbClick").click(function() {
            shoRtLin.appClick("http://www.facebook.com/sharer.php?u=" + shoRtLin_url);
          });

          $j("#twClick").click(function() {
            shoRtLin.appClick("https://twitter.com/share?url=" +shoRtLin_url);
          });

          $j("#liClick").click(function() {
            shoRtLin.appClick("http://www.linkedin.com/shareArticle?mini=true&url=" + shoRtLin_url);
          });
		// delay and fade away the final dialog box
	  $j("#shoRtLin-tab").delay(3000).fadeOut(5000);
	},
	});
	    },
	
		//crete window on clicking social icon
	appClick : function(url){      window.open(url, "mywindow","width=400,height=400");    },


    contextAction : function() {
      config.api.log("Shorten the selected URL");
}
   }; // shoRtLin Ends

  config.api.callbacks({
    init : shoRtLin.init,
    options : shoRtLin.options,
    contextAction : shoRtLin.contextAction
  });

})({
  api : new IJAppApi.v1({appId : "__APP_ID__"})
});
