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
    $('#frequeny').val('');

})

