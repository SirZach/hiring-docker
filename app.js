const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const ApplicationsJsonPath = `${process.cwd()}/data/applications.json`;
const uuid = require('uuid');

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json({ type: 'application/*+json' })); // for parsing application/json
app.use(express.static('dist'));
app.use('/', express.static('dist'));

app.get('/applications', function(req, res) {
  let ApplicationsJson = require(ApplicationsJsonPath);

  res.json({
    data: ApplicationsJson.applications
  });
});

app.get('/application-questions/:id', function(req, res) {
  let ApplicationsJson = require(ApplicationsJsonPath);
  let id = req.params.id;
  let found;

  ApplicationsJson.applications.forEach((a) => {
    a.relationships['application-questions'].data.forEach((aq) => {
      if (aq.id == id) {
        found = aq;
      }
    });
  });

  res.json({
    data: found
  });
});

app.post('/applications', function(req, res) {
  let ApplicationsJson = require(ApplicationsJsonPath);
  let payload = req.body;

  payload.data.id = uuid.v4();
  payload.data.relationships['application-questions'].data.forEach((q) => {
    q.id = uuid.v4();
  });
  ApplicationsJson.applications.push(payload.data);

  fs.writeFile(ApplicationsJsonPath,
    JSON.stringify(ApplicationsJson),
    (err) => {
      if (!err) {
        res.status(201).json(payload);
      }
    });
});

app.get('/questions', function(req, res) {
  res.send({
    data: [
      {
        id: 1,
        type: 'question',
        attributes: {
          question: 'Is your name Zach McGonigal?',
          answer: 'Yes'
        }
      },{
        id: 2,
        type: 'question',
        attributes: {
          question: 'Should you get this job?',
          answer: 'Yes'
        }
      }, {
        id: 3,
        type: 'question',
        attributes: {
          question: 'If you combine the words "may" and "be" together what do you get?',
          answer: 'Maybe'
        }
      }
    ]});
});

app.listen(3000, function () {
  console.log('Hiring-docker app listening on port 3000!')
});
