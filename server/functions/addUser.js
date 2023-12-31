// Add a users document to the database

// ====== IMPORTS ======

// System
const path = require('path');

// Mongoose
const mongoose = require('mongoose');
const User = require('../models/user.js');

// Password hashing
const bcrypt = require('bcryptjs');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======
/**
 * 
 * @param {String} email - Email
 * @param {String} password - Password
 * @param {String} username - Username
 */
async function addUser  (email, password, username) {
    try {
        console.log(`Adding user: ${email}, ${password}, ${username}`);
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        const db = mongoose.connection;
        db.on('error', () => {
            throw new Error("Mongoose Connection Error");
        });
        
        const newUser = new User({
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: bcrypt.hashSync(password, 10),
            admin: false
        });

        await newUser.save();

    } catch (err) {
        console.log(err);
    }
}


// ====== EXPORTS ======

module.exports = addUser;