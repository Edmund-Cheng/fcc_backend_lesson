let express = require('express');
let app = express();
let bodyParser = require('body-parser');
console.log("Hello World");
app.use("/public", express.static(__dirname + "/public"));
// Middleware method for root
app.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
})
// absolute path __dirname
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
// env variable usage in .env
app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE=="uppercase") {
    res.json({"message": "Hello json".toUpperCase()})
  } else {
    res.json({"message": "Hello json"})
  }
})
// Middleware chain function for specific method
app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

// Get Route Parameter Input from the Client e.g. your-app-rootpath/freecodecamp/echo https://boilerplate-express--edmund-cheng.repl.co/freecodecamp/echo
app.get("/:word/echo", function(req, res) {
  res.send({echo: req.params.word});
});

// Get Query Parameter Input from the Client
// e.g.
// route_path: '/library'
// actual_request_URL: '/library?userId=546&bookId=6754'
// req.query: {userId: '546', bookId: '6754'}
app.get("/name", function(req, res){
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({
    name: firstName + ' ' + lastName
  });
});

// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json());

// Get Data from POST Requests
// A look at the usual library example:
//   route: POST '/library'
//   urlencoded_body: userId=546&bookId=6754
//   req.body: {userId: '546', bookId: '6754'}
app.post("/name",function(req, res){
  var firstName = req.body.first;
  var lastName = req.body.last;
  res.json({
    name: firstName + ' ' + lastName
  });
});



























module.exports = app;
