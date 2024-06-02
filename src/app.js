const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const { loggedInMW, sessionMW, saveTheme } = require('./middleware/sessionMW');
const spellService = require('./services/spellService');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("layout extractScripts", true);

// Middleware to serve static files
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use('/img', express.static(path.join(__dirname, '../public/assets/images'), { extensions: ['jpg', 'png', 'gif'] }));

// Middleware to parse request body
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Configure session middleware
app.use(sessionMW);
app.use(loggedInMW);
app.use(saveTheme);

// Theme toggle persistence
app.post('/theme', (req, res) => {
    const { theme } = req.body;
    req.session.theme = theme;
    res.cookie('theme', theme, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.sendStatus(200);
});

// Routes
app.get('/', saveTheme, (req, res) => { // Ensure saveTheme is called
    res.render('pages/index', { title: 'Home', theme: res.locals.theme });
});

app.get('/contact', saveTheme, (req, res) => { // Ensure saveTheme is called
    res.render('pages/contact', { title: 'Contact', theme: res.locals.theme });
});

const agentRepository = require('./repositories/agentsRepository');
app.get('/agents', saveTheme, async (req, res) => { // Ensure saveTheme is called
    const agents = await agentRepository.findAgent();
    res.render('pages/agents', { title: 'Agents', theme: res.locals.theme, agents });
});

const elements = [
    'Fire', 'Water', 'Air', 'Earth', 'Light', 'Darkness',
    'Electricity', 'Ice', 'Metal', 'Nature', 'Poison',
    'Shadow', 'Sound', 'Time'
];
app.get('/archives', saveTheme, async (req, res) => { // Ensure saveTheme is called
    const spells = await spellService.getAllSpells();
    const loggedIn = !!req.session.userId;
    res.render('pages/archives', { title: 'Archives', theme: res.locals.theme, spells, elements, loggedIn });
});

// Router Handling
const authRouter = require('./routes/authRoute');
app.use('/auth', authRouter);

const profileRoute = require('./routes/profileRoute');
app.use('/profile', profileRoute);

const spellRoute = require('./routes/spellRoute');
app.use('/spells', spellRoute);

app.all('*', (req, res) => {
    res.status(404).render('pages/error', { title: '404 - Not Found' });
});

module.exports = app;
