sap.ui.define(
  [
    "./Basecontroller",
    "../model/formatter",
    "sap/ui/model/json/JSONModel","sap/m/MessageToast",
  ],
  function (Basecontroller, formatter, JSONModel, MessageToast) {
    "use strict";

    return Basecontroller.extend("sap.ui.mgmt.odata.routes.controller.Basecontroller", {
      formatter: formatter,
      /*
       * GETTERS
       * getInfoLogs  :   Fetches Info Logs from middleware and sets infoLogs model accordingly
       * getErrorLogs :   Fetches Error Logs from middleware and sets errorLogs model accordingly
       */

      getInfoLogs() {
        var self = this;

        const host = this._getServerAdress();

        $.ajax({
          url: host + "/admin/logs/combined",
          success(res, status) {
            let infoLogs = new JSONModel(res);
            self.getOwnerComponent().setModel(infoLogs, "infoLogs");
          },
          error(err) {
            MessageToast.show("Error: \n Could not fetch infologs: " + err)
          }
        });
      },

      getErrorLogs() {
        var self = this;

        const host = this._getServerAdress();

        $.ajax({
          url: host + "/admin/logs/error",
          beforeSend() {
            console.log("Fetching error logs now ...");
          },
          success(res, status) {
            let errorLogs = new JSONModel(res);
            self.getOwnerComponent().setModel(errorLogs, "errorLogs");
          },
          error(err) {
            MessageToast.show("Error: \n Could not fetch errorlogs: " + err)
          }
        });
      },

      /*
       * SETTERS
       */

      /*
       * ACTIONS
       */
      onInit() {
        var self = this;
        setInterval(() => {
          self.getInfoLogs();
          self.getErrorLogs();
        }, 10000);
      },
    });
  }
);
