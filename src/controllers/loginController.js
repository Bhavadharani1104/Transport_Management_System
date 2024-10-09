// controllers/loginController.js

// Example function for rendering the login page
exports.renderLoginPage = (req, res) => {
    // Check if there's an error passed in the session or request
    const error = req.session.error || null; // or however you store errors
    req.session.error = null; // Clear error after showing it

    res.render('login', { error });
};

// Example function for handling login
exports.handleLogin = (req, res) => {
    const { username, password } = req.body;

    // Replace with actual validation logic
    if (username === 'admin' && password === 'password') {
        // Successful login logic
        req.session.user = username; // or whatever you use to track the user
        res.redirect('/login'); // Redirect to a dashboard or home page
    } else {
        // Set error message in session and redirect back to login page
        req.session.error = 'Invalid username or password';
        res.redirect('/login');
    }
};
