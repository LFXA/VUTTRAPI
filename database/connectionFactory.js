const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name


// Create a new MongoClient
const client = new MongoClient(url);
function DbConnection(){
//     client.connect(function(err, db) {
//         if (err) throw err;
       
//         var dbo = db.db(dbName);
//         dbo.createCollection("tools", function(err, res) {
//           if (err) throw err;
//           console.log("Collection created!");                
//         });        
// });
return client;
}
  module.exports = function(){    
   return DbConnection;  
}