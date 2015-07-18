var start_time;
var end_time;
var trained = false;

function start() {
	start_time = new Date();
}
function end() {
	var now = new Date();
	end_time = now-start_time;
}

function getTrainingText(){

}

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
	$("#startStopBtn").hide();
	$("#trainMenu").removeClass( "active");
	$("#statsMenu").removeClass( "active");
	$("#authMenu").attr( "class","active");
	$("#helpHeader").html("<u>Authentication Phase</u>");
	$("#helpText").html("This is the authentication phase for the typing signature based authentication system. It requires the user to type out a simple sentence 2 times to authenticate himself based on his previously trained typing signature. If his typing matches his signature, then he is authenticated.");
});

//Statistics Menu Click
$( "#statsMenu" ).click(function() {
	$("#startStopBtn").hide();
	$("#trainMenu").removeClass( "active");
	$("#authMenu").removeClass( "active");
	$("#statsMenu").attr( "class","active");
	$("#helpHeader").html("<u>Statistics</u>");
	$("#helpText").html("This is the statistics display for the typing signature based authentication system.");
});

$(document).ready(function(){
$("#progBar").attr("style", "width: 0%;");
$("#progText").html("0/10 Completed");

if(trained == false){
	$("#authMenu").attr("class", "disabled");
	$("#statsMenu").attr("class", "disabled");
}else{
	$("#authMenu").removeClass("disabled");
	$("#statsMenu").removeClass("disabled");
}
});