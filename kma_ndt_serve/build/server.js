const express = require('express');
const cors = require('cors');
const veryfySignature = require('./modules/verifySignature');
const signMessage = require('./modules/signMessage');
const createKey = require('./modules/createKey');
const bodyParser = require('body-parser');

// Init App
const app = express();
// port listen server
const port = 8000;
app.use(cors());
app.use(bodyParser.json());

// API Sign message
app.post('/sign-message', (request, response) => {
  signMessage(request, response);
});

// API Verify signature
app.post('/verify-signature', (request, response) => {
  veryfySignature(request, response);
});

// API Verify signature
app.post('/create-key', (request, response) => {
  createKey(request, response);
});
const server = app.listen(port, () => {
  console.log(`Server is running via port ${port}`);
});