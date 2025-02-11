require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/users.model");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/products.routes");
var orderRouter = require("./routes/order.routes");
var newsletterRouter = require("./routes/newsletter.routes");

var connectDb = require("./config/database.config");
var addTest = require("./temp/insert.products");
var testUser = require("./config/testuser.config");
var app = express();
var port = process.env.PORT;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 30 * 60 * 1000,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/order", orderRouter);
app.use("/newsletter", newsletterRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen(port, async () => {
	await connectDb();
	console.log(`server is running on port ${port}`);
});

module.exports = app;
