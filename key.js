//TRAINING VARIABLES
var totalstart_time;
var totalend_time;
var spacestart_time;
var spaceend_time;
var keystart_time;
var keyend_time;
var trained = false;
var trainingText;
var trainingCount = 5;
var currCount = 0;
var totalArray = Array();
var spaceArray = Array();
var keyArray = Array();
var avgTotalTime;
var avgSpaceTime;
var avgKeyTime;

//AUTHENTICATION VARIABLES
var authtotalstart_time;
var authtotalend_time;
var authspacestart_time;
var authspaceend_time;
var authkeystart_time;
var authkeyend_time;
var authenticated = false;
var authCount = 2;
var authcurrCount = 0;
var authtotalArray = Array();
var authspaceArray = Array();
var authkeyArray = Array();
var authavgTotalTime;
var authavgSpaceTime;
var authavgKeyTime;
var failureCount = 0;
var maxTry = 5;
var totalThreshold = 20;
var spaceThreshold = 10;
var keyThreshold = 10;

//////////////////////////////////////////////////////* BEGIN TRAINING PHASE FUNCTIONS */////////////////////////////////////////////////////////////////

//Get Average Time
function avgTotal(){
	var sum = 0;

	for(var i = 0; i < totalArray.length; i++){
		sum += parseInt(totalArray[i], 10);
	}

	avgTotalTime = sum/totalArray.length;
}

//Get Average Space Time
function avgSpace(){
	var sum = 0;

	for(var i = 0; i < spaceArray.length; i++){
		sum += parseInt(spaceArray[i], 10);
	}

	avgSpaceTime = sum/spaceArray.length;
}

//Get Average Key Time
function avgKey(){
	var sum = 0;

	for(var i = 0; i < keyArray.length; i++){
		sum += parseInt(keyArray[i], 10);
	}

	avgKeyTime = sum/keyArray.length;
}

//Total Timers
function totalStart() {
	totalstart_time = new Date();
}

function totalEnd() {
	var now = new Date();
	totalend_time = now-totalstart_time;
	console.log("Total Typing Time: " + totalend_time);
}

//Spacebar Timers
function spaceStart() {
	spacestart_time = new Date();
}

function spaceEnd() {
	var now = new Date();
	spaceend_time = now-spacestart_time;
	console.log("Spacebar Time: " + spaceend_time);
}

//Keypress Timers
function keyStart() {
	keystart_time = new Date();
}

function keyEnd() {
	var now = new Date();
	keyend_time = now-keystart_time;
	console.log("Keypress Time: " + keyend_time);
}

//Get Training Text
function getTrainingText(){
	trainingText = $("#trainText").html();
}

//Training Start Function
function startTraining(){
	if(trained == false){
		$("#trainStartBtn").click(function(){
			$("#userInput").removeAttr('disabled');
			getTrainingText();
			$("#userInput").focus();
		});
	}
}

//Enable Menus
function enableMenus(){
	if(trained == true){
		$("#authMenu").removeClass("disabled");
		$("#statsMenu").removeClass("disabled");
		$("#trainMenu").addClass("disabled");
		$("#trainEndBtn").attr('disabled','disabled');
	}
}

//Update Progress Bar
function progUpdate(count){
	if(count < trainingCount){
		$("#progBar").attr("style", "width:" +  ((count/trainingCount)*100) + "%;");
		$("#progText").html(count + "/" +  trainingCount + " Completed");
	}else if(count == trainingCount){
		$("#progBar").attr("style", "width:" +  ((count/trainingCount)*100) + "%;");
		$("#progText").html("Training Completed");
		trained = true;
		enableMenus();
		$("#userInput").attr('disabled','disabled');
		avgTotal();
		avgKey();
		avgSpace();
	}
}

//Key Pressed Down
$("#userInput").keydown(function(){
	if(trained == false){
		totalStart();
		keyStart();
		spaceStart();
	}
});

//Key Pressed Up
$("#userInput").keyup(function(event){
	if(trained == false){
		if(trainingText.indexOf($("#userInput").val()) > -1){
			keyEnd();
			keyArray.push(keyend_time);

			if(event.which == 32){
				spaceEnd();
				spaceArray.push(spaceend_time);
			}
		}

		if($("#userInput").val() ==	trainingText){
			$("#userInputError").removeClass("has-error");
			$("#userInputError").addClass("has-success");
			totalEnd();
			totalArray.push(totalend_time);
			currCount+=1;
			progUpdate(currCount);
			$("#userInput").val("");
		}else{
			$("#userInputError").removeClass("has-success");
			$("#userInputError").addClass("has-error");
		}
	}
});

