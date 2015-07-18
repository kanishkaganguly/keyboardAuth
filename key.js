var totalstart_time;
var totalend_time;
var spacestart_time;
var spaceend_time;
var keystart_time;
var keyend_time;
var trained = false;
var trainingText;
var trainingCount = 10;
var currCount = 0;
var totalArray = Array();
var spaceArray = Array();
var keyArray = Array();


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
}

//Keypress Timers
function keyStart() {
	keystart_time = new Date();
}

function keyEnd() {
	var now = new Date();
	keyend_time = now-keystart_time;
}

//Get Training Text
function getTrainingText(){
	trainingText = $("#trainText").html();
}

//Training Start Function
function startTraining(){
	$("#trainStartBtn").click(function(){
		$("#userInput").removeAttr('disabled');
		getTrainingText();
		$("#userInput").focus();
	});
}

//Enable Menus
function enableMenus(){
	if(trained == true){
		$("#authMenu").removeClass("disabled");
		$("#statsMenu").removeClass("disabled");
	}
}

//Update Progress Bar
function progUpdate(count){
	if(count <= trainingCount){
		$("#progBar").attr("style", "width:" +  count*10 + "%;");
		$("#progText").html(count + "/10 Completed");
	}else if(count == trainingCount){
		trained = true;
		enableMenus();
		$("#userInput").attr('disabled','disabled');
		console.log(totalArray.toString());
	}
}

//Key Pressed Down
$("#userInput").keydown(function(){
	totalStart();
});

//Key Pressed Up
$("#userInput").keyup(function(){
	if($("#userInput").val() == trainingText){
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
});

//Training Menu Click
$( "#trainMenu" ).click(function() {
	$("#authMenu").removeClass( "active");
	$("#statsMenu").removeClass( "active");
	$("#trainMenu").attr( "class","active");
	$("#startStopBtn").show();
	$("#helpHeader").html("<u>Training Phase</u>");
	$("#helpText").html("This is the training phase for the typing signature based authentication system. <br> It requires the user to type out a simple sentence 10 times to generate a typing signature for the user. <br> Once complete, the user can move on to the Authentication Phase.");
});

//Authentication Menu Click
$( "#authMenu" ).click(function() {
	if(trained == true){
		$("#startStopBtn").hide();
		$("#trainMenu").removeClass( "active");
		$("#statsMenu").removeClass( "active");
		$("#authMenu").attr( "class","active");
		$("#helpHeader").html("<u>Authentication Phase</u>");
		$("#helpText").html("This is the authentication phase for the typing signature based authentication system. It requires the user to type out a simple sentence 2 times to authenticate himself based on his previously trained typing signature. If his typing matches his signature, then he is authenticated.");
	}
});

//Statistics Menu Click
$( "#statsMenu" ).click(function() {
	if(trained == true){
		$("#startStopBtn").hide();
		$("#trainMenu").removeClass( "active");
		$("#authMenu").removeClass( "active");
		$("#statsMenu").attr( "class","active");
		$("#helpHeader").html("<u>Statistics</u>");
		$("#helpText").html("This is the statistics display for the typing signature based authentication system.");
	}
});

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