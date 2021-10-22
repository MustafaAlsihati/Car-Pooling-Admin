var table =  $('#dataTable').DataTable({
    'processing': true,
    'language': {
        'loadingRecords': '&nbsp;',
        'processing': '<div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div>'
    }   
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = firebase.auth().currentUser;

        // Get Project Details:
        var projectRef = firebase.database().ref('Trips');
        projectRef.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                table.row.add($(
                    '<tr>'+
                        '<td>'+ child.key +'</td>' +
                        '<td>'+ child.val().captainid +'</td>'+
                        '<td>'+ child.val().date +'</td>'+
                        '<td>'+ child.val().availability +'</td>'+
                        '<td>'+ child.val().status +'</td>'+
                        '<td>'+ child.val().addressFrom +'</td>'+
                        '<td>'+ child.val().addressTo +'</td>'+
                        '<td><a href="pool.html?'+ child.key +'">View Details</a></td>'+
                    '</tr>'
                )).draw(false);
            });
        }).then(success => {
            console.log("Data has been Loaded!");
            $("#spinner").remove();
        });
    }
});