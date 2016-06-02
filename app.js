
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api');
    Sequelize = require("sequelize");
    env = process.env.NODE_ENV || "production";
    var config = require(__dirname + '/config.json')[env];
    var sequelize = new Sequelize("mysql://bd1a39cbb9bbc2:ae18650b@eu-cdbr-west-01.cleardb.com/heroku_e80602e957e88dcc?reconnect=true");
    //config.database, config.username, config.password, config);
    var db = {};
    var app = module.exports = express.createServer();
    var models = require("./models"); //place on top of the file



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
console.log("process.env.PORT", process.env.PORT)
app.set('port', process.env.PORT || 3000);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/search', routes.search);
app.get('/record', routes.record);
app.get('/auth_clinic', routes.auth_clinic);
app.get('/registr_clinic', routes.registr_clinic);
app.get('/index_clinic', routes.index_clinic);
app.get('/edit_clinic', routes.edit_clinic);

app.get('/partials/:name', routes.partials);

app.get('/test', routes.test_page);
// JSON API
app.get('/api/test', api.get_test);
app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server
  models.sequelize.sync().then(function(e) {
    // console.log("#port ",app.address().port)
      app.listen(5000, function() {
        console.log("Express server listening on port %d in %s mode", 5000, app.settings.env);
      });
    
  });
