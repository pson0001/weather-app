const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

//Store the API keys and counter for each key//
const apiDict = {};
apiDict['key1'] = ['8677c4a27608d1f652d2eaba61ae59d8', 0];
apiDict['key2'] = ['85c9ee220d1854ee14d7f1ea68fb8c19', 0];
apiDict['key3'] = ['79044ed3f4d56e6dcce0c4de4042ea38', 0];
apiDict['key4'] = ['9afdb73dc03d6d2563156382f29c89c8', 0];
apiDict['key5'] = ['803b47629c58e5313fed9e05cbda11d7', 0];

//Get the time of server start runs//
var last_req_date = (new Date()).getDate();
var last_req_hour = (new Date()).getHours();

//Reset counter of API keys//
function resetCounter() {
  for (i in apiDict) {
    apiDict[i][1] = 0
  }
};

app.use(express.static('css'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs')

//Get function without parameters//
app.get('/', function(req, res) {
  res.render('index', {
    weather: null,
    error: null
  })
});

//Get function with parameters//
app.get('/:parameters', function(req, res) {
  var q = req.params.parameters;
  if (q != ':parameters') {
    var parsedQ = q.split(",");
    if(parsedQ[0]){
      var city = parsedQ[0].trim();
    }else{
      res.render('index', {
        weather: null,
        error: 'Error, please input city name'
      });
      return;
    };
    if(parsedQ[1]){
      var country = parsedQ[1].trim();
    }else{
      res.render('index', {
        weather: null,
        error: 'Error, please input country name'
      });
      return;
    };
    if(parsedQ[2]){
      var key = parsedQ[2].trim();
    }else{
      res.render('index', {
        weather: null,
        error: 'Error, please input key'
      });
      return;
    };
  } else {
    var city = req.query.city;
    var country = req.query.country;
    var key = (req.query.key).trim();
  }

  //Get the currernt request time//
  var current_req_date = (new Date()).getDate();
  var current_req_hour = (new Date()).getHours();

  if (!Object.keys(apiDict).includes(key)) {
    res.render('index', {
      weather: null,
      error: 'Error, please input correct key'
    });
    return;
  } else if (last_req_date === current_req_date && last_req_hour === current_req_hour) {
    //If yes, at same day and same hour counter +1
    apiDict[key][1] = apiDict[key][1] + 1;
  } else {
    //If no, make the current time become last req time， reset counter and counter +1
    last_req_date = current_req_date;
    last_req_hour = current_req_hour;
    resetCounter();
    apiDict[key][1] = apiDict[key][1] + 1;
  };

  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${apiDict[key][0]}`
  request(url, function(err, response, body) {
    if (err) {
      res.render('index', {
        weather: null,
        error: 'Error, please try again'
      });
    } else {
      let weather = JSON.parse(body)
      if (weather.main === undefined) {
        res.render('index', {
          weather: null,
          error: 'Error, please input correct city or country name'
        });
      } else if (apiDict[key][1] <= 5) {
        let weatherText = `It's ${weather['weather'][0].description} in ${weather.name}.
        And this is the ${apiDict[key][1]} request/requests in a hour!`;
        res.render('index', {
          weather: weatherText,
          error: null
        });
      } else {
        res.render('index', {
          weather: null,
          error: 'Error, query exceed'
        });
      }
    }
  });
})

//Post function without parameters//
app.post('/', function(req, res) {
  res.render('index', {
    weather: null,
    error: null
  })
})

app.listen(3000, function() {
  console.log('Listening on port 3000')
})
