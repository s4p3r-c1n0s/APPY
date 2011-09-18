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

      var form = $j("<div/>", {id : "shoRtLin-form"}).html(
                  "<center>\
		<form>\
		<div id='shoRtLin-tabs'>\
			<ul>\
				<li><a href="#shoRtLin-slf">shoRtLin-slf</a></li>\
				<li><a href="#shoRtLin-odr">shoRtLin-odr</a></li>\
			</ul>\
			<div id='shoRtLin-slf' style='margin-top:10px;'>\
				<span style='color:#A0A0A0; padding-right:5px;'>(Include http://) </span>\
				<input type='text' size='40' class='shoRtLin-url' style='font-size:16px; padding:2px; border:1px solid grey;'>\
				<p style='margin-top:10px; font-size:12px;'><button class='shoRtLin-convert'>Short It</button</p>\
			</div>\
			<div id='shoRtLin-odr' style='margin-top:10px;'>\
                	        <span style='color:#A0A0A0; padding-right:5px;'>(Include http://) </span>\
	                        <input type='text' size='40' class='shoRtLin-url' style='font-size:16px; padding:2px; border:1px solid grey;'>\
	                        <p style='margin-top:10px; font-size:12px;'><button class='shoRtLin-convert'>Short It</button</p>\
                        </div>\
		</div>\
		</form>\
		</center>"
                ).appendTo($j("body"));

      $j(".shoRtLin-url").val(config.api.getData("feedUrl") || "");
      $j("#shoRtLin-tabs > ul").tabs({ fx: { height: 'toggle', opacity: 'toggle' } });
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
        $j("#shoRtLin-form").wijdialog("refresh");
        return false;
      });
      form.wijdialog({width : 500, title : "Shorten the URL"});
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
	success:function(vd)
	{
	var shoRtLin_url= vd.data.url;
	config.api.log(shoRtLin_url);
	$j(".shoRtLin-convert").replaceWith('<a href="'+shoRtLin_url+'" target="_blank">'+shoRtLin_url+'</a>');
	}
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