const express = require('express');
const path = require('path');
const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const app = express();

const finalData = [];

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => res.send('Hello, client'));

app.get('/data', (req, res) => {
  fs.createReadStream('./traffic_bytes.json')
    .pipe(JSONStream.parse('result'))
    .pipe(es.mapSync((data) => {
      finalData.push({
        destination_IP: data['All_Traffic.dest'],
        source_IP: data['All_Traffic.src'],
        sum_of_bytes: data.sum_bytes,
      });
      // console.log('data json', finalData);
      // console.error(data);
      if (finalData.length > 249) {
        res.end(JSON.stringify(finalData));
      }
    }));
});

const port = 3001;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
