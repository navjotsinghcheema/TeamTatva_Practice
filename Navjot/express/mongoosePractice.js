var namespace = require('../schemas/namespaces.js');
var datasource = require('../schemas/datasource.js');
var organisation = require('../schemas/organisations.js');
var stream = require('../schemas/stream.js');
var watchlist = require('../schemas/watchlists.js');
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

createData(data);

});
mongoose.connection.on('error', function(err) {console.log("error : ",err);});
mongoose.connection.on('disconnected', function() {console.log("You killed me:(((");});


function createData(data){

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


function getOrganisations(organisations){
    organisation.find({},function(err,organisations){
    if(err){
      console.log("Error occurred in getting organisations ", err);
    }
    else {
      console.log(organisations);
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
