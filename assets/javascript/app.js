$(document).ready(function () {

    // Web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC0WJ6SC1RUZuykRbDXwCvKzlPX37ftOAw",
        authDomain: "mcelis-f41a6.firebaseapp.com",
        databaseURL: "https://mcelis-f41a6.firebaseio.com",
        projectId: "mcelis-f41a6",
        storageBucket: "mcelis-f41a6.appspot.com",
        messagingSenderId: "972502596896",
        appId: "1:972502596896:web:231935d681f58efee6eb45",
        measurementId: "G-6CB769JM46"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var database = firebase.database();
     
    var name = "";
    var destination = "";
    var userTime = "";
    var minutes = "";

    //if (minutes === "" || userTime === "" || destination === "" || name === "" ){
    //    alert("Please fill out fields correctly.")
    //} else {

    $("button").on("click", function () {
        name = $("#trainName").val();
        destination = $("#destination").val();
        userTime = $("#trainTime").val();
        minutes = $("#minutes").val();    

        database.ref().push({
            tName: name,
            tDestination: destination,
            initialT: userTime,
            frequency: minutes,
        });
    });
//};
    database.ref().on("child_added", function (snapshot) {

        var companyName = snapshot.val().tName;
        var dest = snapshot.val().tDestination;
        var trainOne = snapshot.val().initialT;
        var freqMin = snapshot.val().frequency;

        var timeConverted = moment(trainOne, "HH:mm").subtract(1, "years");
        var difference = moment().diff(moment(timeConverted), "minutes");
        var remainder = difference % freqMin;
        var newTrain = freqMin - remainder;
        var nextArrival = moment().add(newTrain, "minutes");
        var myTrain = moment(nextArrival).format("hh:mm A");

        var newRow = $("<tbody>").append($("<tr>").append(
            $("<td>").text(companyName),
            $("<td>").text(dest),
            $("<td>").text(freqMin),
            $("<td>").text(myTrain),
            $("<td>").text(newTrain)
        ));
        $("#schd").append(newRow);
    });
});