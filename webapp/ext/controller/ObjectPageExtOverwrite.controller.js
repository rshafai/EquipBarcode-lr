sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension",
    "sap/ui/core/mvc/OverrideExecution",
    "sap/m/MessageToast"
], function (ControllerExtension, OverrideExecution, MessageToast) {
    "use strict";

    return ControllerExtension.extend("ca.gc.agr.equipbcodelr.ext.controller.ObjectPageExt", {
        override: {
            onAfterRendering: function () {
                const oView = this.getView();

                setTimeout(() => {
                    const oButton = oView.byId("EquipAuditButton");

                    if (oButton) {
                        oButton.addStyleClass("auditButtonBig");

                        //  move button around, reorder, etc
                        // const oHeader = oView.byId("objectPageHeader");
                        // if (oHeader) {
                        //     oHeader.insertContentRight(oButton, 0); // move it to the top
                        // }
                        
                        console.log("Audit Equipment button styled and positioned.");
                    } else {
                        console.warn("EquipAuditButton not found in view.");
                    }
                }, 150);
            }
        },

        EquipAudit: function () {
            MessageToast.show("Audit Equipment button clicked");
        }
    });
});
