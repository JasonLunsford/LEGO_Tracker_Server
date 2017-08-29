var express = require("express");
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;
var cors = require("cors");

var mongoDb = 'mongodb://localhost/lego_tracker';

// Enable express and CORS
var app = express();
app.use(cors());

// Prepare models
var Colors = require('./models/colors');
var PieceCategories = require('./models/piece_categories');
var Pieces = require('./models/pieces');
var Sets = require('./models/sets');
var Themes = require('./models/themes');
var UserSets = require('./models/user_sets');

// Connect to the db
mongoose.connect(mongoDb);
var db = mongoose.connection;

// Bind mongodb errors and send to console log
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// APIs
app.get('/colors', function(req, res) {
	Colors.find(function(err, doc) {
		res.send(doc);
	})
});

app.get('/piece_categories', function(req, res) {
	PieceCategories.find(function(err, doc) {
		res.send(doc);
	})
});

app.get('/pieces', function(req, res) {
	Pieces.find(function(err, doc) {
		res.send(doc);
	})
});

app.get('/sets', function(req, res) {
	Sets.find(function(err, doc) {
		res.send(doc);
	})
});

app.get('/themes', function(req, res) {
	Themes.find(function(err, doc) {
		res.send(doc);
	})
});

app.get('/user_sets', function(req, res) {
	UserSets.find(function(err, doc) {
		res.send(doc);
	})
});

app.listen(8181);