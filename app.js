
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');
  var mysql      = require('mysql');
  var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'eu-cdbr-west-01.cleardb.com',
    user     : 'bd1a39cbb9bbc2',
    password : 'ae18650b',
    database : 'heroku_e80602e957e88dc',
    debug    :  false
  });

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  console.log("index");
  routes.index(req, res)
});
app.get('/search', routes.search);
app.get('/record', routes.record);
app.get('/auth_clinic', routes.auth_clinic);
app.get('/registr_clinic', routes.registr_clinic);
app.get('/index_clinic', routes.index_clinic);
app.get('/edit_clinic', routes.edit_clinic);

app.get("/api/tests",function(req,res){
  handle_database(req,res);
});

// JSON API

app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server


// app.get("test_page", function(req, res){
//   console.log("### test_page")
//   res.render('test_page');
// });

function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from tests",function(err,rows){
          console.log("### rows", rows);
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
