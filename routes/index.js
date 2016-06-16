
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.auth = function(req, res){
	res.render('partials/auth_clinic')
}

exports.page = function(req, res) {
	var name = req.params.name;
  	res.render('partials/' + name);	
}

exports.partial = function (req, res) {
  var name = req.params.name;
  console.log("### name is",name);
  if (name == "auth_clinic"){
  	res.render('partials/auth_clinic')	
  } else if(name == 1 || name == 2){
  	res.render('partials/partial' + name);
  } else {
  	res.render('partials/' + name);
  }
};