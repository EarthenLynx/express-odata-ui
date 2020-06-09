sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    createInfoLogsModel() {
      return new JSONModel([
        {
          type: "info",
          time: "",
          msg: "",
        },
      ]);
    },
  };
});
