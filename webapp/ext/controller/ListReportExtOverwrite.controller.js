sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension",
  "sap/ui/base/Object",
		"sap/suite/ui/generic/template/extensionAPI/extensionAPI"
], function(ControllerExtension, BaseObject,ExtensionAPI) {
    'use strict';

  return ControllerExtension.extend("ca.gc.agr.equipbcodelr.ext.controller.ListReportExtOverwrite",{
      override:{
        onInit: function(oEvent){
debugger;
          this.getView().byId("id--listReportFilter").setShowClearOnFB(true);
        },
        onPendingFilters: function() {
          var oTable = this.getView().byId("BusinessPartners::BusinessPartnersList--fe::CustomTab::tab2--customViewWithTable");
          if (oTable) {
              oTable.setShowOverlay(true);
          }
        }
      },
  });
});