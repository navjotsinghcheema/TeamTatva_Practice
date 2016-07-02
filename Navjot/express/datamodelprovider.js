var connectionObj=require("./mongoosetest");
var namespace= require("../schemas/namespaces.js");
// var namespace=require("./namespaces");

var datamodelprovider= function(modelName,orgSite){
    var connection = new connectionObj(orgSite);
    var modelName1 = connection.model('modelName', modelName);
    return modelName1;
}
var modelName = datamodelprovider("namespace","wipro");
console.log(modelName);








// modelname.find({},function(err,data){
//   if(err){
//     console.log("error:",err);
//   }
//   console.log(dbName,"query:",model,":\n",data);
// });
