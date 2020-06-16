sap.ui.define(
  ["./Basecontroller", "sap/m/MessageToast", "sap/m/BusyDialog"],
  function (Basecontroller, MessageToast, BusyDialog) {
    "use strict";

    return Basecontroller.extend(
      "sap.ui.mgmt.odata.routes.controller.Basecontroller",
      {
        /*
         * GETTERS
         */

        getTestRoute() {
          const self = this;
          const host = this._getServerAdress();

          const oUrl = self
            .getOwnerComponent()
            .getModel("newRoute")
            .getProperty("/url");

          const oType = self
            .getOwnerComponent()
            .getModel("newRoute")
            .getProperty("/type");

          $.ajax({
            url: host + "/odata?url=" + oUrl,
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
                .getModel("newRoute")
                .setProperty("/value", JSON.stringify(res));

              MessageToast.show("Done parsing data");
            } /* Do something with the response */,
            error(err) {
              self
                .getOwnerComponent()
                .getModel("newRoute")
                .setProperty("/value", JSON.stringify(err));
              MessageToast.show(
                "Could not fetch data. You might have forgotten the http:// or hit a false route."
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

        handlePrettyPrint() {
          const codecheckValue = this.getOwnerComponent()
            .getModel("newRoute")
            .getProperty("/value");

          const prettyValue = JSON.parse(JSON.stringify(codecheckValue.replace(/\\/g, "")))
          
          this.getOwnerComponent()
            .getModel("newRoute")
            .setProperty("/value", prettyValue);
          
          this.getView().byId("codeEditor").prettyPrint();
        },
      }
    );
  }
);
