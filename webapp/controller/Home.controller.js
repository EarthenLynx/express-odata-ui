sap.ui.define(
  ["./Basecontroller", "../model/formatter","sap/ui/core/routing/History"],
  function (Controller, formatter, History) {
    "use strict";

    return Controller.extend("sap.ui.mgmt.odata.routes.controller.Basecontroller", {
      formatter: formatter,

      onInit: function () {},
      /*
       * GETTERS
       */

      /*
       * SETTERS
       */

      /*
       * ACTIONS
       */

      printModel() {
        var model = this.getOwnerComponent().getModel("newRoute");
        console.log(model);
      },
    });
  }
);
