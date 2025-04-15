sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Input",
    "sap/ui/layout/form/SimpleForm"
], function (MessageToast, Dialog, Button, Label, Input, SimpleForm) {
    'use strict';

    return {
        onAuditCancel: function(oEvent){
            this._oAuditDialog.close();
        },
        EquipAudit: function (oEvent) {
            //RSH - Apr 15
            if (!this._oAuditDialog) {
				this._oAuditDialog = this.loadFragment({ name: "ca.gc.agr.equipbcodelr.ext.fragment.AuditForm" 
				}).then(function(oDialog){
					oDialog.open();
					this._oAuditDialog = oDialog;
				}.bind(this));
			} else {
				//this._rebindFaveTemplatesTable();
				this._oAuditDialog.open();
			}
return;            
            const oContext = oEvent.getSource().getBindingContext();
            const oData = oContext.getObject();
            const oModel = oContext.getModel();

            // Editable audit fields
            const auditFields = {
                BarcodeAuditedBy: new Input({ value: oData.BarcodeAuditedBy || "" }),
                BarcodeAuditedDate: new Input({ value: oData.BarcodeAuditedDate || "" }),
                BarcodeAuditorComments: new Input({ value: oData.BarcodeAuditorComments || "" })
            };

            const oFormDialog = new Dialog({
                title: "Audit Equipment",
                contentWidth: "600px",
                resizable: true,
                draggable: true,
                content: new SimpleForm({
                    editable: true,
                    layout: "ResponsiveGridLayout",
                    title: "Enter Equipment Audit Details",
                    content: [
                        // Basic Info 
                        new Label({ text: "Asset #" }),
                        new Input({ value: oData.EquipmentTrim, editable: false }),

                        new Label({ text: "Description" }),
                        new Input({ value: oData.EquipmentName, editable: false }),

                        new Label({ text: "Category" }),
                        new Input({ value: oData.EquipmentCategory, editable: false }),

                        new Label({ text: "Material" }),
                        new Input({ value: oData.Material, editable: true }),

                        new Label({ text: "Cost Center" }),
                        new Input({ value: oData.CostCenter, editable: true }),

                        new Label({ text: "Status" }),
                        new Input({ value: oData.BarcodeStatus, editable: true }),

                        // Location Info
                        new Label({ text: "Object Type" }),
                        new Input({ value: oData.TechnicalObjectType, editable: true }),

                        new Label({ text: "Functional Location" }),
                        new Input({ value: oData.FunctionalLocation, editable: true }),

                        new Label({ text: "Maintenance Plant" }),
                        new Input({ value: oData.MaintPlant, editable: true }),

                        new Label({ text: "Location" }),
                        new Input({ value: oData.Location, editable: true }),

                        new Label({ text: "Sort Field"}),
                        new Input({ text: oData.TechnicalObjectType, editable: true}),

                        new Label({ text: "Storage Location" }),
                        new Input({ value: oData.StorageLocation, editable: true }),

                        //  Admin Data (Audited Info)
                        new Label({ text: "Audited By" }),
                        auditFields.BarcodeAuditedBy,

                        new Label({ text: "Audit Date" }),
                        auditFields.BarcodeAuditedDate,

                        new Label({ text: "Audit Comments" }),
                        auditFields.BarcodeAuditorComments
                    ]
                }),
                beginButton: new Button({
                    text: "Save",
                    type: "Emphasized",
                    press: function () {
                        const sPath = oContext.getPath(); //  Equipment Number from CDS - Example: /ZQMM_C_EQUIPMENT_BC('100855')
                        const updatedData = {};

                        function setField(fieldName, control, isDate = false) {
                            const val = control.getValue();
                            if (val && val.trim() !== "") {
                                updatedData[fieldName] = isDate ? new Date(val).toISOString() : val;
                            }
                        }

                        setField("BarcodeAuditedBy", auditFields.BarcodeAuditedBy);
                        setField("BarcodeAuditedDate", auditFields.BarcodeAuditedDate, true);
                        setField("BarcodeAuditorComments", auditFields.BarcodeAuditorComments);

                        oModel.update(sPath, updatedData, {
                            success: function () {
                                MessageToast.show("Audit data updated successfully.");
                                oFormDialog.close();
                            },
                            error: function (oError) {
                                MessageToast.show("Error updating audit data.");
                                console.error(oError);
                            }
                        });
                    }
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oFormDialog.close();
                    }
                }),
                afterClose: function () {
                    oFormDialog.destroy();
                }
            });

            oFormDialog.open();
        }
    };
});
