var user;
var uid;

// Remove email from admin table

function isEmpty(str) {
  return !str || 0 === str.length;
}

function toggleSignIn() {
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  if (isEmpty(email)) {
    alert("Please enter an email address.");
    return;
  }
  if (password.length < 6) {
    alert("Please enter a valid password.");
    return;
  }

  var getUserIdRef = firebase.database().ref("Users").orderByChild("email").equalTo(email);
  getUserIdRef.once('value', snapshot => {
    if (snapshot.exists()) {
      snapshot.forEach(child => {
        console.log("request uid = " + child.key);
        uid = child.key;
      });
    } else {
      alert('User does not exist.');
      return;
    }
  }).then(success => {
    console.log("Now Check if user is Admin");

    //Check if Admin:
    var checkIfAdminRef = firebase.database().ref("Admin/" + uid);
    checkIfAdminRef.once("value", snapshot => {
      if (snapshot.exists()) {
        console.log("This Admin Exists");
        signIn(email, password);
      } else {
        alert("This user is not authorized.");
        console.log("This User is not authorized.");
        return;
      }
    });
  });
}

function signIn(email, password) {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function () {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(function (firebaseUser) {
      console.log("Success");
      window.location.replace("index.html");
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong Password");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}