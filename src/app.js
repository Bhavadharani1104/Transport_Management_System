const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');

const busData = [
    {
        busNumber: 1,
        busRoute: "Route 1",
        seatsAvailable: 45,
        source: "Source 1",
        destination: "Destination 1",
        busStops: [
            { name: "Stop 1" },
            { name: "Stop 2" },
            { name: "Stop 3" }
        ]
    },
    {
        busNumber: 2,
        busRoute: "Route 2",
        seatsAvailable: 30,
        source: "Source 2",
        destination: "Destination 2",
        busStops: [
            { name: "Stop A" },
            { name: "Stop B" },
            { name: "Stop C" }
        ]
    },
    {
        busNumber: 3,
        busRoute: "Route 3",
        seatsAvailable: 35,
        source: "Source 3",
        destination: "Destination 3",
        busStops: [
            { name: "Stop X" },
            { name: "Stop Y" },
            { name: "Stop Z" }
        ]
    },
    {
        busNumber: 4,
        busRoute: "Route 4",
        seatsAvailable: 50,
        source: "Source 4",
        destination: "Destination 4",
        busStops: [
            { name: "Stop 1" },
            { name: "Stop 2" }
        ]
    },
    {
        busNumber: 5,
        busRoute: "Route 5",
        seatsAvailable: 38,
        source: "Source 5",
        destination: "Destination 5",
        busStops: [
            { name: "Stop 10" },
            { name: "Stop 20" }
        ]
    },
    {
        busNumber: 6,
        busRoute: "Route 6",
        seatsAvailable: 47,
        source: "Source 6",
        destination: "Destination 6",
        busStops: [
            { name: "Stop 101" },
            { name: "Stop 102" }
        ]
    }
    // You can add more bus routes as needed
];



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

app.get('/bus-details', async (req, res) => {
    const busNumber = parseInt(req.query.busNumber);

    // Input validation
    if (isNaN(busNumber)) {
        return res.status(400).send("Invalid bus number");
    }

    console.log(`Requested Bus Number: ${busNumber}`);

    try {
        // Assume busData is an array or fetch data from a database
        const bus = busData.find(b => b.busNumber === busNumber); // Find the bus in the busData array

        if (bus) {
            res.render('bus', {
                busNumber: bus.busNumber,
                busRoute: bus.busRoute,
                seatsAvailable: bus.seatsAvailable,
                source: bus.source,
                destination: bus.destination,
               
            });
        } else {
            res.status(404).send("Bus not found"); // Send 404 if bus not found
        }
    } catch (error) {
        console.error(`Error fetching bus details: ${error.message}`); // Log error message
        res.status(500).send("Internal Server Error"); // Handle server error
    }
});

app.get('/payment', (req, res) => {
    const amount = 100; // Example amount for the payment
    res.render('payment', { amount });
});

// Route to handle payment submission
app.post('/payment-success', (req, res) => {
    // Process the payment here (e.g., with a payment gateway API)
    res.redirect('/payment-success');
});

// Route to render the payment success page
app.get('/payment-success', (req, res) => {
    res.send("<h1>Payment Successful!</h1><p>Thank you for your payment.</p>");
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
