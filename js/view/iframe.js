'use strict';

define([
    'jquery',
    'underscore',
    'marionette',
    'backbone.radio',
    'text!tmpl/iframe.html',
    'collection/users',
    'view/listIfr'
], function($, _, Mn, Radio, templateHTML, UserCollection, listView){
    var view = Mn.View.extend({
        template: _.template(templateHTML),
        regions: {
            users: ".divUsers"
        },
        onRender: function() {
            console.log('iframe - render');
            
            var appIfrChannel = Radio.channel("appIfr");
            this.appIfr = appIfrChannel.request("appIfr:get");
            
            this.showChildView("users", new listView({collection: this.collection}));
        },
        onDestroy: function() {
            console.log('iframe - destroy');
        }
    });
    
    return view;
});


