sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    createMyRoutesInfoModel() {
      return new JSONModel({
        count: "12",
        aveRes: "120",
        reqs: "100",
        errs: "3",
      });
    },
  };
});
