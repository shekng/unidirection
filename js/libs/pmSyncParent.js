'use strict';

define("pmSyncParent", ['jquery', 'underscore', 'backbone.radio', 'pm'],
function($, _, Radio, pm) {    
    return function(oStore) {
        this.oStore = oStore        
        var thisStore = oStore;    
        var syncParentChannel = Radio.channel("syncParentChannel");
        
        $.pm.unbind("pmSyncGetData");
        $.pm.bind("pmSyncGetData", function (sKey) {
            return (thisStore[sKey]) ? thisStore[sKey] : undefined;            
        });    

        $.pm.unbind("pmSyncSetData");
        $.pm.bind("pmSyncSetData", function (oObj) {
            if (thisStore[oObj.key]) {
                syncParentChannel.trigger("syncParent:setData", {key: oObj.key, data: oObj.data});                
                return thisStore[oObj.key] = oObj.data;
            }
            else {
                return undefined;
            }
        });    
                
        this.setItemtoChild = function (oParam) {
            $.pm({
                    target: $("#ifr").get(0).contentWindow,
                    type: "pmSyncSetDataToChild",
                    data: oParam,
                    success: function(oReturn) {

                    }
            });                     
        }
    };
       
});

