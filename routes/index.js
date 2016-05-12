
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.search = function(req, res){
  res.render('search');
};

exports.auth_clinic = function(req, res){
  res.render('auth_clinic');
};

exports.registr_clinic = function(req, res){
  res.render('registr_clinic');
};

exports.index_clinic = function(req, res){
  res.render('index_clinic');
};

exports.edit_clinic = function(req, res){
  res.render('edit_clinic');
};


exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};