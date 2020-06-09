sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    createInfoLogsModel() {
      return new JSONModel([
        {
          type: "info",
          time: "just now",
          msg: "Nothing to report",
        },
        {
          type: "info",
          time: "a bit later",
          msg: "Still nothing",
        },
      ]);
    },
  };
});
