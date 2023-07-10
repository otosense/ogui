const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


app.get('/wf', (req, res) => {
  // Read the output.json file
  const output = require('./json/jsonformatter.json');

  // Extract the data array from the output object
  // const dataArray = output.data[1].data;
  const dataArray = output.data.filter(x => x.channel === 'wf');

  // Get the limit from the URL parameter, or set a default value
  const from = parseInt(req.query.from) || 0;
  const to = parseInt(req.query.to) || 1000;

  // Create a new limitedData array with the desired size
  const limitedData = dataArray[0].data.slice(from, to);
  const wf_Json = {
    data: dataArray[0].data.slice(from, to),
    sr: dataArray[0].sr,
    ts: dataArray[0].ts
  };
  // console.log('wf_Json', wf_Json);
  // Send the limitedData as the response
  res.json({ data: wf_Json });
});

app.get('/plc', (req, res) => {
  // Read the output.json file
  const output = require('./json/jsonformatter.json');

  // Extract the data array from the output object
  // const dataArray = output.data[1].data;
  const dataArray = output.data.filter(x => x.channel === 'plc');

  // Get the limit from the URL parameter, or set a default value
  const from = parseInt(req.query.from) || 0;
  const to = parseInt(req.query.to) || 1000;

  // Create a new limitedData array with the desired size
  const limitedData = dataArray[0].data.slice(from, to);

  // Send the limitedData as the response
  res.json({ data: limitedData });
});

app.get('/annotation', (req, res) => {
  // Read the output.json file
  const annotOutput = require('./json/Annot.json');

  // Extract the data array from the output object
  const ann = annotOutput.data.filter(x => x.channel === 'annot');

  // Get the limit from the URL parameter, or set a default value
  const from = parseInt(req.query.from) || 0;
  const to = parseInt(req.query.to) || 100;

  // Create a new limitedData array with the desired size
  const limitedData = ann[0].data.slice(from, to);
  // Send the limitedData as the response
  res.json({ data: limitedData });
});

app.get('/volume', (req, res) => {
  // Read the output.json file
  const output = require('./json/volumn.json');
  // Extract the data array fro console.log('ann', ann);m the output object
  const volume = output.data.filter(x => x.channel === 'volume');
  // Get the limit from the URL parameter, or set a default value
  const from = parseInt(req.query.from) || 0;
  const to = parseInt(req.query.to) || 100;

  // Create a new limitedData array with the desired size
  const limitedData = volume[0].data.slice(from, to);
  // Send the limitedData as the response
  res.json({ data: limitedData });
});


app.get('/temp', (req, res) => {
  // Read the output.json file
  const output = require('./json/temp.json');

  // Extract the data array from the output object
  const temp = output.data.filter(x => x.channel === 'temp');

  // Get the limit from the URL parameter, or set a default value
  const from = parseInt(req.query.from) || 0;
  const to = parseInt(req.query.to) || 100;

  // Create a new limitedData array with the desired size
  const limitedData = temp[0].data.slice(from, to);
  // Send the limitedData as the response
  res.json({ data: limitedData });
});
app.get('/viewConfig', (req, res) => {
  // Read the output.json file
  const output = require('./json/viewConfig.json');
  // Send the limitedData as the response
  res.json({ data: output });
});

app.get('/', (req, res) => {
  // Read the output.json file
  const output = require('./json/jsonformatter.json');

  // Send the limitedData as the response
  res.json({ data: output.data });
});


app.get('/mixed', (req, res) => {
  // Read the output.json file
  const output = require('./json/mixed.json');
  // Extract the data array fro console.log('ann', ann);m the output object
  const mixed = output.data.filter(x => x.channel === 'mixed');
  // Get the limit from the URL parameter, or set a default value
  const from = parseInt(req.query.from) || 0;
  const to = parseInt(req.query.to) || 1000;

  // Create a new limitedData array with the desired size
  const limitedData = mixed[0].data.slice(from, to);
  // Send the limitedData as the response
  res.json({ data: limitedData });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
