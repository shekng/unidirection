'use strict';

define([
    'jquery',
    'underscore',
    'marionette',
    'backbone.radio'
], function($, _, Mn, Radio){
    var view = Mn.View.extend({        
        tagName: "li",
        template: _.template("<a href='#user/<%=id%>'><%= name %></a> <button class='delItem'>Delete</button>"),
        ui: {
            del: ".delItem"
        },
        triggers: {
            "click @ui.del": "delete:item"  
        },
        events: {
            "click @ui.del": "deleteModel"  
        },
        deleteModel: function() {
            //var basicChannel = Radio.channel("basic");
            //basicChannel.trigger("some:event", {type: "2"});
                        
            //var channelNotify = Radio.channel("notify");        
            //alert(channelNotify.request("show:error", "this is an error"));
        },
        onRender: function() {
            console.log('li - render (' + this.model.get("name") + ')');                    
        },
        onDestroy: function() {
            console.log('li - destroy (' + this.model.get("name") + ')');
        },
    });
    
    return view;
});