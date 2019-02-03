// Initialize Firebase
var config = {
  apiKey: "AIzaSyAYzU3Dyeoot_E370WeExzzBdl_VC_8-pQ",
  authDomain: "class-project-f17f2.firebaseapp.com",
  databaseURL: "https://class-project-f17f2.firebaseio.com",
  projectId: "class-project-f17f2",
  storageBucket: "class-project-f17f2.appspot.com",
  messagingSenderId: "536115679709"
};

firebase.initializeApp(config);

var database = firebase.database();

$('#submitButton').on('click', function(event){
    event.preventDefault();
    console.log('clicked');
    var trainName = $('#trainName').val();
    var destination = $('#destination').val();
    var firstTime = $('#firstTime').val();
    var frequency = $('#frequency').val();

    var newTrain = {
        name: trainName,
        dest: destination,
        time: firstTime,
        freq: frequency
    }
    database.ref().push(newTrain);

    console.log('new train added')

    $('#trainName').val('');
    $('#destination').val('');
    $('#firstTime').val('');
    $('#frequency').val('');

})


database.ref().on('child_added', function(childSnapshot){

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;

    var minutesAway = 0;

    var curr = new moment().format('hh:mm a');
       console.log('now ' + curr);

    var mFirstTime = new moment(firstTime, 'hh:mm a');
        console.log('First time ' + moment(mFirstTime).format('hh:mm a'))

    var diff = moment().diff(moment(firstTime, 'hh:mm'), 'minutes');
        console.log('diff ' + diff)

    var mins = diff / frequency;
    var iMins = parseInt(mins) + 1;
    var timeToNext = iMins * frequency;
        console.log('time to next: ' + timeToNext);

    var mNextTime = mFirstTime.add(timeToNext, 'minutes')
       console.log('next: ' + moment(mNextTime).format('hh:mm'));
    var timeTill = moment().diff(moment(mNextTime, 'hh:mm'), 'minutes');
    var intTill = Math.abs(timeTill);
       console.log('time till: ' + intTill);

    var newRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(destination),
        $('<td>').text(frequency),
        $('<td>').text(moment(mNextTime).format('hh:mm a')),
        $('<td>').text(intTill)
    )

    $('#trainTable').append(newRow);


})

// console.log(moment().format('hh:mm'));