sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    createErrorLogsModel() {
      return new JSONModel([
        {
          type: "error",
          time: "Just now",
          msg: "Congrats! You're error free",
        },
        {
          type: "error",
          time: "Just now",
          msg: "Congrats! You're error free",
        },
      ]);
    },
  };
});
