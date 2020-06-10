sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  function (Controller) {
    "use strict";

    return Controller.extend("sap.ui.mgmt.odata.routes.controller.App", {

      onInit: function () {
        this.getView().addStyleClass(
          this.getOwnerComponent().getContentDensityClass()
        );
      },

      handleNavToNewRoute() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("newroute");
      },

      handleNavToHome() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("home");
      },
    });
  }
);
