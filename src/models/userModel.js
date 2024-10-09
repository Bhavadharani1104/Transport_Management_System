// This is a mock; ideally, you would connect to a database.
const users = [
    { username: 'admin', password: 'password' }
];

module.exports = {
    findUser: (username) => users.find(user => user.username === username)
};
