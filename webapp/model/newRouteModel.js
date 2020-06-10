sap.ui.define([
	"sap/ui/model/json/JSONModel",
], function(JSONModel) {
	"use strict";

	return {
        // @modelname   :   newRoute
        createNewRouteModel() {
            return new JSONModel({
                id: "", 
                name: "", 
                url: "", 
                type: "json", 
                typeOptions: ["json", "xml"],
                desc: "", 
                sap: true, 
                guest: false, 
                active: true, 
                value: {
                    "first_name": "new",
                    "sur_name": "user",
                    "age": 42, 
                }
            })
        }

	};
});