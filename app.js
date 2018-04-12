var b = require('bonescript');


//beaglebone sensor setup
var led = "P8_13";
b.pinMode('P8_19', b.INPUT);
setInterval(checkPIR, 1000); // Checks the Sensor Every 2.5 Seconds


function checkPIR(){
	b.digitalRead('P8_19', input);
}