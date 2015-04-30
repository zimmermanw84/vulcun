(function() {

    "use strict";

    var socket = io();
    var username = $('#user-name').data('user-name');
    var payload;

    var resetProfileFormFields = function() {
        $('.input-email, .input-country, .input-phone').val(null);
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
                callback(userProfile);
            })
            .error(function(err) {
                alert("ERROR in PROFILE")
            });
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
                $('#searching-pic').hide();
                callback(searchResults)
            }).error(function(err) {
             alert('ERROR in SEARCH')
            });
    };

    var renderSearchResults = function(searchResults) {

        // Reset search container before every search
        $('.search-results').html('');
        $('.search-results-container h1').show();
        $('#total-results').text(searchResults.length);

        if (searchResults.length === 0) {
            $('.search-results').append('<h3>Nothing Found</h3>')
        };

        if (searchResults[0].error) {
            $('.search-results-container h1').hide();
            alert('Please search for an actual email or phone number');
        };

        var firstThousand = searchResults.splice(0, 1000);
        var remaining = searchResults.splice(0, 1000);

        for (var i = 0, ii = firstThousand.length; i < ii ; i++) {
            $('.search-results').append(
                        "<li>"  + firstThousand[i].id + " - " + JSON.parse(firstThousand[i].profile).email + " - " +
                        firstThousand[i].username + " - " +
                        JSON.parse(firstThousand[i].profile).phone + "</li>"
                        )
        };

        var renderRemainingResults = function(results) {
                for (var i = 0, ii = results.length; i < ii ; i++) {
                    $('.search-results').append(
                                "<li>" + results[i].id + " - " + JSON.parse(results[i].profile).email + " - " +
                                results[i].username + " - " + JSON.parse(results[i].profile).phone + "</li>"
                                )
                };
        };

        // Hacky Lazy loading
        function continueRendering() {
            renderRemainingResults(remaining);
            remaining = remaining.splice(0, 500)
        }

        setTimeout(function() {
            var intervalRendering = setInterval(function() {
                continueRendering()
            }, 3000);
        }, 3000);


        function myStopFunction() {
            clearInterval(intervalRendering);
        }

        if (remaining.length <= 0) {
            myStopFunction();
        }

    };

    var handleSearchEvent = function() {
      $(".search").on('submit', function(event) {
          event.preventDefault();
          $('#searching-pic').show();
          asyncSearch( renderSearchResults );
          $('#input-search').val(null);

      })
    };

    var socketIoEvents = function() {

        socket.on('user connected', function(username) {
            $(".update-container").append("<p>" + username + " has logged in</p>");
            timoutSocketMessage()
        });

        socket.on('update profile', function(message) {
            $(".update-container").append('<p>' + message + '<p>' );
            timoutSocketMessage()
        });

        $('#logout').on('click', function(){
            socket.emit('user logout');
        });

    };

    // Document ready. Not really needed due to Script tags at bottom of the page, makes me sleep better at night.
    $(function() {
        socket.emit('user connected', username);
        handleUpdateProfileEvent();
        handleSearchEvent();
        $('#searching-pic').hide();
        socketIoEvents();
    });


})();