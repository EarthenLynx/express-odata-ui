sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./model/models", 
	"./model/activeRouteModel", 
	"./model/errorLogsModel",
	"./model/infoLogsModel",
	"./model/myRoutesInfoModel",
	"./model/myRoutesModel",
	"./model/newRouteModel",
], function(UIComponent, Device, models, activeRouteModel, errorLogsModel, infoLogsModel, myRoutesInfoModel, myRoutesModel, newRouteModel) {
	"use strict";

	return UIComponent.extend("sap.ui.mgmt.odata.routes.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// Initialize the Models for the App
			this.setModel(activeRouteModel.createActiveRouteModel(), "activeRoute"); 
			this.setModel(errorLogsModel.createErrorLogsModel(), "errorLogs"); 
			this.setModel(infoLogsModel.createInfoLogsModel(), "infoLogs");
			this.setModel(myRoutesInfoModel.createMyRoutesInfoModel(), "myRoutesInfo");
			this.setModel(myRoutesModel.createMyRoutesModel(), "myRoutes");
			this.setModel(newRouteModel.createNewRouteModel(), "newRoute");

			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});
});