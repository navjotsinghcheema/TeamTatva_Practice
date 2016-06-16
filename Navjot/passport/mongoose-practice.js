// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define a Schema
var animal = new Schema(
  {
    name:String,
    type:String
  }
);

//assign a func
animal.methods.findSimilarTypes = function(cb){
  console.log(cb);
return this.model('landAnimal').find({ type: this.type }, cb);
}

var landAnimal = mongoose.model('landAnimal',animal);
var kutta = new landAnimal({type:'kutta'});
var stBernard = new landAnimal({name:'st Bernard',type:'kutta'})

kutta.findSimilarTypes(function(err,kutte){
  console.log("bhow-wow");
  console.log(kutte);
});
// var kutte=bullDog.findSimilarTypes("kutte");
// console.log(kutte);
