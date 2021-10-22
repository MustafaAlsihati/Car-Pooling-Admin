const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Delete User Function:
exports.DeleteUser = functions.https.onCall((data, context) => {
  return admin.auth().deleteUser(data.uid)
    .catch(function (error) {
      console.log('Error deleting user:', error);
    });
});