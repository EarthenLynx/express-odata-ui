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
          const host = this._getServerAdress();
          const payload = this.getView().getModel("newRoute").oData;

          payload.id = this._handleComputeRouteId();
          $.ajax({
            // FIXME: Add production route here later on
            url: host + "/admin/routes",
            data: payload,
            type: "POST",
            // beforeSend: (req) => console.warn(req),
            success: (res, status, xhr) =>
              MessageToast.show("Route has been saved successfully."),
            error: (xhr, status, err) =>
              MessageToast.show(status + " - Could not save route: " + err),
          });
        },

        onSetActiveRouteOdataType(res) {
          let oDataType = res["edmx:Edmx"]["edmx:DataServices"]["Schema"]["_attributes"]["Namespace"];
          this.getView().getModel('newRoute').setProperty("/oDataType", oDataType)
        },

        /*
         * ACTIONS
         */

        handleComputeOdataType() {
          const host = this._getServerAdress()
          const url = this.getView().getModel('newRoute').getProperty('/url');
          
          $.ajax({
          url: host + '/ometa/props?url=' + url,
          type: 'GET',
          success: (res, status, xhr) => this.onSetActiveRouteOdataType(res),
          error: (xhr, status, err) => {
            MessageToast.show("Could not get the OData type. Please add it manually. \n " + err);
          },
          
          });
        },

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
