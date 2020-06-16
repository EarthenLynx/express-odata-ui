sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/Text", "sap/m/Button", "sap/m/Dialog"],
  function (Controller, Text, Button, Dialog) {
    "use strict";

    return Controller.extend("sap.ui.mgmt.odata.routes.controller.App", {
      onInit: function () {},

      // Global Navigation functions
      handleNavToHome() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("home");
      },


      handleNavToNewRoute() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("newroute");
      },

      
      handleNavToRouteOverview() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("routesoverview");
      },

      handleNavToRouteDetail() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("routesdetail");
      },

      // Global Variable calculators
      _getServerAdress() {
        return "http://localhost:3000"
      },

      // Global Helper Functions
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
        let ranId = () => {
          return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16)
            .substring(1);
        };
        return (
          ranId() +
          ranId() +
          "-" +
          ranId() +
          "-" +
          ranId() +
          "-" +
          ranId() +
          "-" +
          ranId() +
          ranId() +
          ranId()
        );
      },

      _handleCreateConfirmationPopup(text, action) {
        var oDialog = new Dialog({
          title: "Confirm your settings",
          type: "Message",
          state: "Information",
          content: new Text({
            text: text,
          }),
          beginButton: new Button({
            text: "Cancel",
            type: "Reject",
            press() {
              oDialog.close();
            },
          }),

          endButton: new Button({
            text: "Confirm",
            type: "Accept",
            press() {
              if(action) {
                action()
              }
              oDialog.close();
            },
          }),

          afterClose() {
            oDialog.destroy();
          },
        });
        oDialog.open();
        return;
      },

      _handleCreateErrorPopup(text, action) {
        var oDialog = new Dialog({
          title: "An error has occured",
          type: "Message",
          state: "Error",
          content: new Text({
            text: text,
          }),
          beginButton: new Button({
            text: "Cancel",
            type: "Reject",
            press() {
              oDialog.close();
            },
          }),

          endButton: new Button({
            text: "Confirm",
            type: "Accept",
            press() {
              if(action) {
                action()
              }
              oDialog.close();
            },
          }),

          afterClose() {
            oDialog.destroy();
          },
        });
        oDialog.open();
        return;
      }
    });
  }
);
