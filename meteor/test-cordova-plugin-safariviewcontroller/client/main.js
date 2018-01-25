Template.btn.events({

  'click button'(event, instance) {
    cordova.plugins.barcodeScanner.scan(
      result => {
        alert(JSON.stringify(result, null, 2))
      },

      error => {
        alert(JSON.stringify(error, null, 2))
      },

      {
        showFlipCameraButton: true, // iOS and Android
        showTorchButton: true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt: 'Place a barcode inside the scan area', // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
        orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations: true, // iOS
        disableSuccessBeep: false // iOS and Android
      }
   )
  },

})
