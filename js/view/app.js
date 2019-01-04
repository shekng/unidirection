'use strict';

define(['jquery', 'underscore', 'marionette', 'view/header'],
function($, _, Mn, HeaderView) {
    var view = Mn.View.extend({
        el: "#containerRegion",  
        template: false,
        regions: {
            header: "#headerRegion",
            main: "#mainRegion"
        },
        initialize: function() {
            this.showChildView("header", new HeaderView({collection: this.collection}));
            //this.showChildView("main", new MainView());
        },
        onRender: function() {
            
        }
        
    });
    
    return view;
});