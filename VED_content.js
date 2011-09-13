(function(config) {
  
  var VED = { // Start

    init : function() {
      config.api.log("Hello, World!");
    },

    options : function() {
      config.api.log("Options!");
VED.createDom();
    },
// $j(document).ready(function () {
       // debugger
// $j(":wijmo-wijdialog").wijdialog("destroy").remove();
 // $j('#dialog').wijdialog({
// autoOpen: true,
// captionButtons: {
// refresh: { visible: false }
// }
// });
// });
createDom : function() {
      $j("#custom-rss-form").remove(); // cleanup any old invocation...

      var form = $j("<div/>", {id : "custom-rss-form"}).html(
                  "<center>\
		<form>\
		<div style='margin-top:10px;'>\
		<span style='color:#A0A0A0; padding-right:5px;'>(Include http://) </span>\
		<input type='text' size='40' id='custom-rss-url' style='font-size:16px; padding:2px; border:1px solid grey;'>\
		<p id='custom-rss-p' style='margin-top:10px; font-size:12px;'><button id='custom-rss-save'>Short It!</button</p>\
		</div>\
		</form>\
		</center>"
                ).appendTo($j("body"));

      $j("#custom-rss-url").val(config.api.getData("feedUrl") || "");

      $j("#custom-rss-save").button({
        icons: {
          primary: "ui-icon-triangle-1-s"
        }
      })
      .click(function(event) {
        var feedUrl = $j("#custom-rss-url").val();
        if(VED.isValidFeedUrl(feedUrl) == true)
        {
          config.api.setData("feedUrl", feedUrl);
          VED.watchFeed(feedUrl);
	  //$j("#custom-rss-form").wijdialog("refresh");
        }
        $j("#custom-rss-form").wijdialog("refresh");
        return false;
      });

      form.wijdialog({width : 500, title : "Shorten the URL"});
    },



    // Returns true if the feedUrl is found to be valid
       isValidFeedUrl : function(url) {
       return ((url) && (url.length > 0) && ((url.indexOf("http://") != -1) || (url.indexOf("https://") != -1)))
                   },
    
    
                       // creates the IJFeedWatcherFactory object.
       // Url can be escaped or unescaped feedUrl
       watchFeed : function VED_url(url) {
	var id="umangjeet", apik="R_0aa77d04e6f747473c71020ed1c24237", vurl=encodeURI(url);
	$j.ajax({
	url:"http://api.bit.ly/v3/shorten",
	data:{longUrl:vurl,apiKey:apik,login:id},
	dataType:"jsonp",
	success:function(vd)
	{
	var VED_url= vd.data.url;
	config.api.log(VED_url);
	$j("p#custom-rss-form:first").replaceWith('<a href="'+VED_url+'" target="_blank">'+VED_url+'</a>');
	}
	});
	//try {
     //new IJFeedWatcherFactory(unescape(url), {image : "http://cs.adomado.com/custom_rss/rss.png", timeoutMinutes : 5, callback : function(entry) {
     //config.api.createPanelNotification({image : "http://cs.adomado.com/custom_rss/rss.png", text : entry.title, url : entry.link});
     //}});
     //} catch(e) {}
       },
       

    contextAction : function() {
      config.api.log("Context action invoked");
}
   }; // HelloWorld End

  config.api.callbacks({
    init : VED.init,
    options : VED.options,
    contextAction : VED.contextAction
  });

})({
  api : new IJAppApi.v1({appId : "__APP_ID__"})
});
