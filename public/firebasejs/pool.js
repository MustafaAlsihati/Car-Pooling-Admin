var tid = window.location.search.substr(1);
var tidField = document.getElementById("tid");
var cidField = document.getElementById("cid");
var tripDateField = document.getElementById("tripDate");
var tripAvailabilityField = document.getElementById("tripAvailability");
var tripStatusField = document.getElementById("tripStatus");
var tripFromField = document.getElementById("tripFrom");
var tripToField = document.getElementById("tripTo");
var tripSeatsField = document.getElementById("tripSeats");
var tripGenderField = document.getElementById("tripGender");
var tripLatLngFromField = document.getElementById("tripLatLngFrom");
var tripLatLngToField = document.getElementById("tripLatLngTo");

document.addEventListener("DOMContentLoaded", function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      tidField.innerHTML = tid;

      // Get User Details:
      var userRef = firebase.database().ref("Trips/" + tid);
      userRef.once("value", snapshot => {
          cidField.innerHTML = snapshot.val().captainid,
            tripDateField.innerHTML = snapshot.val().date,
            tripAvailabilityField.innerHTML = snapshot.val().availability,
            tripStatusField.innerHTML = snapshot.val().status,
            tripLatLngFromField.innerHTML = '(' + snapshot.val().latFrom + ', ' + snapshot.val().lngFrom + ')';
          tripLatLngToField.innerHTML = '(' + snapshot.val().latTo + ', ' + snapshot.val().lngTo + ')';
          tripSeatsField.innerHTML = snapshot.val().no_of_seats,
            tripGenderField.innerHTML = snapshot.val().gender,
            tripFromField.innerHTML = snapshot.val().addressFrom,
            tripToField.innerHTML = snapshot.val().addressTo
        })
        .then(success => {
          console.log("User data Loaded");
          $("#tripContent").show();
        }).catch(function (error) {
          alert('Error Retrieving Data');
        });
    }
  });
});