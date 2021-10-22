var usersCount = document.getElementById('usersCount');
var tripsCount = document.getElementById('tripsCount');
var usersCountCard = document.getElementById('usersCountCard');
var tripsCountCard = document.getElementById('tripsCountCard');

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    currentUser = firebase.auth().currentUser;

    // Get Users Count:
    var usersRef = firebase.database().ref("Users");
    usersRef.once("value", snapshot => {
        const count = snapshot.numChildren();
        usersCount.innerHTML = count;
      })
      .then(success => {
        // usersCountCard.style.visibility = 'visible';
      });

    // Get Trips Count:
    var usersRef = firebase.database().ref("Trips");
    usersRef.once("value", snapshot => {
        const count = snapshot.numChildren();
        tripsCount.innerHTML = count;
      })
      .then(success => {
        // tripsCountCard.style.visibility = 'visible';
      });
  }
});