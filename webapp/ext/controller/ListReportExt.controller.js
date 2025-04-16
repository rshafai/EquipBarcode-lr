sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension",
    "sap/ui/core/mvc/OverrideExecution",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ndc/BarcodeScanner",
    "sap/ui/model/json/JSONModel"
], function(ControllerExtension, OverrideExecution, MessageBox, MessageToast, BarcodeScanner, JSONModel) {
    "use strict";

  return { 
//      return ControllerExtension.extend("ca.gc.agr.equipbcodelr.ext.controller.ListReportExt",{
  //     metadata: {
	// 			methods: { 
	// 				"onInit": {"public": true, "final": false, overrideExecution: OverrideExecution.After}
	// 			}
	// 		},
  //     override:{
  //       //templateBaseExtension: {
  //         onInit: function(oEvent){
  // debugger;
  // this.getView().getController().extension.ca.gc.agr.equipbcodelr.ext.controller.ListReportExt.scanMe();
  //         }
        
  //     },
        scanMe: function(oEvent) {
            MessageToast.show("Barcode scanned successfully");

            BarcodeScanner.scan(
              function (mResult) {
                console.log("We got a barcode\n" + "Result: " + mResult.text + "\n" + "Format: " + mResult.format + "\n" + "Cancelled: " + mResult.cancelled);
                this.onScanSuccess(mResult);
              }.bind(this),
              function (Error) {
                MessageBox.error("Scanning failed: " + Error);
              },
              function (mParams) {
                //console.log("Value entered: " + mParams.newValue);
              },
              "Scan a barcode or type-in an equipment number to searh for",  //title
              true,                       //preferFrontCamera
              30,                         //frameRate
              1,                          //zoom
              false,                      //keepCameraScan
              false                       //disableBarcodeInputDialog
              );
          },


          onScanSuccess: function(mResult) {
            if (mResult.cancelled) {
                MessageToast.show("Scan cancelled", { duration:1000 });
            } else {
                var sBarCode = mResult.text; //oEvent.getParameter("text") || '';
                var oFilterBar = this.byId("ca.gc.agr.equipbcodelr::sap.suite.ui.generic.template.ListReport.view.ListReport::zqmm_c_equipment_bc--listReportFilter"); //this.byId("worklistFilterBar");
                var oFilterData = oFilterBar.getFilterData();

                oFilterData.EquipmentTrim = {
                    items: [],
                    ranges: [],
                    value: sBarCode   
                };
                oFilterBar.setFilterData(oFilterData);
                oFilterBar.search();

                // if (sBarCode) {
                //     oScanResultText.setText(oEvent.getParameter("text"));
                // } else {
                //     oScanResultText.setText('');
                // }
            }
        },
        
        createScan: function(oEvent) {
          MessageToast.show("Calling external API. Please wait ...");

          var model = new JSONModel();
          this.getView().setModel(model, "barcode")

          var cors = "https://cors-anywhere.herokuapp.com/";
          var uri = cors + "https://apigtwb2c.us.dell.com/PROD/sbil/eapi/v5/assets?servicetags=JHGNHW3";
          // var oHeaders = {
          //    "Authorization": "l70bac3db7bcf345d8a8c84404ffb7ece1"
          // };
          // model.loadData(uri, null, true, "GET", null, false, oHeaders);

          var myHeaders = new Headers();
          //myHeaders.append("x-rapidapi-key", "XxXxXxXxXxXxXxXxXxXxXxXx");
          myHeaders.append("Authorization", "l70bac3db7bcf345d8a8c84404ffb7ece1");

          var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
          };


          fetch(uri, requestOptions)
              .then((response) => {
                    if (!response.ok) {
                      throw new Error(`HTTP error ${response.status}`);
                    }
                    return response.text(); // Or `.json()` or one of the others
              })
              .then((result) => {
                    console.log('Got something from Dell', result); //  model.setData(result))
              })
              .catch((error) => {
                    console.log('Error from GET', error);
              });

        }
      }});
//  });
