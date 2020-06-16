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

      /*
       * ACTIONS
       */

      handleCheckRouteActivity() {
        const self = this;
        const route = self
          .getView()
          .getModel("activeRoute")
          .getProperty("/url");
        console.log(route);

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
    }
  );
});
