const DeleteUser = firebase.functions().httpsCallable('DeleteUser');
var uid = window.location.search.substr(1);
var userNameInput = document.getElementById("userNameInput");
var emailInput = document.getElementById("inputEmail");
var fnameInput = document.getElementById("inputFname");
var lnameInput = document.getElementById("inputLname");
var phoneInput = document.getElementById("inputPhone");
var dateInput = document.getElementById("inputDate");
var carDetailInput = document.getElementById("inputCar");
var no_of_seatsInput = document.getElementById("inputSeats");
var smokerInput = document.getElementById("checkSmoker");

document.addEventListener("DOMContentLoaded", function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById("inputID").value = uid;

      // Get User Details:
      var userRef = firebase.database().ref("Users/" + uid);
      userRef.once("value", snapshot => {
          userNameInput.value = snapshot.val().username;
          emailInput.value = snapshot.val().email;
          fnameInput.value = snapshot.val().fname;
          lnameInput.value = snapshot.val().lname;
          phoneInput.value = snapshot.val().phone;
          dateInput.value = snapshot.val().creation_date;
          carDetailInput.value = snapshot.val().car;
          no_of_seatsInput.value = snapshot.val().no_of_seats;
          if (snapshot.val().smoker == "true") {
            smokerInput.checked = true;
          } else {
            smokerInput.checked = false;
          }
        })
        .then(success => {
          console.log("User data Loaded");
          $("#content").show();
        });
    }
  });
});

function saveEdit() {
  if (userNameInput.value == "") {
    alert("Username field is empty");
    return;
  }
  if (fnameInput.value == "") {
    alert("First Name field is empty");
    return;
  }
  if (lnameInput.value == "") {
    alert("Last Name field is empty");
    return;
  }
  if (phoneInput.value == "") {
    alert("Phone Number field is empty");
    return;
  }
  if (carDetailInput.value == "") {
    alert("Car Details field is empty");
    return;
  }
  if (no_of_seatsInput.value == "") {
    alert("Number of car seats field is empty");
    return;
  }
  if (no_of_seatsInput.value > 6) {
    alert("Maximum number of car seats is 6");
    return;
  } else if (no_of_seatsInput.value < 1) {
    alert("Minimum number of car seats is 1");
    return;
  }

  var profileUpdate = firebase.database().ref("Users/" + uid);
  profileUpdate.update({
      username: userNameInput.value,
      fname: fnameInput.value,
      lname: lnameInput.value,
      phone: phoneInput.value,
      car: carDetailInput.value,
      no_of_seats: no_of_seatsInput.value,
      smoker: String(smokerInput.checked)
    })
    .then(function () {
      alert("Profile Updated");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + "\n" + errorCode);
    });
}

function deleteUser() {
  var deleteUserRef = firebase.database().ref("Users/" + uid);
  deleteUserRef.remove().then(function () {
      DeleteUser({
        uid: uid
      }).then(result => {
        console.log('user deleted');
        window.location.replace("/userslist.html");
      });
    })
    .catch(function (error) {
      console.log('first function error');
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + "\n" + errorCode);
    });
}