import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Meteor.startup(function () {

var done = function(err, status){
  if(err){
    console.error(err._message);
  } else {
    console.log('QRScanner is initialized. Status:');
    console.log(status);
  }
};

QRScanner.prepare(done);

var callback = function(err, contents){
  if(err){
    console.error(err._message);
  }
  alert('The QR Code contains: ' + contents);
};

QRScanner.scan(callback);

QRScanner.show(function(status){
  console.log(status);
});

})
