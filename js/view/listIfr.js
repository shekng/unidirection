'use strict';

define(['jquery', 'underscore', 'backbone', 'marionette', 'backbone.radio', 'view/item'], 
function($, _, Bb, Mn, Radio, ItemView){
    var view = Mn.CollectionView.extend({
        tagName: "ul",
        //collection: new Bb.Collection(),
        childView: ItemView,        
        initialize: function() {
            var me = this;
            
            me.syncChildChannel = Radio.channel("syncChildChannel");        
            me.syncChildChannel.on("syncChild:setDataToChild", function(oParam) {
                me.collection.set(oParam.data);
            });
        },
        onRender: function() {
            this.appIfr = Radio.channel("appIfr");            
            console.log('ul - render');
        },
        onDestroy: function() {
            console.log('ul - destroy');
        },
        onChildviewDeleteItem: function(childView) {
            //var basicChannel = Radio.channel("basic");
            //basicChannel.trigger("some:event", {type: "1"});

            this.appIfr.request("appIfr:users:remove", childView.model);
            //this.collection.remove(childView.model);
        }
    });
    
    return view;
});
