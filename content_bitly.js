(function(config) {
  
  var HelloWorld = {  // Start

    init : function() {
      config.api.log("Hello, World!");
    },

    options : function() {
      config.api.log("Options!");
    },
    
    contextAction : function() {
      config.api.log("Context action invoked");
$j(document).ready(function () {
       // debugger
       $j(":wijmo-wijdialog").wijdialog("destroy").remove();
              $j('#dialog').wijdialog({
                   autoOpen: true,
                              captionButtons: {
                                  refresh: { visible: false }
                                              }
                                      });
                               });
                            }
   }; // HelloWorld End

  config.api.callbacks({
    init : HelloWorld.init,
    options : HelloWorld.options,
    contextAction : HelloWorld.contextAction
  });

})({
  api : new IJAppApi.v1({appId : "__APP_ID__"})
});
