const express = require('express');

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const r = require('rethinkdb');

var corsOptions = {
  // origin: 'https://testapp.bostrot.com',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.listen(8000, () => {
  console.log('Server started!')
})

let conDB = function (callback) {
  r.connect({
    host: '10.8.0.7',
    port: 32771,
    // db: something
  }, function (err, conn) {
    if (err) throw err;

    conn.addListener('error', function (e) {
      processNetworkError(e);
    });

    conn.addListener('close', function () {
      cleanup();
    });

    callback(r, conn);
  });
}

app.route('/api/answers').get((req, res) => {
  res.send({
    answers: [{
      question1: answer1,
      question2: answer2,
      question3: answer3,
      question4: answer4
    }],
  })
})

const count = function (word, conn, cb) {
  r.table('answers')('q2').count(word).run(conn, function (err, resQ1) {
    if (err) throw err;
    console.log('resQ1 '+resQ1)
    r.table('answers')('q2').count(word).run(conn, function (err, resQ2) {
      if (err) throw err;
      console.log('resQ2 '+resQ2)
      r.table('answers')('q3').count(word).run(conn, function (err, resQ3) {
        if (err) throw err;
        console.log('resQ3 '+resQ3)
        r.table('answers')('q4').count(word).run(conn, function (err, resQ4) {
          if (err) throw err;
          console.log('resQ4 '+resQ4)
          cb({
            q1: resQ1,
            q2: resQ2,
            q3: resQ3,
            q4: resQ4,
          })
        });
      });
    });
  });
}


app.route('/api/answersCount').get((req, res) => {

  conDB(function (r, conn) {
    count('ja', conn, function(resultYes) {
      count('nein', conn, function(resultNo) {
        res.json({
          yes: resultYes,
          no: resultNo,
        })
      });
    });
    /* r.table('answers').run(conn, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
          if (err) throw err;
          console.log(result.length);
          res.send(JSON.stringify(result, null, 2));
      });
    }) */
    count
  })
  /* res.send({
    answers: [{
      question1: answer1,
      question2: answer2,
      question3: answer3,
      question4: answer4
    }],
  }) */
})

app.route('/api/answers/:question').get((req, res) => {
  const requestedQuestion = req.params['answer']
  res.send({
    requestedQuestion: answers,
  })
})

app.route('/api/answers').post((req, res) => {
  conDB(function (r, conn) {
    r.table('answers').insert({
      q1: req.body.q1,
      q2: req.body.q2,
      q3: req.body.q3,
      q4: req.body.q4,
    }).run(conn, function (result) {
      res.status(201)
      res.send(req.body.answer)
    })
  })
})

app.route('/api/answers/:name').put((req, res) => {

  res.send(200, req.body)
})

app.route('/api/answers/:name').delete((req, res) => {
  res.sendStatus(204)
})
