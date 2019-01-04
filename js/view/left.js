'use strict';

define([
    'jquery',    
    'underscore',
    'backbone.radio',
    'marionette',
    'text!tmpl/left.html'    
], function($, _, Radio, Mn, templateHTML){
    return Mn.View.extend({        
        template: _.template(templateHTML),                
        onRender: function() {            
        
        },
        onDestroy: function() {        
        }
    });    
});