var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var datasourceSchema= new Schema({
  "name":{ type : String, required : true, unique: true, minlength: 2, maxlength: 30},
  "nsid":{type: Schema.Types.ObjectId , ref: 'namespace' ,required : true},
  "ipaddr":{type: String, required : true},
  "port":{type: Number, required : true, minlength: 1, maxlength: 5},
  "description":{type: String},
  "location":{type: String, required : true},
  "createdBy":String,
  "createdOn": { type : Date, default : Date.now },
  "editedBy":String,
  "editedOn": { type : Date, default : Date.now }

});

// var datasource=mongoose.model('datasource', datasourceSchema);

module.exports = datasourceSchema;
