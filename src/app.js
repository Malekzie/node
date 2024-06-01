const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware to serve static files
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Middleware to parse request body
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
    secret: '5da5c3ac5fdd27db1cce451073c9b573',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Middleware to set loggedIn variable for all views
app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('pages/index', { title: 'Home' });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', { title: 'Contact' });
});

// Router Handling
const authRouter = require('./routes/authRoute');
app.use('/auth', authRouter);

app.all('*', (req, res) => {
    res.status(404).render('pages/error', { title: '404 - Not Found' });
});

module.exports = app;
