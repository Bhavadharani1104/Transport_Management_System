const bcrypt = require('bcrypt');

// Mock database for demonstration
let users = []; 

exports.signup = (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send('Error hashing password.');
        }
        
        // Save the user (this is just a mock; you should use a real database)
        users.push({ username, password: hash });
        
        // Redirect or respond with a success message
        res.send('User created successfully!'); // You can redirect or render a success page here
    });
};
