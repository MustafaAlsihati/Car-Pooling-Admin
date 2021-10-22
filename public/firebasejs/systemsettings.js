var uidInput = document.getElementById("inputId");
var btn = document.getElementById("makeAdminBtn");
var getEmail;
var getUserName;
var err = 'Reference.child failed: First argument was an invalid path = "Users/aglpd3d@gmail.com". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"';

function makeAdmin() {
  if (uidInput.value == "") {
    alert("User ID field is empty.");
    return;
  }

  uidInput.disabled = true;
  btn.innerHTML = 'Wait';
  // Check if User Exists:
  checkIfUserExists();
}

function checkIfUserExists() {
  try {
    firebase.database().ref("Users/" + uidInput.value).once("value", function (snapshot) {
      if (snapshot.exists()) {
        // Get User Info:
        getInfo();
      } else {
        alert("User does not exist.");
        uidInput.disabled = false;
        btn.innerHTML = 'Add';
        return;
      }
    });
  } catch (error) {
    var errorMessage = error.message;
    if (errorMessage == err) {
      uidInput.disabled = false;
      btn.innerHTML = 'Add';
      alert("Please provide a valid uid key.");
    } else {
      uidInput.disabled = false;
      btn.innerHTML = 'Add';
      alert(errorMessage);
    }
  };
}

function getInfo() {
  // Get User Details:
  var userRef = firebase.database().ref("Users/" + uidInput.value);
  userRef
    .once("value", snapshot => {
      (getEmail = snapshot.val().email), (getUserName = snapshot.val().username);
    })
    .then(function () {
      console.log("Info Collected.");
      // Make User Admin:
      addAdmin();
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      uidInput.disabled = false;
      btn.innerHTML = 'Add';
      alert(errorMessage + "\n" + errorCode);
    });
}

function addAdmin() {
  var adminRef = firebase.database().ref("Admin/" + uidInput.value);
  adminRef
    .set({
      admin: true
    })
    .then(function () {
      alert("Admin Added.");
      uidInput.value = "";
      uidInput.disabled = false;
      btn.innerHTML = 'Add';
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + "\n" + errorCode);
      uidInput.disabled = false;
      btn.innerHTML = 'Add';
    });
}