var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app =express();
var fs=require('fs');
var json=require('./product.json');


// .use(json(product.json))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('./'));

app.set('port',process.env.PORT || 8080);

//Find specified product and return else return error
app.get("/productList/:productId", function(req, res){
  console.log("Getting specific product of id: ", req.params.productId);

  for(i =0 ; i< json.productList.length; i++){
    var product = json.productList[i];
    if(product.id == req.params.productId) {
      res.json([product]);
      // res.write(JSON.stringify([product]));
      // res.end();
    }
  }

  // json.productList.forEach(function(product){
  //   if(product.id == req.params.productId) {
  //     res.json([product]);
  //   }
  // });
});

app.get("/productList/", function(req, res){
  res.send(json.productList);
});

app.post("/productList/", function(req,res){
  //console.log("Creating new product using data: ", req.body);
  var newProduct = req.body;
  console.log("New product name is: ", newProduct.productName);
  newProduct.id = "444";
  json.productList.push(newProduct);

  fs.writeFile('./product.json', JSON.stringify(json, null, 2), (err) => {
    if (err) throw err;

    console.log('It\'s saved!');
  });

  res.json(newProduct);
});

app.listen(app.get('port'),function(){
  console.log("server is running at 8080");
});

// var server= http.createServer(app);
// server.listen("8080");
// console.log("Server is running at 8081");
