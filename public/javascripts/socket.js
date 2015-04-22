(function() {

    "use strict";

    var socket = io();
    var username = $('#user-name').data('user-name');
    var payload;

    var resetProfileFormFields = function() {
        $('.input-email').val(null);
        $('.input-country').val(null);
        $('.input-phone').val(null);
    };

    var updateProfileDOM = function(userProfile) {
        $('#phone').text("Phone: " + userProfile.phone);
        $('#country').text("Country: " + userProfile.country);
        $('#email').text("Email: " + userProfile.email);
    };

    var asyncProfileUpdate = function(callback) {

        payload = {
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

    // handle search events
    var asyncSearch = function(callback) {
        payload = { search: $('#input-search').val() };

        $.post('/search', payload )
            .success(function(data) {
                var searchResults = JSON.parse(data);
                callback(searchResults)
            })
    };

    var renderSearchResults = function(searchResults) {

        // Reset search container before every search
        $('.search-results').html('');
        $('.search-results-container h1').show();
        $('#total-results').text(searchResults.length);
        if (searchResults.length === 0) {
            $('.search-results').append('<h3>Nothing Found</h3>')
        };

        for (var i = 0; i < searchResults.length; i++) {
            $('.search-results').prepend("<li>" + searchResults[i].username + "</li>")
        }

    };

    var handleSearchEvent = function() {
      $(".search").on('submit', function(event) {
          event.preventDefault();
          asyncSearch( renderSearchResults );
          $('#input-search').val(null);

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
    $(function(){
        socket.emit('user connected', username);
        handleUpdateProfileEvent();
        handleSearchEvent();
    });


})();