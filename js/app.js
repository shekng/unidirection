'use strict';

//Configure require.js
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }, 
    marionette: {
        deps: [
            'jquery',
            'underscore',
            'backbone',
            'underscore',
            'backbone.radio'
        ],
        exports: 'Mn'
    }
  },
  paths: {
      jquery: 'libs/jquery-3.3.1',
      underscore: 'libs/underscore',
      backbone: 'libs/backbone',
      text: 'libs/text',
      'backbone.radio': 'libs/backbone.radio',
      marionette: 'libs/backbone.marionette',
      pm: 'libs/postmessage',
      pmSyncParent: 'libs/pmSyncParent',
      mp: 'libs/mp'
  }
});

//Start up our App
require([
    'mp', 'jquery', 'underscore', 'backbone', 'backbone.radio', 'marionette',
    'view/appView'
], 
function (mp, $, _, Backbone, Radio, Mn, AppView) {            
    var Root = Mn.Application.extend({
        region: "#appRegion",
        onStart: function() {
            this.showView(new AppView());
        }
    });
    
    var oRoot = new Root();
    oRoot.start();
        
    mp.action.add("test", {sourceType: mp.enum.sourceType.db, sourceName: "users", persist: true}, function(sType, oParam) {
        return {name: "hi"};
    });
    
    mp.action.dispatch("test", {name: "mike"});
});



 /*
    // testing
    var a = Backbone.Model.extend({
        initialize: function(options) {
            console.log(options.baseInfo);
        }
    });
    
    var b = a.extend({
        initialize: function(options) {
            console.log(options.myInfo);
            //this.constructor.__super__.initialize.apply(this, arguments);
            a.prototype.initialize.apply(this, arguments);
        }
    });
    
    var o = new b({myInfo: "Hi W", baseInfo: "hi Universe!"});
    
    
    function t(oParam) {
        var abc = 1;
        console.log(abc);
        return (function(oParam) {
            abc = oParam + 2
            console.log(abc);
            return oParam + 1;
        })(oParam)
    }
    
    t(100);
    */