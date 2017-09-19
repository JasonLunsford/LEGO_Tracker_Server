let express = require("express");
let mongoose = require("mongoose"),
	Schema = mongoose.Schema;
let cors = require("cors");

let mongoDb = 'mongodb://localhost/lego_tracker';

// Enable express and CORS
let app = express();
app.use(cors());

// Prepare routes
let index = require('./routes/index');
let colors = require('./routes/colors');
let pieces = require('./routes/pieces');
let piece_categories = require('./routes/piece_categories');
let sets = require('./routes/sets');
let themes = require('./routes/themes');
let user_sets = require('./routes/user_sets');

// Use routes
app.use('/', index);
app.use('/colors', colors);
app.use('/pieces', pieces);
app.use('/piece_categories', piece_categories);
app.use('/sets', sets);
app.use('/themes', themes);
app.use('/user_sets', user_sets);

// Global failure route
app.all('/*', (req, res) => {
	res.status(500).send({status: 500, error: 'Invalid endpoint'});
});

// Connect to the db
mongoose.connect(mongoDb);
let db = mongoose.connection;

// Bind mongodb errors and send to console log
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(8181);
