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
        email: {
            type: Sequelize.STRING,
            field: 'email',
        },
        phone: {
            type: Sequelize.INTEGER,
            field: 'phone',
        }
    });
    return User;

};