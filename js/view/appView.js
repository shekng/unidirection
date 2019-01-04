'use strict';

define(['jquery', 'underscore', 'marionette', 'view/header', 'view/left', 'view/main'],
function($, _, Mn, HeaderView, LeftView, MainView) {
    var view = Mn.View.extend({
        el: "#container",  
        template: false,
        regions: {
            header: "#headerPanel",
            left: "#leftPanel",
            main: "#mainPanel",
        },
        initialize: function() {
            this.showChildView("header", new HeaderView());
            this.showChildView("left", new LeftView());
            this.showChildView("main", new MainView());
        },
        onRender: function() {
            
        }
        
    });
    
    return view;
});