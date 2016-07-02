//
// var schemaOptions = {collection: "users"};
//
// var UserSchema = new mongoose.Schema({
//   email: {type: String, required:true, index:true},
//   fname: {type:String, required:true}
// }, schemaOptions);
//
// module.exports = UserSchema;
//

//----------------
// var
var modelProvider = (function() {

// var test = "accessible";

  //To keep the instances of models recently created for a specific database
  var modelMap = {};

  //To preserve the connection object and ensure limited number of connections are opened
  var dbConnectionMap = {};

  process.on('SIGINT', function() {
    dbConnectionMap.forEach(function(dbConnection) {
      dbConnection.close();
    })
  });

  var getModel = function(schemaObj, dbName) {
    if(!dbName) return;
    var modelName = schemaObj.get('collection');
    var modelObj = getFromMap(dbName, modelName);
    if(!modelObj) {
      var connection = getDBConnection(dbName);
      modelObj = connection.model(modelName, schemaObj);
      pushToMap(dbName, modelName, modelObj);
    }
    return modelObj;
  };

 var getFromMap = function(dbName, modelName) {
    var modelObj = undefined;
    if(modelMap[dbName]) {
      if(modelMap[dbName][modelName]) {
        modelObj = modelMap[dbName][modelName];
      }
    }
    return modelObj;
  };

  var pushToMap = function(dbName, modelName, modelObj) {
    if( ! modelMap[dbName] ) {
      modelMap[dbName] = { modelName: modelObj }
    } else if(modelMap[dbName][modelName]) {
      console.log("Over writing the existing model Obj");
      modelMap[dbName][modelName] = modelObj;
    } else {
      modelMap[dbName][modelName] = modelObj;
    }
  };

  var getDBConnection = function(dbName) {
    var connection = undefined;

    if(dbConnectionMap[dbName]) {
      connection = dbConnectionMap[dbName]
    } else {
      var dbURI = 'mongodb://localhost:27017/'+dbName;
      connection = mongoose.connection(dbURI);
      dbConnectionMap[dbName] = connection;
    }
    return connection;
  };

})();

module.exports = modelProvider;

///------

//client code

//var UserSchema = require('userschemadefinitionfilename');
const userSchemaObj = require('../schemas/namespaces');
// console.log(modelProvider.test);
// var modelProvider = require('modelprovider');
var UserModel = modelProvider.getmodel(userSchemaObj, 'wipro');

var userDoc = new UserModel({name:"Navjot",orgSite:"wipro"});
userDoc.save(function(err, savedUserObj){
  if(!err) {
    console.log("Success: ", savedUserObj);
  } else {
    console.log("Error occurred in creating user object: ", err);
  }
})
