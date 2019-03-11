const mongodbc = 'tools';
var jwt = require('jsonwebtoken');
var mongodb = require('mongodb');
module.exports = function(app){
    app.get('/tools',verifyJWT, function(req, res){
       var tag = req.query.tag;
       var conn = app.database.connectionFactory();
       if(tag){
        conn.connect(function(err, db) {                  
            const dbo = db.db(mongodbc);
            const collection = dbo.collection(mongodbc);
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
               res.status(200).json(result);
            }); 
        });
       }else{
        conn.connect(function(err, db) {                  
            const dbo = db.db(mongodbc);
            const collection = dbo.collection(mongodbc);
            collection.find({tags: tag}).toArray(function(err, result) {
                if (err) throw err;
               res.status(200).json(result);
            });
        });
    }
      return res;
    });

    app.delete('/tools/:id',verifyJWT, function(req, res){
       var id = req.params.id;
        var conn = app.database.connectionFactory();
        conn.connect(function(err, db) {                  
            const dbo = db.db(mongodbc);
            const collection = dbo.collection(mongodbc);
            var myquery = { _id: new mongodb.ObjectID(id)};

            collection.deleteOne(myquery, function(err, result) {
                if (err) throw err;
               res.status(200).json();
            });
        });
      return res;
    });

    app.post('/tools', verifyJWT,function(req, res){
        var tool = req.body;
        req.assert("title", "campo title é obrigatório.").notEmpty();
        req.assert("link", "campo link é obrigatório.").notEmpty();
        req.assert("description", "description é obrigatório").notEmpty();
        req.assert("tags", "tags é obrigatório").notEmpty().isArray();
        
        var errors = req.validationErrors();

        if (errors){
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }
        var conn = app.database.connectionFactory();
        conn.connect(function(err, db) {                  
            const dbo = db.db(mongodbc);
            const collection = dbo.collection(mongodbc);
            collection.insertOne(tool, function(err, result) {
                if (err) {
                    res.status(400).send(err);
                }
                console.log("1 documento inserido");
                
                res.status(201).json(result.ops[0]);
               
                
            });
            
        });
        
        return res;
       
    });
  }

  function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }