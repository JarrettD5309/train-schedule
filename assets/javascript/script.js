// Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyDMzGY5EYrp70hJfi-_mg_nQvEHU4avs18",
//   authDomain: "test-project-f0ef0.firebaseapp.com",
//   databaseURL: "https://test-project-f0ef0.firebaseio.com",
//   projectId: "test-project-f0ef0",
//   storageBucket: "test-project-f0ef0.appspot.com",
//   messagingSenderId: "691526510764",
//   appId: "1:691526510764:web:45298f0751376ef02ad709"
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var database = firebase.database();

$("#submit-button").on("click", function() {
  event.preventDefault();

  console.log($("#train-name-input").val());

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirstTime = $("#first-time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  var newRow = $("<tr>");
  var newNameTd = $("<td>").text(trainName);
  newRow.append(newNameTd);
  var newDestinationTd = $("<td>").text(trainDestination);
  newRow.append(newDestinationTd);
  var newFrequencyTd = $("<td>").text(trainFrequency);
  newRow.append(newFrequencyTd);
  var newNextArriveTd = $("<td>").text("test 1");
  newRow.append(newNextArriveTd);
  var newMinsAwayTd = $("<td>").text("test 2");
  newRow.append(newMinsAwayTd);

  $("#table-rows").append(newRow);
})