//////////////////////////////////////////////////////* BEGIN AUTHENTICATION PHASE FUNCTIONS */////////////////////////////////////////////////////////////////

//Get Average Time
function authavgTotal(){
	var sum = 0;

	for(var i = 0; i < authtotalArray.length; i++){
		sum += parseInt(authtotalArray[i], 10);
	}

	authavgTotalTime = sum/authtotalArray.length;
}

//Get Average Space Time
function authavgSpace(){
	var sum = 0;

	for(var i = 0; i < authspaceArray.length; i++){
		sum += parseInt(authspaceArray[i], 10);
	}

	authavgSpaceTime = sum/authspaceArray.length;
}

//Get Average Key Time
function authavgKey(){
	var sum = 0;

	for(var i = 0; i < authkeyArray.length; i++){
		sum += parseInt(authkeyArray[i], 10);
	}

	authavgKeyTime = sum/authkeyArray.length;
}

//Total Timers
function authtotalStart() {
	authtotalstart_time = new Date();
}

function authtotalEnd() {
	var now = new Date();
	authtotalend_time = now-authtotalstart_time;
	console.log("Total authTyping Time: " + authtotalend_time);
}

//Spacebar Timers
function authspaceStart() {
	authspacestart_time = new Date();
}

function authspaceEnd() {
	var now = new Date();
	authspaceend_time = now-authspacestart_time;
	console.log("authSpacebar Time: " + authspaceend_time);
}

//Keypress Timers
function authkeyStart() {
	authkeystart_time = new Date();
}

function authkeyEnd() {
	var now = new Date();
	authkeyend_time = now-authkeystart_time;
	console.log("authKeypress Time: " + authkeyend_time);
}

//Authentication Start Function
function startAuthentication(){
	if(trained == true){
		$("#trainStartBtn").click(function(){
			authenticated = false;
			authcurrCount = 0;
			authtotalArray = [];
			authkeyArray = [];
			authspaceArray = [];

			$("#trainEndBtn").removeAttr("disabled");
			$("#trainStartBtn").removeAttr("disabled");
			$("#progBar").attr("style", "width: 0%;");
			$("#progText").html("0/2 Completed");
			$("#userInput").removeAttr('disabled');
			getTrainingText();
			$("#userInput").focus();
		});
	}
}

//Update Progress Bar
function authprogUpdate(count){
	if(count < authCount){
		$("#progBar").attr("style", "width:" +  ((count/authCount)*100) + "%;");
		$("#progText").html(count + "/"+ authCount +" Completed");
	}else if(count == authCount){
		$("#progBar").attr("style", "width:" +  ((count/authCount)*100) + "%;");
		$("#progText").html("Authentication Completed");
		authenticated = true;
		$("#userInput").attr('disabled','disabled');
		authavgTotal();
		authavgKey();
		authavgSpace();
		authenticateHere();
	}
}

//End Authentication
function authenticateHere(){
	if(Math.abs(avgTotalTime - authavgTotalTime) <= totalThreshold && Math.abs(avgSpaceTime - authavgSpaceTime) <= spaceThreshold && Math.abs(avgKeyTime - authavgKeyTime) <= keyThreshold){
		$("#trainEndBtn").html("You Have Been Authenticated");
		$("#trainEndBtn").removeClass("btn-danger");
		$("#trainEndBtn").addClass("btn-success");
		authenticated = true;
	}else{
		failureCount += 1;
		totalThreshold += 5;
		spaceThreshold +=5;
		keyThreshold += 5;
		alert("Difficulty Level Decreased. Try Again.");
		if(failureCount == maxTry){
			$("#trainEndBtn").html("Maximum Trials Reached.");	
		}else{
			$("#trainEndBtn").html("Authentication Failed.");
		}
		$("#trainEndBtn").removeClass("btn-success");
		$("#trainEndBtn").addClass("btn-danger");
		startAuthentication();
	}
}

