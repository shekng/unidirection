'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    //App Files
    'model/user'
], function($, _, Backbone, model){

    var collection = Backbone.Collection.extend({

      model: model

    });

  return collection;

});