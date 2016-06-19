
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

app.get("/api/db/:table",function(req,res){
  console.log("### api/db/:table")
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
        // console.log('req: ' ,req);
        var name = req.params.name;
        var table = req.params.table;
        if(table == 'clinic'){
          connection.query("select * from clinic where ID_clin=" + req.query.id_clin + ";",function(err,rows){
              console.log("### rows", rows);
              connection.release();
              if(!err && rows.length) {
                  // res.redirect('/clinic');
                  res.json(rows);
              } else {
                  res.json({'error': true, 'message': 'Something was wrong:', err})
              }          
          });

          connection.on('error', function(err) {      
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;     
          });

        } else if (table == 'specialisation') {
            connection.query("select name_spec from specialisation;",function(err,rows){
              console.log("### spec", rows);
              connection.release();
              if(!err && rows.length) {
                  // res.redirect('/clinic');
                  res.json(rows);
              } else {
                  res.json({'error': true, 'message': 'Something was wrong:', err})
              }          
          });

          connection.on('error', function(err) {      
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;     
          }); 
        } else if (false){

        } else {
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
        }
  });
}

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});