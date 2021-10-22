var table = $("#dataTable").DataTable({
  processing: true,
  language: {
    loadingRecords: "&nbsp;",
    processing: '<div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div>'
  }
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    currentUser = firebase.auth().currentUser;

    // Get Project Details:
    var usersRef = firebase.database().ref("Users");
    usersRef.once("value", snapshot => {
        snapshot.forEach(child => {
          table.row.add($(
            "<tr>" +
            "<td>" +
            child.key +
            "</td>" +
            "<td>" +
            child.val().username +
            "</td>" +
            "<td>" +
            child.val().email +
            "</td>" +
            "<td>" +
            child.val().fname +
            "</td>" +
            "<td>" +
            child.val().lname +
            "</td>" +
            "<td>" +
            child.val().phone +
            "</td>" +
            "<td>" +
            child.val().creation_date +
            "</td>" +
            '<td><a href="user.html?' +
            child.key +
            '">Edit</a></td>' +
            "</tr>"
          )).draw(false);
        });
      })
      .then(success => {
        console.log("Data has been Loaded!");
        $("#spinner").remove();
      });
  }
});