'use strict';

define("mp", ['jquery', 'underscore', 'backbone.radio'],
function($, _, Radio) {    
   var me = {
        actions: {},
        db: {},
        store: {
            db: {},
            ui: {}
        },
        enum: {
            "sourceType": {
                "db": "db",
                "ui": "ui"
            }
        },
        get: function(oObj, sProp) {
            return oObj[sProp];
        },
        set: function(oObj, sProp, sValue) {
            oObj[sProp] = sValue;
        }            
    };

    return {
        action: {
            add: function(sName, oParam, oCallBack) {
                if (typeof me[sName] === "undefined") {
                    me.set(me.actions, sName, _.extend({}, oParam, {callBack: oCallBack}));
                    //me.actions[sName] = ;
                }
                else {
                    throw "App Error > action already existed!";
                }
            },
            dispatch: function(sType, oParam, oThis) {                
                if (typeof sType === "undefined") {
                    throw "App Error > dispatch > type missing!";
                }

                if (typeof me.get(me.actions, sType) === "undefined") {
                    throw "App Error > dispatch > action not found!";
                }

                var oReturn = me.get(me.actions, sType).callBack.call(oThis||this, sType, oParam);                    

                var sSourceName = me.get(me.actions, sType).sourceName;
                if (me.get(me.actions, sType).sourceType === me.get(me.enum, "sourceType").db) {
                    if (sSourceName) {
                        me.set(me.db, sSourceName,  oReturn);
                    }

                    if (me.get(me.actions, sType).persist) {
                        me.set(me.store.db, sSourceName, JSON.stringify(oReturn) );
                    }    
                }                    
            }
        }, 
        enum: me.enum
    }
});
    
