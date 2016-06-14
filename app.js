
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');
  var mysql      = require('mysql');
  var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'eu-cdbr-west-01.cleardb.com',
    user     : 'bd1a39cbb9bbc2',
    password : 'ae18650b',
    database : 'heroku_e80602e957e88dc',
    debug    :  false
  });


var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
  // TODO
}; 



// Routes
app.get('/', routes.index);
//app.get('/partial/auth_clinic', routes.auth);
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/name', api.name);

app.get("/api/tests",function(req,res){
  handle_database(req,res);
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/

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

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});