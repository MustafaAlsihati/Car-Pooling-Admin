var uids = [];
var currentUser;
var table = $("#dataTable").DataTable({});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    currentUser = firebase.auth().currentUser;

    // Get Admin IDs:
    var idsRef = firebase.database().ref("Admin");
    idsRef.once("value", snapshot => {
      snapshot.forEach(child => {
        uids.push(child.key);
      });
    }).then(success => {
      // Get Admin Details:
      var detailsRef = firebase.database().ref("Users");
      detailsRef.once("value", snapshot => {
        snapshot.forEach(child => {
          if (uids.includes(child.key)) {
            table.row.add($(
              "<tr>" +
              "<td>" + child.key + "</td>" +
              "<td>" + child.val().username + "</td>" +
              "<td>" + child.val().email + "</td>" +
              '<td><a href="" onclick="removeAdmin(\'' + child.key + "')\">Remove Admin</a></td>" +
              "</tr>"
            )).draw(false);
          }
        });
      }).then(success => {
        console.log("Data has been Loaded!");
        $("#spinner").remove();
      });
    });

  }

});

function removeAdmin(uid) {
  if (uid != currentUser.uid) {
    var conf = confirm("Are you sure you want to delete Admin?\nUser will not be deleted, only remove administration.");
    if (conf == true) {
      var removeAdminRef = firebase.database().ref("Admin/" + uid);
      removeAdminRef.remove()
        .then(function () {
          alert("User administration removed.");
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage + "\n" + errorCode);
        });
    }
  } else {
    alert('You Cannot Remove yourself from administration role.');
    return;
  }
}