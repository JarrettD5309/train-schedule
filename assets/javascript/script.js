// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDMzGY5EYrp70hJfi-_mg_nQvEHU4avs18",
  authDomain: "test-project-f0ef0.firebaseapp.com",
  databaseURL: "https://test-project-f0ef0.firebaseio.com",
  projectId: "test-project-f0ef0",
  storageBucket: "test-project-f0ef0.appspot.com",
  messagingSenderId: "691526510764",
  appId: "1:691526510764:web:45298f0751376ef02ad709"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var dbTrainName;
var dbTrainDestination;
var dbFirstTime;
var dbFrequency;
var dbKey;
var nextTrainString;
var minutesAway;

function inputObject() {
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirstTime = $("#first-time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrainObject = {
    trainID: trainName,
    destination: trainDestination,
    firstTime: trainFirstTime,
    frequency: trainFrequency
  }

  database.ref().push(newTrainObject);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
}

function trainTimeCalc() {
  // Current Time
  var currentHour = moment().format("HH");
  var currentMinute = moment().format("mm");
  var currentTimeMin = (parseInt(currentHour)*60)+parseInt(currentMinute);

  // test value for current time (11pm)
  // currentTimeMin = 1380;

  // turns dbFirstTime string into number of mins
  var firstTimeHour = dbFirstTime.substr(0,2);
  var firstTimeMinute = dbFirstTime.substr(3,2);
  var firstTimeMin = (parseInt(firstTimeHour)*60)+parseInt(firstTimeMinute);

  // finds next train time in mins
  var nextTrainMin = firstTimeMin;
  while (currentTimeMin>nextTrainMin) {
    nextTrainMin = nextTrainMin + parseInt(dbFrequency);
  }

  var nextTrainHour = parseInt(nextTrainMin/60);

  // fixes minutes with only one digit
  if ((nextTrainMin%60).toString().length===2) {
    var nextTrainMinute = nextTrainMin%60;
  } else if ((nextTrainMin%60).toString().length===1) {
    var nextTrainMinute = "0"+ nextTrainMin%60;
  }

  minutesAway = nextTrainMin-currentTimeMin;

  // fixes someone looking up at a late current time ie gives start time for tomorrow
  if (nextTrainHour>=24) {
    nextTrainString = amPm(dbFirstTime);
    minutesAway = firstTimeMin + (1440-currentTimeMin)
  } else if (nextTrainHour<24) {
    nextTrainString = amPm(nextTrainHour + ":" + nextTrainMinute);
  }

}

function amPm(mltTime) {
  var hour = parseInt(mltTime.substr(0,2));
  var min = mltTime.substr(3,2);

  if (hour>12) {
    var newHour = hour-12;
    var timeString = newHour + ":" + min + " PM";
  } else {
    timeString = hour + ":" + min + " AM";
  }
  return(timeString);
}

function addTableRow() {
  var newRow = $("<tr>").attr("id",dbKey);
  var newNameTd = $("<td>").text(dbTrainName);
  newRow.append(newNameTd);
  var newDestinationTd = $("<td>").text(dbTrainDestination);
  newRow.append(newDestinationTd);
  var newFrequencyTd = $("<td>").text(dbFrequency);
  newRow.append(newFrequencyTd);
  var newNextArriveTd = $("<td>").text(nextTrainString);
  newRow.append(newNextArriveTd);
  var newMinsAwayTd = $("<td>").text(minutesAway);
  newRow.append(newMinsAwayTd);
  var newRemoveTd = $("<td>").append($("<button>").addClass("remove-button btn-floating btn-small red darken-1").attr("data-key",dbKey).append($("<i>").addClass("material-icons").text("block")));
  newRow.append(newRemoveTd);
  $("#table-rows").prepend(newRow);
}


$("#submit-button").on("click", function() {
  event.preventDefault();
  
  if ($("#first-time-input").val().trim().length===5) {
    inputObject();
  } else {
    alert("Please enter time in correct format HH:mm");
  }

});

database.ref().on("child_added", function(childSnapshot) {

  dbTrainName = childSnapshot.val().trainID;
  dbTrainDestination = childSnapshot.val().destination;
  dbFirstTime = childSnapshot.val().firstTime;
  dbFrequency = childSnapshot.val().frequency;
  dbKey = childSnapshot.key;
  

  trainTimeCalc();

  addTableRow();
});

$(document).on("click",".remove-button", function() {
  var trID = $(this).attr("data-key");
  database.ref(trID).remove();
  $("#"+trID).remove();
});