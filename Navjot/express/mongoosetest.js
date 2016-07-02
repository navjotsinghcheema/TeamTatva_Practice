var mongoose = require( 'mongoose' );

var tattva= function(dbName){
  var dbURI = 'mongodb://localhost:27017/'+dbName;
  var connection=mongoose.createConnection(dbURI);
  return connection;
  // connection.on('connected', function() {
  //     logger.debug('Mongoose connected to ' + dbURI);
  // });
  // connection.on('error', function(err) {
  //     logger.debug('Mongoose connection error: ' + err);
  // });
  // connection.on('disconnected', function() {
  //     logger.debug('Mongoose disconnected');
  // });
  //
  // process.on('SIGINT', function() {
  //
  //     mongoose.connection.close(function() {
  //         logger.debug('Mongoose disconnected through app termination');
  //         process.exit(0);
  //     });
  // });
}
module.exports=tattva;
