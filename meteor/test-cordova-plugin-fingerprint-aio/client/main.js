Template.body.events({
  'click button'() {
    Fingerprint.isAvailable(result => {
      alert(result)
      authenticate()
    }, message => {
      alert(message)
    })
  }
})

function authenticate() {
  Fingerprint.show({
    clientId: "Fingerprint-Demo",
    clientSecret: "password",
  }, successCallback, errorCallback)
}

function successCallback(){
  alert("Authentication successfull")
}

function errorCallback(err){
  alert("Authentication invalid " + err)
}
