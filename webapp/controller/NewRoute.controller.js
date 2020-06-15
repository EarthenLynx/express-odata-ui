sap.ui.define(
  ["./Basecontroller", "sap/m/MessageToast", "../model/formatter"],
  function (Basecontroller, MessageToast, formatter) {
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
          const route = this.getView().getModel("newRoute").oData;
          route.id = this._handleComputeRouteId();
          $.ajax({
            url: "http://localhost:3000/admin/routes",
            data: route,
            type: "POST",
            beforeSend: (request) => console.warn(request),
            success: (result, status, xhr) => console.log(status),
            error: (xhr, status, err) => console.log(err),
            complete: (xhr, status) => console.log(status),
          });
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
            bValidationError =
              this._handleValidateInput(oInput) || bValidationError;
          }, this);

          if (!bValidationError) {
            callback();
          } else {
            MessageToast.show("Could not validate inputs, please check.");
          }
        },

        handleCreateNewRoute() {
          this.handleValidateNewRouteForm(() => {
            this._handleCreateConfirmationPopup(
              "This will create a new route with the details you have provided. ",
              () => this.onCreateRoute()
            );
          });
        },

        handleCancelCreateRoute() {
          this._handleCreateConfirmationPopup(
            "Are you use you want to cancel creating the route?",
            () => this.handleNavToHome()
          );
        },
      }
    );
  }
);
