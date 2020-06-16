sap.ui.define(["./Basecontroller", "sap/m/BusyDialog"], function (
  Basecontroller,
  BusyDialog
) {
  "use strict";

  return Basecontroller.extend(
    "sap.ui.mgmt.odata.routes.controller.Basecontroller",
    {
      onAfterRendering: function () {},

      /*
       * GETTERS
       */

      /*
       * SETTERS
       */

      onUpdateRoute(callback) {
        const host = this._getServerAdress();
        const self = this;
        const payload = self.getView().getModel("activeRoute").oData;

        console.log(payload)

        $.ajax({
          url: host + "/admin/routes",
          data: payload,
          type: "POST",
          beforeSend() {
            if (!self.beforeSendDialog) {
              self.beforeSendDialog = new BusyDialog();
              self.getView().addDependent(self.beforeSendDialog);
            }
            self.beforeSendDialog.open();
          },
          success: (result, status, xhr) => console.log(status),
          error: (xhr, status, err) => console.log(err),
          complete() {
            self.beforeSendDialog.close();
          },
        });
      },

      /*
       * ACTIONS
       */

      handleCheckRouteActivity() {
        const self = this;
        const route = self
          .getView()
          .getModel("activeRoute")
          .getProperty("/url");

        $.ajax({
          url: route,
          type: "GET",
          beforeSend() {
            if (!self.beforeSendDialog) {
              self.beforeSendDialog = new BusyDialog();
              self.getView().addDependent(self.beforeSendDialog);
            }
            self.beforeSendDialog.open();
          },
          success: (res, status, xhr) =>
            self._handleCreateConfirmationPopup(
              "This route is up and available!"
            ),
          error: (xhr, status, err) =>
            self._handleCreateErrorPopup(
              "Could not reach the specified route: " + err
            ),
          complete() {
            self.beforeSendDialog.close();
          },
        });
      },

      handleOnUpdateRoute() {
        this.onUpdateRoute(() => console.log("Route has been updated!"))
      }, 

      handleCancelOnUpdateRoute() {
        this.handleNavToRouteOverview()
      }
    }
  );
});
