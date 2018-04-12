var admin = require("firebase-admin");
// Fetch the service account key JSON file contents

var serviceAccount = require("./serviceAccountKey.json");
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://assignment-3-e5cfe.firebaseio.com"  
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/motionSensorData"); // channel name

ref.on("value", function(snapshot) {   //this callback will be invoked with each new object
  console.log(snapshot.val());         // How to retrive the new added object
}, function (errorObject) {             // if error
  console.log("The read failed: " + errorObject.code);
});

ref.set({
    timestamp: 12346789,
    motion_start_time: 789123,
    motion_end_time: 3455667
});

var b = require('bonescript');


// //beaglebone sensor setup
// var led = "P8_13";
// b.pinMode('P8_19', b.INPUT);
// setInterval(checkPIR, 1000); // Checks the Sensor Every 2.5 Seconds


// function checkPIR(){
// 	b.digitalRead('P8_19', input);
// }