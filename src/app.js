const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Set view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.render('front'); // Render front.ejs
});

// Login routes
app.get('/login', (req, res) => {
    res.render('login', { error: null }); // Pass an empty error initially
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Mock login logic (replace this with actual authentication)
    if (username === 'admin' && password === 'password') {
        // Redirect to the dashboard on successful login
        res.redirect('/dashboard');
    } else {
        // Render login page with an error message
        res.render('login', { error: 'Invalid username or password.' });
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Render dashboard.ejs
});

// Signup route
app.get('/signup', (req, res) => {
    res.render('signup'); // Render signup.ejs
});
app.post('/signup', signupController.signup);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
