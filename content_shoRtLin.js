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
		<div id='shoRtLin-tab' style='position:fixed; width:500px; left: 400px; top: 150px'>\
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
				<span style='color:#A0A0A0; padding-right:5px;'>(Include http://) </span>\
				<input type='text' size='40' class='shoRtLin-url' value='" + shoRtLin_href + "' style='font-size:16px; padding:2px; border:1px solid grey;'>\
				<p style='margin-top:10px; font-size:12px;'><button class='shoRtLin-convert'>Short It</button</p>\
				</form>\
			</div>\
			<div id='shoRtLin-odr' class='shoRtLin-link' style='margin-top:1px;'>\
				<form>\
                	        <span style='color:#A0A0A0; padding-right:5px;'>(Include http://) </span>\
	                        <input type='text' size='40' class='shoRtLin-url' value='' style='font-size:16px; padding:2px; border:1px solid grey;'>\
	                        <p style='margin-top:10px; font-size:12px;'><button class='shoRtLin-convert'>Short That</button</p>\
				</form>\
                        </div>\
		</div>\
		</center>"
                ).appendTo($j("body"));

      $j(".shoRtLin-url").val(config.api.getData("feedUrl") || "");
      var $shoRtLin = $j("#shoRtLin-tab").wijtabs({scrollabe: true, event : "mouseover"});
      $j(".shoRtLin-convert").button({
        icons: {
          primary: "ui-icon-gear"
        }
      })
      .click(function(event) {
        var feedUrl = $j(".shoRtLin-url").val();
        if(shoRtLin.isValidUrl(feedUrl) == true)
        {
          config.api.setData("feedUrl", feedUrl);
          shoRtLin.shortURL(feedUrl);
        }
        return false;
      });
	//$j(function(){if(tab_count<0) $j("#shoRtLin-form").fadeOut(4000);});
	$j("#shoRtLin-tab span.ui-icon-close").live("click", function () {
		var index = $j("li", form).index($j(this).parent());
		$shoRtLin.wijtabs("remove", index);
		if(--tab_count==0) {$j("#shoRtLin-form").remove();}
	});

	//form.wijtabs({width : 500});
	//form.dialog('option', 'dialogClass', 'alert');
      //form.wijdialog({width : 500, title : "shoRtLin - The URL Shortener"});
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
            UrlShortner.appClick("http://www.facebook.com/sharer.php?u=" + shoRtLin_url);
          });

          $j("#twClick").click(function() {
            UrlShortner.appClick("https://twitter.com/share?url=" +shoRtLin_url);
          });

          $j("#liClick").click(function() {
            UrlShortner.appClick("http://www.linkedin.com/shareArticle?mini=true&url=" + shoRtLin_url);
          });
	//$j("#shoRtLin-slf").replaceWith('<a href="'+shoRtLin_url+'" target="_blank">'+shoRtLin_url+'</a>');
	},
	appClick : function(url){      window.open(url, "mywindow","width=400,height=400");    }
	

	});
	    },
       

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
