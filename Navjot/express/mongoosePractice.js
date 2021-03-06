var namespace = require('../schemas/namespaces.js');
var datasource = require('../schemas/datasource.js');
var org = require('../schemas/organisations.js');
var stream = require('../schemas/stream.js');
var watchlist = require('../schemas/watchlists.js');

//creating level1 of data
var data = {
  name : "Tattva",
  instanceType : "superUser",
  level : 1,
  children : []
};

var organisations = [];
var namespaces = [];
var datascources = [];
var streams = [];
var watchlists = [];
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/wipro';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
// console.log("mongoose connected to wipro");

// getNamespaces(namespaces);
// getDataSources(datasource);
// getOrganisations(organisations);
// getstreams(streams);
// getwatchlists(watchlists);

createData();

});
mongoose.connection.on('error', function(err) {console.log("error : ",err);});
mongoose.connection.on('disconnected', function() {console.log("You killed me:(((");});


function createData(){
  var nodeobj;
  //creating level2 of data
  getOrganisations(organisations,function(err,organisations){
    if(err){
      console.log("error reading organisations err",err);
    }
    for(var i=0;i<organisations.length;i++)
    {
      nodeobj=createOrgObj(organisations[i]);
      data.children.push(nodeobj);
    }
      getNamespaces(namespaces,function(err,organisations){

      });

    console.log(data);
  });
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

function getOrganisations(organisations,cb){
    org.find({},cb);
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
