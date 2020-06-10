sap.ui.define(["./Basecontroller", "sap/m/MessageToast", "../model/formatter"], function (
  Basecontroller,
  MessageToast,
  formatter
) {
  "use strict";

  return Basecontroller.extend(
    "sap.ui.mgmt.odata.routes.controller.Basecontroller",
    {
      formatter: formatter,
      /*
       * GETTERS
       */

      /*
       * SETTERS
       */

       onCreateRoute() {
        console.log("Trying to create a route ...");
        
       },

      /*
       * ACTIONS
       */

      handleValidateNewRouteForm(callback) {
        const oView = this.getView();
        const aInputs = [
          oView.byId("new-route-name-input"),
          oView.byId("new-route-url-input"),
          oView.byId("new-route-oType-input"),
        ];

        let bValidationError = false;
        aInputs.forEach(function (oInput) {
          bValidationError = this._handleValidateInput(oInput) || bValidationError;
        }, this);

        if (!bValidationError) {
          callback()
        } 
        else {
          MessageToast.show("Could not validate inputs, please check.");
        }
      },

      handleCreateNewRoute() {
        this.handleValidateNewRouteForm(() => {
          this.onCreateRoute(); 
        });
      },
    }
  );
});
