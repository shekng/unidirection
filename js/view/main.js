'use strict';

define(['jquery', 'underscore', 'marionette', 'text!tmpl/main.html', 'view/list'],
function($, _, Mn, templateHTML, ListColView) {
    var view = Mn.View.extend({
        template: _.template(templateHTML),
        ui: {        
        },
        events: {
        },
        regions: {
        },
        onRender: function() {
        },
        onDestroy: function() {
        }
    });
    
    return view;
});

