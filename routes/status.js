const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const mongoDbStatus = 'mongodb://localhost/lego_tracker';

// Connect to the db
mongoose.connect(mongoDbStatus);
const db = mongoose.connection.db;

// Return list of collections
router.get('/names', async (req, res) => {
    db.listCollections().toArray((err, results) => {
      if (err) {
        res.status(404).send([{status: 404, msg: err}]);
      } else {
        res.send(results);
      }
    });
});

// Return on-disk size for a given collection or whole database
router.get('/size', async (req, res) => {
    const query = req.query.q;

    if (query === 'database') {
        db.stats((err, results) => {
          if (err) {
            res.send({msg: err});
          } else {
            res.send(results);
          }
        });
    } else {
        db.collection(query, (conErr, conResults) => {
            if (conErr) {
                res.send({msg: conErr});
            } else {
                conResults.stats((err, results) => {
                    if (err) {
                      res.send({msg: err});
                    } else {
                      res.send(results);
                    }
                });
            }
        });
    }
});

module.exports = router;
