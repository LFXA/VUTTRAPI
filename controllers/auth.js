var jwt = require('jsonwebtoken');

module.exports = function(app){
app.post('/login', (req, res, next) => {
  if(req.body.user === 'lucas' && req.body.pwd === '123'){
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    res.status(200).send({ auth: true, token: token });
  }
  
  res.status(500).send('Login inválido!');
});

app.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});
}