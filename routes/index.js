
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.auth = function(req, res){
	res.render('partials/auth_clinic')
}

exports.partial = function (req, res) {
  var name = req.params.name;
  if (name == "auth_clinic"){
  	res.render('partials/auth_clinic')	
  } else {
  	res.render('partials/partial' + name);
  }
};