sap.ui.define(
  ["./Basecontroller", "sap/m/BusyDialog", "sap/m/MessageToast"],
  function (Basecontroller, BusyDialog, MessageToast) {
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

          console.log(payload);

          $.ajax({
            url: host + "/admin/routes",
            data: payload,
            type: "PATCH",
            beforeSend() {
              if (!self.beforeSendDialog) {
                self.beforeSendDialog = new BusyDialog();
                self.getView().addDependent(self.beforeSendDialog);
              }
              self.beforeSendDialog.open();
            },
            success: (result, status, xhr) =>
              MessageToast.show("Route has been updated successfully."),
            error: (xhr, status, err) =>
              MessageToast.show(
                status + " - An error occured while updating the route.",
                err
              ),
            complete() {
              self.beforeSendDialog.close();
              if (callback) {
                callback();
              }
            },
          });
        },

        onDeleteRoute(callback) {
          const host = this._getServerAdress();
          const self = this;
          const payload = self.getView().getModel("activeRoute").oData;

          console.log(payload);

          $.ajax({
            url: host + "/admin/routes",
            data: payload,
            type: "DELETE",
            beforeSend() {
              if (!self.beforeSendDialog) {
                self.beforeSendDialog = new BusyDialog();
                self.getView().addDependent(self.beforeSendDialog);
              }
              self.beforeSendDialog.open();
            },
            success: (result, status, xhr) =>
              MessageToast.show("Route has been successfully deleted."),
            error: (xhr, status, err) =>
              MessageToast.show(
                status + " - An error occured while deleting the route.",
                err
              ),
            complete() {
              self.beforeSendDialog.close();
              if (callback) {
                callback();
              }
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
          this.onUpdateRoute(() => this.handleNavToRouteOverview());
        },

        handleCancelOnUpdateRoute() {
          this.handleNavToRouteOverview();
        },

        handleOnDeleteRoute() {
          this._handleCreateConfirmationPopup(
            "Are you sure you want to delete this route?",
            () => this.onDeleteRoute(() => this.handleNavToRouteOverview())
          );
        },
      }
    );
  }
);
