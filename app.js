$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAvYb-FjqLXf4LkqV4UVHCduyoU5hoPSCI",
    authDomain: "train-app-6a2f0.firebaseapp.com",
    databaseURL: "https://train-app-6a2f0.firebaseio.com",
    projectId: "train-app-6a2f0",
    storageBucket: "",
    messagingSenderId: "520646549993"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("button").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainNameField").val().trim();      //grabs user input
    var destination = $("#destinationField").val().trim();
    var firstTime = $("#firstTimeField").val().trim();
    var frequency = $("#frequencyField").val().trim();

    var trainInput = {
        train: trainName,
        destination: destination,
        first: firstTime,
        frequency: frequency,
    };

    database.ref().push(trainInput);

    console.log(trainInput.train);
    console.log(trainInput.destination);
    console.log(trainInput.first);
    console.log(trainInput.frequency);

    $("#trainNameField").val("");
    $("#destinationField").val("");
    $("#firstTimeField").val("");
    $("#frequencyField").val("");

}); //closes on click event

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().train;
        var destination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().first;
        var frequency = childSnapshot.val().frequency;

        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);

        // Do calculations for next arrival and minutes away here
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        var nextArrival = moment().add(minutesAway, "minutes");         // calculating the next arrival time
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

        var minutesAway = frequency - tRemainder;           // calculating how many minutes away the next arrival is
        console.log("MINUTES TILL TRAIN: " + minutesAway);      

        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway),
          );

          $("#trainSchedule > tbody").append(newRow);

        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);

    }); //closes on child added 
  


}); //closes document ready