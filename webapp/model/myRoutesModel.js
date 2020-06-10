sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    createMyRoutesModel() {
      return new JSONModel([
        {
          id: "",
          name: "",
          url: "",
          type: "json",
          oDataType: "",
          typeOptions: [
            {
              text: "JSON",
              value: "json",
              icon: "sap-icon://syntax",
            },
            {
              text: "XML",
              value: "xml",
              icon: "sap-icon://source-code",
            },
          ],
          oDataCollection: "",
          desc: "",
          sap: false,
          guest: false,
          active: true,
          value: {
            first_name: "new",
            sur_name: "user",
            age: 42,
          },
        },
      ]);
    },
  };
});
