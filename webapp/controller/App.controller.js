sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/demo/basicTemplate/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("sap.ui.mgmt.odata.routes.controller.App", {

		formatter: formatter,

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
	});
});