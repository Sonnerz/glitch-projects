'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const request     = require('request');
const moment      = require('moment');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug')

app.get('/', function (req, res) {
request('https://api.glitch.com/users/byLogins?logins=' + process.env.USERNAME, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const data = JSON.parse(body)[0];
    const projectsArray = data.projects;
    //console.log(projectsArray);
    
    res.render(process.cwd() + '/views/pug/index',
    {
      name: data.login,
      avatar: data.avatarUrl,
      projects: projectsArray,
      moment: moment
    });
  }
})  

});

var listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is running on port ${listener.address().port}`);
});