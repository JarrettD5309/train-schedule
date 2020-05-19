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



$("#submit-button").on("click", function() {
  event.preventDefault();

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

  console.log(newTrainObject);

  database.ref().push(newTrainObject);

  

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

  var dbTrainName = childSnapshot.val().trainID;
  var dbTrainDestination = childSnapshot.val().destination;
  var dbfirstTime = childSnapshot.val().firstTime;
  var dbFrequency = childSnapshot.val().frequency;

  var newRow = $("<tr>");
  var newNameTd = $("<td>").text(dbTrainName);
  newRow.append(newNameTd);
  var newDestinationTd = $("<td>").text(dbTrainDestination);
  newRow.append(newDestinationTd);
  var newFrequencyTd = $("<td>").text(dbFrequency);
  newRow.append(newFrequencyTd);
  var newNextArriveTd = $("<td>").text("test 1");
  newRow.append(newNextArriveTd);
  var newMinsAwayTd = $("<td>").text("test 2");
  newRow.append(newMinsAwayTd);

  $("#table-rows").append(newRow);

});