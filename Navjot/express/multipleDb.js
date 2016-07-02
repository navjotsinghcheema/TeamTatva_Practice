var namespace = require('../schemas/namespaces.js');
var datasource = require('../schemas/datasource.js');
var org = require('../schemas/organisations.js');
var stream = require('../schemas/stream.js');
var watchlist = require('../schemas/watchlists.js');

var namespace = require('../schemas/namespaces.js');
var datasource = require('../schemas/datasource.js');
var org = require('../schemas/organisations.js');
var stream = require('../schemas/stream.js');
var watchlist = require('../schemas/watchlists.js');

var organisations = [];
var namespaces = [];
var datascources = [];
var streams = [];
var watchlists = [];

var mongoose = require('mongoose');
forDb(org,"wipro");

function forDb(schemaName,dbName){
var dbURI = 'mongodb://localhost/' +dbName;
setConnection(dbURI);
mongoose.connection.on('connected',function(){
  var modelName = connection.model('modelName',schemaName);
  getOrganisations(organisations,function(err,organisations){
    console.log(organisations);
  });
});
}

function setConnection(dbURI){
  var connection = mongoose.connect(dbURI);
}


function getOrganisations(organisations,cb){
  org.find({},cb);
}
function createOrgObj(object){
  return{
    name : object.orgName,
    instanceType : "organisation",
    level : 2,
    children : []
  };
}

function getwatchlists(watchlists){
  watchlist.find({},function(err,streams){
  if(err){
    console.log("Error occurred in getting watchlists ", err);
  }
  else {
    console.log(watchlists);
  }
});
}

function getstreams(streams){
  stream.find({},function(err,streams){
  if(err){
    console.log("Error occurred in getting streams ", err);
  }
  else {
    console.log(streams);
  }
});
}


function getDataSources(datascources){
datasource.find({},function(err,datascources){
  if(err){
    console.log("Error occurred in getting datascources ", err);
  }
  else{
    console.log("namespaces",datascources);
  }
});
}

function getNamespaces(namespaces){
namespace.find({}, function(err, namespaces){
  if(err){
    console.log("Error occurred in getting namespaces ", err);
  } else{
    // console.log("namespaces",namespaces);
  }
});
}
