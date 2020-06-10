sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    createErrorLogsModel() {
      return new JSONModel([
        {
          level: "error",
          time: "Just now",
          message: "Congrats! You're error free",
        },
        {
          level: "error",
          time: "Just now",
          message: "Congrats! You're error free",
        },
      ]);
    },
  };
});
