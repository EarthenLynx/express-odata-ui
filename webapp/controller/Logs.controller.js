sap.ui.define(
  [
    "./Basecontroller",
    "../model/formatter",
    "sap/ui/model/json/JSONModel",
  ],
  function (Basecontroller, formatter, JSONModel) {
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
          headers: {
            "Content-Type": "application/json",
          },
          beforeSend() {
            console.log("Fetching info logs now ...");
          },
          success(res, status) {
            let infoLogs = new JSONModel(res);
            self.getOwnerComponent().setModel(infoLogs, "infoLogs");
          } /* Do something with the response */,
          error(err) {
            console.log(err);
          } /* Do something when an error occurs */,
          complete() {
            console.log("done fetching info logs");
          },
        });
      },

      getErrorLogs() {
        var self = this;

        const host = this._getServerAdress();

        $.ajax({
          url: host + "/admin/logs/error",
          headers: {
            "Content-Type": "application/json",
          },
          beforeSend() {
            console.log("Fetching error logs now ...");
          },
          success(res, status) {
            let errorLogs = new JSONModel(res);
            console.log(errorLogs);

            self.getOwnerComponent().setModel(errorLogs, "errorLogs");
          } /* Do something with the response */,
          error(err) {
            console.log(err);
          } /* Do something when an error occurs */,
          complete() {
            console.log("done fetching error logs");
          },
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
