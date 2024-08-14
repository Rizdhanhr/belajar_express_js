const express = require('express'); 
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT || 3000;
const globalVariableMiddleware = require('./middleware/globalVariable');
const globalMessage = require('./middleware/globalMessage');
const checkAuth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { csrfProtection, csrfErrorHandler } = require('./middleware/csrf');
const methodOverride = require('method-override');
//Import Routing
const dashboardRouter = require('./routes/dashboard');
const satuanRouter = require('./routes/satuan');
const brandRouter = require('./routes/brand');
const authController = require('./controllers/authController');
const validateLogin = require('./validator/loginValidator');

const app = express();
app.set('view engine','ejs');
app.use(session({
    secret:  process.env.SESSION_SECRET, // Change this to a strong, unique key
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000  // 2 jam dalam milidetik
    }
}));

app.use(flash());
app.use(globalMessage); 

// Middleware
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(methodOverride('_method'));
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// CSRF middleware
app.use(csrfProtection);
// Middleware untuk menangani error CSRF
app.use(csrfErrorHandler)
app.use(globalVariableMiddleware); 
//Autentikasi
app.get('/login',redirectIfAuthenticated, authController.loginIndex);
app.post('/login', redirectIfAuthenticated , validateLogin, authController.loginPost);
app.post('/logout', checkAuth, authController.logout);

//Routing Admin
app.use('/', checkAuth,  dashboardRouter);
app.use('/satuan', checkAuth, satuanRouter);
app.use('/brand', checkAuth, brandRouter);
app.listen(port, () => console.log('hello world!'));