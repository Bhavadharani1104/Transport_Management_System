// src/models/user.js
const users = []; // Mock database

exports.create = async (userData) => {
    users.push(userData);
    return userData;
};

exports.findByEmail = async (email) => {
    return users.find(user => user.email === email);
};
