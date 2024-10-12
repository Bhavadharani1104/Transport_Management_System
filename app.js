const express = require('express');
const bodyParser = require('body-parser');
const signupController = require('./controllers/signupController');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory

// Set view engine for EJS
app.set('view engine', 'ejs');

// Define the root route
app.get('/', (req, res) => {
    res.render('signup'); // Render the signup view
});

// Your signup route
app.post('/signup', signupController.signup);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
