var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
// var router = require('router');

var app =express();
var router = express.Router();
var fs=require('fs');
var json=require('./shoppingCart.json');


// .use(json(product.json))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('./'));

app.set('port',process.env.PORT || 8080);

app.get("/orders", function(req, res) {
  console.log("in /orders");
  res.send(json.orders);
  res.end();
});

// app.get("/orders",function(req,res){
//   // res.write("Invalid Input: Please enter the userId in URL");
//   console.log("in /orders");
//   console.log(req.params);
//   res.send(json.orders);
//   res.end();
// });


//Find specified product and return else return error
app.get("/orders/:userId", function(req, res){
  console.log("Getting id request", req.params);
  var userOrders = [];
  console.log(req.params.userId);
  for(i =0 ; i< json.orders.length; i++){
    var currentOrder = json.orders[i];
    if(currentOrder.userId == req.params.userId) {
      userOrders.push(currentOrder);
    }
  }
  res.json(userOrders);
  //res.send(JSON.stringify([userOrders]));
 // res.end();
});
app.get("/orders/:id",function(req,res){
  res.json(json.orders.id);
});
app.listen(app.get('port'),function(){
  console.log("server is running at 8080");
});
