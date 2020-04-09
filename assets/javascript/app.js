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


    $("button").on("click", function () {

		event.preventDefault();

        var name = $("#trainName").val();
        var destination = $("#destination").val();
        var userTime = $("#trainTime").val();
        var minutes = $("#minutes").val();

        database.ref().push({
            tName: name,
            tDestination: destination,
            initialT: userTime,
            frequency: minutes
        });

        database.ref().on("child_added", function (snapshot) {
            var companyName = snapshot.val().tName;
            var dest = snapshot.val().tDestination;
            var trainOne = snapshot.val().initialT;
            var freqMin = snapshot.val().frequency;

            var dateBegin = moment(trainOne, 'hh:mm A');
            var dateNow = moment();



            var newRow = $("<tbody>").append($("<tr>").append(
                $("<td>").text(companyName),
                $("<td>").text(dest),
                $("<td>").text(freqMin),
                $("<td>").text(nextArrival),
                $("<td>").text(minAway)
            ));
            $("#schd").append(newRow);
            moment(dateBegin).diff(moment(dateNow))
        });
    });

});