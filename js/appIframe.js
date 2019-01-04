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
      ifrView: 'view/iframe',
      pm: 'libs/postmessage',
      pmSyncChild: 'libs/pmSyncChild'
  }
});

//Start up our App
require([
    'jquery', 'marionette', 'backbone.radio', 'pm', 'pmSyncChild', 'collection/users', 'ifrView'
], 
function ($, Mn, Radio, pm, pmSyncChild, UserCollection, ifrView) {
    var App = Mn.Application.extend({
        region: "#appIfr",
        onBeforeStart: function() {
        },
        onStart: function() {
            var me = this;
            
            var appIfrChannel = Radio.channel("appIfr");
            appIfrChannel.reply("appIfr:get", this.getApp, this);
            appIfrChannel.reply("appIfr:users:remove", this.removeUser, this);
            
            me.storeDB = {a: "1"};
            me.oSyncChild = new pmSyncChild(me.storeDB);
            me.colUserInIfr;
            
            me.oSyncChild.getItem({
                key: "users", 
                callBack: function(oData) {
                    me.colUserInIfr = new UserCollection(oData);
                    me.showView(new ifrView({collection: me.colUserInIfr}));    
                }
            });                                                    
                        
            /*
            me.oSyncChild.getItem({
                key: "p2", 
                callBack: function(oData) {
                }
            });            
            
            me.oSyncChild.setItem({
                key: "p1", 
                data: {name: "p1p1p1"},
                callBack: function(oData) {
                }
            });
            */
        },
        getApp: function() {
            return this;
        },
        removeUser: function(oModel) {
            this.colUserInIfr.remove(oModel);
            this.storeDB["users"] = this.colUserInIfr.toArray();
            
            this.oSyncChild.setItem({
                key: "users", 
                data: this.storeDB.users
            });
        }
    });
    
    var app = new App();
    app.start();
});