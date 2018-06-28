var createError = require('http-errors');
var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var web3 = require('web3');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boards = require('./routes/dashboard');
var deposit = require('./routes/deposit');
var transaction = require('./routes/transaction');
var register = require('./routes/register');
var login = require('./routes/login');
var identification = require('./routes/identification');
var sendether = require('./routes/sendether');
var activate = require('./routes/activate');
var logout = require('./routes/logout');
var admin = require('./routes/admin');
var admin_dashboard = require('./routes/admin_dashboard');

var setUser = require('./setUser');

var app = express();

// view engine setup
app.engine('ejs', engine); // 追加
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sessionの設定
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', setUser, indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', setUser, boards);
app.use('/register', register);
app.use('/login', login);
app.use('/transaction', transaction);
app.use('/identification', setUser, identification);
app.use('/logout', logout);
app.use('/sendether', setUser, sendether);
app.use('/activate', activate);
app.use('/admin', admin);
app.use('/admin_dashboard', admin_dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
