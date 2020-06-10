sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  function (Controller) {
    "use strict";

    return Controller.extend("sap.ui.mgmt.odata.routes.controller.App", {

      onInit: function () {
      },

      // Navigation
      handleNavToNewRoute() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("newroute");
      },

      handleNavToHome() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("home");
      },

      // Helper Functions
      _handleValidateInput(oInput) {
        var oBinding = oInput.getBinding("value");
        var sValueState = "None";
        var bValidationError = false;

        try {
          oBinding.getType().validateValue(oInput.getValue());
        } catch (oException) {
          sValueState = "Error";
          bValidationError = true;
        }

        oInput.setValueState(sValueState);

        return bValidationError;
      },

      _handleComputeRouteId() {
        let ranId = () =>  {
          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
       };       
       return (ranId()+ranId()+"-"+ranId()+"-"+ranId()+"-"+ranId()+"-"+ranId()+ranId()+ranId());
      }
    });
  }
);
