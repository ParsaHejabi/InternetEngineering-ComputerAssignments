const express = require('express');
const assert = require('assert');
const whiskers = require('whiskers');
const turf = require('@turf/turf');
const fs = require('fs');
const helper = require('./helper');

const app = express();
const port = process.env.PORT || 3000;

console.log('Starting application...');
app.use('/', (req, res, next) => {
  helper.logger.info({
    message: 'Request: ',
    url: req.url,
    method: req.method,
    ip: req.ip,
    query: req.query,
  });

  next();
});

app.get('/', (req, res) => {
  res.send(
    whiskers.render(`
  <html>
  <body>
  <h1> Solution for HW1! </h1>
  </body>
  </html>
  `)
  );
});

app.get('/gis/testpoint', (req, res) => {
  const result = {};
  try {
    assert.notStrictEqual(req.query.lat, undefined, 'No lat is given!');
    assert.notStrictEqual(req.query.long, undefined, 'No long is given!');
    helper.dataJsonFile.features.forEach((item) => {
      if (
        turf.booleanPointInPolygon(
          turf.point([req.query.lat, req.query.long]),
          item
        )
      ) {
        if (result[item.geometry.type] === undefined) {
          result[item.geometry.type] = [];
        }
        result[item.geometry.type].push(item.properties.name);
      }
    });
    res.send(result);
  } catch (err) {
    assert(err instanceof assert.AssertionError);
    helper.logger.error({
      message: err.message,
      url: req.url,
      query: req.query,
    });
    res.status(400);
    res.send(
      whiskers.render(
        `
    <html>
    <body>
    <h1>ERROR!</h1>
    ${err.message}
    </body>
    </html>
    `,
        req
      )
    );
  }
});

app.post('/gis/addpolygon', express.json(), (req, res) => {
  helper.dataJsonFile.features.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(helper.dataJsonFile), (err) => {
    if (err) {
      helper.logger.error({
        message: err.message,
        url: req.url,
        query: req.query,
        body: req.body,
      });
    }
  });
  res.send(
    whiskers.render(`
  <html>
  <body>
  <h1>Success!</h1>
  </body>
  </html>
  `)
  );
});

app.listen(port, () =>
  console.log(`Application is listening on port ${port}!`)
);
