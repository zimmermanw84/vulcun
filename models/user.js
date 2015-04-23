"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('user', {

        username: {
            type: Sequelize.STRING,
            field: 'username'
        },
        password: {
            type: Sequelize.STRING,
            field: 'password'
        },
        profile: {
            type: Sequelize.TEXT,
            field: 'profile',
        },

    });
    return User;

};