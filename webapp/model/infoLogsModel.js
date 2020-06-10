sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    createInfoLogsModel() {
      return new JSONModel([
        {
          level: "info",
          time: "just now",
          message: "Nothing to report",
        },
        {
          level: "info",
          time: "a bit later",
          message: "Still nothing",
        },
      ]);
    },
  };
});
