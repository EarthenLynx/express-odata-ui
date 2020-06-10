sap.ui.define(
  ["./Basecontroller", "sap/m/MessageToast", "sap/m/BusyDialog"],
  function (Basecontroller, MessageToast, BusyDialog) {
    "use strict";

    return Basecontroller.extend("sap.ui.mgmt.odata.routes.controller.Basecontroller", {
      /*
       * GETTERS
       */

      getTestRoute() {
        var self = this;

        var oUrl = self
          .getOwnerComponent()
          .getModel("activeRoute")
          .getProperty("/url");

        var oType = self
          .getOwnerComponent()
          .getModel("activeRoute")
          .getProperty("/type");

        $.ajax({
          url: oUrl,
          headers: {
            "Content-Type": "application/xml" + oType,
          },
          beforeSend() {
            if (!self.beforeSendDialog) {
              self.beforeSendDialog = new BusyDialog();
              self.getView().addDependent(self.beforeSendDialog);
            }
            self.beforeSendDialog.open();
          },
          success(res, status) {
            //TODO: Add functionality for XML too
            self
              .getOwnerComponent()
              .getModel("activeRoute")
              .setProperty("/value", JSON.stringify(res));
            self.getView().byId("codeEditor").prettyPrint();
            console.log(status);

            MessageToast.show("OK");
          } /* Do something with the response */,
          error(err) {
            self
              .getOwnerComponent()
              .getModel("activeRoute")
              .setProperty("/value", JSON.stringify(err));
            self.getView().byId("codeEditor").prettyPrint();
            MessageToast.show(
              "Could not fetch data. Maybe you've entered an invalid URL?"
            );
          } /* Do something when an error occurs */,
          complete() {
            self.beforeSendDialog.close();
          },
        });
      },

      /*
       * SETTERS
       */

      /*
       * ACTIONS
       */

      handleGetTestRoute() {
        this.getTestRoute();
      },
    });
  }
);
