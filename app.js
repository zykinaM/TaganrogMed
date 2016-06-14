
/**
 * Module dependencies.
 */

var express = require('express'),
  mysql     = require('mysql'),
  routes    = require('./routes'),
  api       = require('./routes/api');

var app = module.exports = express.createServer();

var db_config_dev = {
    host: 'eu-cdbr-west-01.cleardb.com',
    user: 'bd1a39cbb9bbc2',
    password: 'ae18650b',
    database: 'heroku_e80602e957e88dc'
};
var db_config_prod = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'taganrogmed'
};

var db_config = db_config_prod;
// var db_config = db_config_dev;

var connection;


function handleDisconnect() {
    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config_dev); // Recreate the connection, since
                          // the old one cannot be reused.

    connection.connect(function(err) {                // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                       // to avoid a hot loop, and to allow our node script to
    });                                       // process asynchronous requests in the meantime.
                          // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {  // Connection to the MySQL server is usually
            handleDisconnect();                       // lost due to either server restart, or a
        } else {                                        // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

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

app.get('/test', function(req, res){
  connection.query('SELECT * from clinic', function(err, rows, fields) {
    connection.end();
    if(!err){
      console.log("### rows is:", rows);
    } else {
      console.log("### err", err);
    }
  })
});
app.get('/', routes.index, function(req, res){
  connection.query('SELECT name_spec from specialisation', function(err, rows, fields) {
    connection.end();
    if(!err){
      console.log("### rows is:", rows);
    } else {
      console.log("### err", err);
    }
  })
});
app.get('/search', routes.search);
app.get('/record', routes.record);
app.get('/auth_clinic', routes.auth_clinic);
app.get('/registr_clinic', routes.registr_clinic);
app.get('/index_clinic', routes.index_clinic);
app.get('/edit_clinic', routes.edit_clinic);

app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
