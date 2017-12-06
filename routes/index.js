
/*
 * GET home page.
 */

exports.handleRequest = function(req, res) {
	res.render('index.html');
	
	res.status(200).end();
};