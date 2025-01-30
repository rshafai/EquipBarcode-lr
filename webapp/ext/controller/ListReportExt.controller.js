sap.ui.define([
    "sap/m/MessageToast",
    "sap/ndc/BarcodeScanner"
], function(MessageToast, BarcodeScanner) {
    'use strict';

    return {
        scanMe: function(oEvent) {
            MessageToast.show("Custom handler invoked.");

            BarcodeScanner.scan(
              function (mResult) {
                alert("We got a barcode\n" +
                   "Result: " + mResult.text + "\n" +
                   "Format: " + mResult.format + "\n" +
                   "Cancelled: " + mResult.cancelled);
              },
              function (Error) {
                alert("Scanning failed: " + Error);
              },
              function (mParams) {
                //alert("Value entered: " + mParams.newValue);
              },
              "Scan or Enter a Barcode",  //title
              true,                       //preferFrontCamera
              30,                         //frameRate
              1,                          //zoom
              false,                      //keepCameraScan
              false                       //disableBarcodeInputDialog
              );
            },
        createScan: function(oEvent) {
          MessageToast.show("Custom handler invoked.");
        }
    };
});