"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var cors = require('cors');

var MongoClient = require('mongodb').MongoClient;

var fetch = require('node-fetch');

var _require = require('console'),
    count = _require.count;

var corsOptions = {
  // origin: 'https://testapp.bostrot.com',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // app.use(express.json());
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/json

app.use(bodyParser.json());
app.listen(8000, function () {
  console.log('Server started!');
});
var url = 'mongodb://hgfdhg:ghddfghdfgd@mongo:27017';
app.route('/answers').get(function (req, res) {
  res.send({
    answers: [{
      question1: answer1,
      question2: answer2,
      question3: answer3,
      question4: answer4
    }]
  });
});

var countAge = function countAge(collection, cb) {
  collection.count({
    'age': 'age0'
  }, function (err, resQ1) {
    if (err) throw err;
    collection.count({
      'age': 'age1'
    }, function (err, resQ2) {
      if (err) throw err;
      collection.count({
        'age': 'age2'
      }, function (err, resQ3) {
        if (err) throw err;
        collection.count({
          'age': 'age3'
        }, function (err, resQ4) {
          if (err) throw err;
          collection.count({
            'age': 'age4'
          }, function (err, resQ5) {
            if (err) throw err;
            cb({
              age0: resQ1,
              age1: resQ2,
              age2: resQ3,
              age3: resQ4,
              age4: resQ5
            });
          });
        });
      });
    });
  });
};

var countGender = function countGender(collection, cb) {
  collection.count({
    'gender': 'gender-m'
  }, function (err, resQ1) {
    if (err) throw err;
    collection.count({
      'gender': 'gender-w'
    }, function (err, resQ2) {
      if (err) throw err;
      collection.count({
        'gender': 'gender-d'
      }, function (err, resQ3) {
        if (err) throw err;
        cb({
          gender0: resQ1,
          gender1: resQ2,
          gender2: resQ3
        });
      });
    });
  });
};

app.route('/getKeywords').get(function (req, res) {
  fetch('http://ob2020-yake:5000/yake/', {
    method: 'POST',
    body: {
      'language': 'de',
      'max_ngram_size': 2,
      'number_of_keywords': 10,
      'text': "Ja, ich w\xFCrde Sie w\xE4hlen. Es kann nicht sein,\n      dass nach so vielen Jahren mit der gleichen B\xFCrgermeisterin, \n      die die Stadt versauern l\xE4sst, Reke wieder gew\xE4hlt wird. \n      Wir m\xFCssen hier etwas ver\xE4ndern. Ich glaube, dass es der \n      Richtige Weg ist, einen wirklich parteilosen Kandidaten zu w\xE4hlen. \n      Es gibt auch ein gro\xDFes M\xFCllproblem hier!"
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res1) {
    // console.log(res1);
    res.send(res1);
  });
});
app.route('/answersCount').get(function (req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    var db = client.db('ob');
    var collection = db.collection('answers');
    count('ja', collection, function (resultYes) {
      count('nein', collection, function (resultNo) {
        res.status(200);
        res.json({
          'status': 'ok',
          'yes': resultYes,
          'no': resultNo
        });
        client.close();
      });
    });
  });
});
app.route('/statsCount').get(function (req, resServer) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('ob');
    var collection = db.collection('stats');
    collection.count({}, function (err, res) {
      if (err) throw err;
      resServer.status(200);
      resServer.json({
        'status': 'ok',
        'count': res
      });
      client.close();
    });
  });
});
app.route('/old/stats').get(function (req, resServer) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('ob');
    var collection = db.collection('stats');
    collection.find('stats').toArray(function (err, res) {
      if (err) throw err;
      var entries = 0;
      var newArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

      if (res !== undefined) {
        for (var i = 0; i < 10; i++) {
          for (var j in res) {
            if (res[j] !== undefined) {
              // Count occurences of stats at i into newArray at i at num
              newArray[i][res[j].stats[i]] = newArray[i][res[j].stats[i]] + 1 || 1;
              entries++;
            }
          }
        }
      }

      countAge(collection, function (ageCount) {
        countGender(collection, function (genderCount) {
          resServer.status(200);
          resServer.json({
            status: 'ok',
            stats: newArray,
            entries: entries,
            ages: ageCount,
            genders: genderCount
          });
          client.close();
        });
      });
    });
  });
});
app.route('/stats').get(function (req, resServer) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('ob');
    var collection = db.collection('stats');
    collection.find('stats').toArray(function (err, res) {
      if (err) throw err;
      var entries = 0;
      var points = [];

      if (res !== undefined) {
        // Every entry
        for (var j in res) {
          if (res[j] !== undefined) {
            // Everything inside array
            for (var i = 0; i < 10; i++) {
              if (res[j].stats[i] !== undefined) {
                // Count occurences of stats at i into newArray at i at num
                var key = res[j].stats[i] - 1;
                points[key] = points[key] + (10 - i) || 10 - i;
                entries++;
              }
            }
          }
        }
      }

      countAge(collection, function (ageCount) {
        countGender(collection, function (genderCount) {
          resServer.status(200);
          resServer.json({
            status: 'ok',
            stats: points,
            entries: entries / 10,
            ages: ageCount,
            genders: genderCount
          });
          client.close();
        });
      });
    });
  });
});
app.route('/stats').post(function (req, res) {
  if (Object.keys(req.body).length !== 1 && Object.keys(req.body).length !== 4) {
    res.status(400);
    res.json({
      'status': 'error',
      'msg': 'Wrong body.'
    });
    return;
  }

  req.body.stats = JSON.parse(req.body.stats);

  for (var i in req.body.stats) {
    if (req.body.stats[i] !== undefined && typeof req.body.stats[i] != 'number') {
      res.status(400);
      res.json({
        'status': 'error',
        'msg': 'Wrong body.'
      });
      return;
    }
  } // req.body.answers = JSON.parse(req.body.answers);


  MongoClient.connect(url, function (err, client) {
    var db = client.db('ob');
    var collection = db.collection('stats');
    collection.insertOne({
      stats: [req.body.stats[0], req.body.stats[1], req.body.stats[2], req.body.stats[3], req.body.stats[4], req.body.stats[5], req.body.stats[6], req.body.stats[7], req.body.stats[8], req.body.stats[9], req.body.stats[10]],
      age: req.body.age,
      gender: req.body.gender,
      answers: {
        q2: req.body.answers.q2,
        q3: req.body.answers.q3,
        q4: req.body.answers.q4
      }
    }, function (err, result) {
      if (err) throw err;
      res.status(201);
      res.json({
        'status': 'ok'
      });
      client.close();
    });
  });
});
app.route('/answers/:question').get(function (req, res) {
  var requestedQuestion = req.params['answer'];
  res.send({
    requestedQuestion: answers
  });
});
app.route('/answers').post(function (req, res) {
  MongoClient.connect(url, function (err, client) {
    var db = client.db('ob');
    var collection = db.collection('answers'); // Insert some documents

    collection.insertOne({
      q1: req.body.q1,
      q2: req.body.q2,
      q3: req.body.q3,
      q4: req.body.q4
    }, function (err, result) {
      if (err) throw err;
      res.status(201);
      res.json({
        'status': 'ok'
      });
      client.close();
    });
  });
});
app.route('/answers/:name').put(function (req, res) {
  res.send(200, req.body);
});
app.route('/answers/:name')["delete"](function (req, res) {
  res.sendStatus(204);
});