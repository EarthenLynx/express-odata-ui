sap.ui.define(
  ["./Basecontroller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"],
  function (Basecontroller, MessageToast, JSONModel) {
    "use strict";

    return Basecontroller.extend(
      "sap.ui.mgmt.odata.routes.controller.Basecontroller",
      {
        onInit: function () {
          this.getRoutes();
        },

        /*
         * GETTERS
         */
        getRoutes(callback) {
          const self = this;

          const host = self._getServerAdress();

          $.ajax({
            url: host + "/admin/routes",
            type: "GET",
            success: (res, status, xhr) => {
              let oModel = res;

              oModel.map((el) => {
                if (el.sap === "true") {
                  el.sap = true;
                } else {
                  el.sap = false;
                }

                if (el.guest === "true") {
                  el.guest = true;
                } else {
                  el.guest = false;
                }

                if (el.active === "true") {
                  el.active = true;
                } else {
                  el.active = false;
                }
              });

              let myRoutes = new JSONModel(oModel);
              self.getOwnerComponent().setModel(myRoutes, "myRoutes");
              MessageToast.show("Fetched service routes from server.");
              callback();
            },
            error: (xhr, status, err) =>
              MessageToast.show("Could not fetch service routes: " + err),
          });
        },

        /*
         * SETTERS
         */

        setActiveRoute(oEvent, callback) {
          // You MUST Specify the
          const sPath = oEvent
            .getSource()
            .getBindingContext("myRoutes")
            .getPath("id");
          const oTable = this.getView().byId("routes-overview");
          const modelData = oTable.getModel("myRoutes");
          const routeId = modelData.getProperty(sPath);

          const activeRoute = new JSONModel(
            modelData.oData.find((route) => {
              return route.id === routeId;
            })
          );

          this.getOwnerComponent().setModel(activeRoute, "activeRoute");
          callback();
        },

        /*
         * ACTIONS
         */
        handleSetActiveRoute(oEvent) {
          const self = this;
          self.setActiveRoute(oEvent, () =>
            self.getRoutes(() => self.handleNavToRouteDetail())
          );
        },
      }
    );
  }
);
