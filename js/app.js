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
      pmSyncParent: 'libs/pmSyncParent'
  }
});

//Start up our App
require([
    'jquery', 'underscore', 'backbone', 'backbone.radio'
], 
function ($, _, Backbone, Radio) {        
    /*
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
    
    var app = (function() {
        var me = {
            actions: {},
            db: {},
            store: {
                db: {},
                ui: {}
            },
            enum: {
                "sourceType": {
                    "db": "db",
                    "ui": "ui"
                }
            } 
        };
        
        return {
            action: {
                add: function(sName, oParam, oCallBack) {
                    if (typeof me[sName] === "undefined") {
                        me.actions[sName] = _.extend({}, oParam, {callBack: oCallBack});
                    }
                    else {
                        throw "App Error > action already existed!";
                    }
                },
                dispatch: function(sType, oParam, oThis) {                
                    if (typeof sType === "undefined") {
                        throw "App Error > dispatch > type missing!";
                    }

                    if (typeof me.actions[sType] === "undefined") {
                        throw "App Error > dispatch > action not found!";
                    }

                    var oReturn = me.actions[sType].callBack.call(oThis||this, sType, oParam);                    
                    
                    if (me.actions[sType].sourceType === me.enum.sourceType.db) {
                        if (me.actions[sType].sourceName) {
                            me.db[me.actions[sType].sourceName] = oReturn;
                        }

                        if (me.actions[sType].persist) {
                            me.store.db[me.actions[sType].sourceName] = JSON.stringify(oReturn);
                        }    
                    }                    
                }
            }, 
            enum: me.enum
        }
    }());    
    
    
    app.action.add("test", {sourceType: app.enum.sourceType.db, sourceName: "users", persist: true}, function(sType, oParam) {
        return {name: "hi"};
    });
    
    app.action.dispatch("test", {name: "mike"});
});