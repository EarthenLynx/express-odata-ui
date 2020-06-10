sap.ui.define(
  ["sap/ui/core/mvc/Controller", "../model/formatter", "sap/ui/core/Fragment"],
  function (Controller, formatter, Fragment) {
    "use strict";

    return Controller.extend("sap.ui.mgmt.odata.routes.controller.App", {
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
      handleOpenPopup() {
        Fragment.load({
          name: "sap.ui.mgmt.odata.routes.view.Newroute",
          controller: this,
        }).then(
          function (oDialog) {
            this.oDialog = oDialog;
            this.oDialog.open();
          }.bind(this)
        );
      },

      handleClosePopup() {
        this.oDialog.close();
      },
    });
  }
);
