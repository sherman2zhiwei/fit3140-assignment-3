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


//beaglebone sensor setup
var led = "P8_13";
b.pinMode('P8_19', b.INPUT);
setInterval(checkPIR, 1000); // Checks the Sensor Every 1 Seconds


var current_motion = false;
var motion_start_time = 0;
var motion_end_time;
var d = new Date();

function checkPIR(){
	b.digitalRead('P8_19', motion_processing);
}

function motion_processing(x){
	var data = x.value

	//no motion now 
	if (data == 1){
		//if there was motion before this but there is no motion now, we push the previously recorded date when this motion started and the end time
		if (current_motion){
			motion_end_time = d.getTime(); 

			//after that, we reset the current_motion boolean
			current_motion = false;
		} 

		//if there was no motion before this and there is no motion now, we don't do anything
	}

	//motion detected
	else {

		//if there is motion now but no motion before, we initialize the start time and change current motion to be true
		if (!current_motion){
			motion_start_time = d.getTime();
			current_motion = true;
		}

		//if there was motion before and motion is detected now, we ignore it.

	}


}
