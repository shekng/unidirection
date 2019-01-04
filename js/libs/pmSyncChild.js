'use strict';

define("pmSyncChild", ['jquery', 'underscore', 'backbone.radio', 'pm'],
function($, _, Radio, pm) {    
    return function(oStore) {        
        this.oStore = oStore
        var thisStore = oStore;    
        var syncChildChannel = Radio.channel("syncChildChannel");
                
        $.pm.unbind("pmSyncSetDataToChild");
        $.pm.bind("pmSyncSetDataToChild", function (oObj) {            
            //if (oStore[oObj.item]) {      
            thisStore[oObj.key] = oObj.data;
            syncChildChannel.trigger("syncChild:setDataToChild", {key: oObj.key, data: oObj.data});                
        });    
        
        this.getItem = function (oParam) {
            var me = this;
            
            $.pm({
                    target: window.parent,
                    type: "pmSyncGetData",
                    data: oParam.key,
                    success: function(oData) {
                        me.oStore[oParam.key] = oData;                        
                        if ($.isFunction(oParam.callBack)) {
                            oParam.callBack.call(this, oData);
                        }
                    }
            });                     
        };
        
        this.setItem = function (oParam) {
            var me = this;
            
            $.pm({
                    target: window.parent,
                    type: "pmSyncSetData",
                    data: oParam,
                    success: $.isFunction(oParam.callBack) ? oParam.callBack : $.noop                    
            });                     
        }
    };       
});