//Key Pressed Down
$("#userInput").keydown(function(){
	if(trained == true && authenticated == false){
		authtotalStart();
		authkeyStart();
		authspaceStart();
	}
});

//Key Pressed Up
$("#userInput").keyup(function(event){
	if(trained == true && authenticated == false){
		if(trainingText.indexOf($("#userInput").val()) > -1){
			authkeyEnd();
			if(!isNaN(authkeyend_time)){
				authkeyArray.push(authkeyend_time);
			}

			if(event.which == 32){
				authspaceEnd();
				authspaceArray.push(authspaceend_time);
			}
		}

		if($("#userInput").val() ==	trainingText){
			$("#userInputError").removeClass("has-error");
			$("#userInputError").addClass("has-success");
			authtotalEnd();
			authtotalArray.push(authtotalend_time);
			authcurrCount+=1;
			authprogUpdate(authcurrCount);
			$("#userInput").val("");
		}else{
			$("#userInputError").removeClass("has-success");
			$("#userInputError").addClass("has-error");
		}
	}
});

/////////////////////////////////////////////////////////////* BEGIN MENU FUNCTIONS *//////////////////////////////////////////////////////////////////////////

//Training Menu Click
$( "#trainMenu" ).click(function() {
	if(trained == false){
		$("#authMenu").removeClass( "active");
		$("#statsMenu").removeClass( "active");
		$("#trainMenu").attr( "class","active");
		$("#startStopBtn").show();
		$("#helpHeader").html("<u>Training Phase</u>");
		$("#helpText").html("This is the training phase for the typing signature based authentication system. <br> It requires the user to type out a simple sentence 10 times to generate a typing signature for the user. <br> Once complete, the user can move on to the Authentication Phase.");
	}
});

//Authentication Menu Click
$( "#authMenu" ).click(function() {
	if(trained == true){
		$("#startStopBtn").show();
		$("#trainStartBtn").html("Begin Authentication");
		$("#trainEndBtn").html("Not Authenticated");
		$("#trainMenu").removeClass( "active");
		$("#statsMenu").removeClass( "active");
		$("#authMenu").attr( "class","active");
		$("#helpHeader").html("<u>Authentication Phase</u>");
		$("#helpText").html("This is the authentication phase for the typing signature based authentication system. It requires the user to type out a simple sentence 2 times to authenticate himself based on his previously trained typing signature. If his typing matches his signature, then he is authenticated.");
		startAuthentication();
	}
});

//Statistics Menu Click
$( "#statsMenu" ).click(function() {
	if(trained == true && authenticated == true){
		$("#startStopBtn").hide();
		$("#trainMenu").removeClass( "active");
		$("#authMenu").removeClass( "active");
		$("#statsMenu").attr( "class","active");
		$("#helpHeader").html("<u>Statistics</u>");
		$("#helpText").html("This is the statistics display for the typing signature based authentication system.<br>" + 
			"<br> Average Time For Sentence: <b>" + avgTotalTime + "</b>" + 
			"<br> Average Keypress Time For Sentence: <b>" + avgKeyTime.toFixed(2) + "</b>" + 
			"<br> Average Time Between Words: <b>" + avgSpaceTime.toFixed(2) + "</b>" + 
			"<hr><br>"+
			"<br> Avg. Authentication Time For Sentence: <b>" + authavgTotalTime.toFixed(2) + "</b>" + 
			"<br> Avg. Authentication Keypress Time For Sentence: <b>" + authavgKeyTime + "</b>" + 
			"<br> Avg. Authentication Time Between Words: <b>" + authavgSpaceTime.toFixed(2) + "</b>" +
			"<br> Authentication Failed: <b>" + failureCount + " times </b>"
			);
	}
});

/////////////////////////////////////////////////////////////* BEGIN INITIALIZATION FUNCTIONS *//////////////////////////////////////////////////////////////////////////

//Page Initialization
$(document).ready(function(){

//Initialize Progress Bar
$("#progBar").attr("style", "width: 0%;");
$("#progText").html("0/10 Completed");

//Disable Menu Items
if(trained == false){
	$("#authMenu").attr("class", "disabled");
	$("#statsMenu").attr("class", "disabled");
}else{
	$("#authMenu").removeClass("disabled");
	$("#statsMenu").removeClass("disabled");
}
$("#userInput").attr('disabled','disabled');

//Start Training
startTraining();

});