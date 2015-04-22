(function() {

    var socket = io();
    var username = $('#user-name').data('user-name');

    var resetProfileFormFields = function() {
        $('.input-email').val(null);
        $('.input-country').val(null);
        $('.input-phone').val(null);
    };

    var updateProfileDOM = function(userProfile) {
        $('#phone').text(userProfile.phone);
        $('#country').text(userProfile.country);
        $('#email').text(userProfile.email);
    };

    var asyncProfileUpdate = function(callback) {

        var payload = {
            email: $('.input-email').val(),
            country: $('.input-country').val(),
            phone: $('.input-phone').val()
        };

        $.post('/users/profile', payload )
            .success(function(data) {
                var userProfile = JSON.parse(data);
                callback(userProfile)
            })
    };

    var timoutSocketMessage = function() {
        setTimeout(function() {
            $(".update-container").text('');
        }, 5000);
    };

    var socketUpdateServerEvent = function() {
        socket.emit('update profile', username);
    };

    var handleUpdateProfileEvent = function() {
        $('.profile').on('submit', function(event) {
            event.preventDefault();
            asyncProfileUpdate( updateProfileDOM );
            resetProfileFormFields();
            socketUpdateServerEvent();
        })
    };

    // update dom with welcome message
    socket.on('user connected', function(username) {
        $(".update-container").append("<p>" + username + " has logged in</p>");
        timoutSocketMessage()
    });

    socket.on('update profile', function(message) {
        console.log(message);
        $(".update-container").append('<p>' + message + '<p>' );
        timoutSocketMessage()
    });

    // On page load send username to server
    $(document).ready(function(){
        socket.emit('user connected', username);
        handleUpdateProfileEvent();
    });


})();