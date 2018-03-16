$(document).ready(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCAdaVkWfHC77QjlSvoN7gMcIy-S9Pgum0",
        authDomain: "train-scheduler-5f8f7.firebaseapp.com",
        databaseURL: "https://train-scheduler-5f8f7.firebaseio.com",
        projectId: "train-scheduler-5f8f7",
        storageBucket: "",
        messagingSenderId: "403675143547"
    };
    firebase.initializeApp(config);
    //Reference database
    database = firebase.database();

    //console.log(database);

    var trainName = '';
    var dest = '';
    var firstTrainTime = '';
    var freq = '';


    //Conversion Variable
    var firstTimeConverted = '';
    var diffTime = '';
    var tRemainder;
    var tMinutesTillTrain;
    var nextTrain;

    //Data reference
    var trainnameData = '';
    var destData = '';
    var arrivaldata = '';
    var freqdata = '';
    var miniutesAwayData = '';

    $('#submit').on('click', function (event) {
        event.preventDefault();

        trainName = $('#trainName').val().trim
        dest = $('#dest').val().trim();
        firstTrainTime = $('#firstTrainTime').val().trim;
        freq = $('#freq').val().trim();

        //Removed input info
        $('#trainName').val('');
        $('#dest').val('');
        $('#firstTrainTime').val();
        $('#freq').val();


        //Conversion to HH:MM
        firstTimeConverted = moment(firstTrainTime, "hh.mm").subtract(1, "years");

        var currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");

 //Time apart(remainder)
 tRemainder = diffTime % freq;

        //Minute Until Train
        tMinutesTillTrain = freq - tRemainder;

        // Next Train
        nextTrain = moment().add(tMinutesTillTrain, "minutes");
        nextTrainFormat = moment(nextTrain).format('hh:mm');

        database.ref('/trainSchedule').push({
            trainName: trainName,
            destination: dest,
            arrival: nextTrainFormat,
            minutesAway: tMinutesTillTrain,
            frequency: freq


        });

        database.ref('/trainSchedule').on('child_added', function (snap) {
            trainNameData = snap.val().trainName;
            destData = snap.val().destination;
            arrivalData = snap.val().arrival;
            freqData = snap.val().frequency;
            minutesAwayData = snap.val().minutesAway;
        })
        //Data array
        var dataArray = [trainNameData, destData, freqData, arrivalData, minutesAwayData];
        var newTr = $('<tr>');
        for (var i = 0; i < dataArray.lengtgh; i++) {
            newTd.text(dataArray[i]);
            newTd.appendTo(newTr);
        }
        $('.table').append(newTr);




    });
});