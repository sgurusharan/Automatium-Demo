
/*
 * GET home page.
 */

exports.handleRequest = function(params, res) {
	res.render('index.html', {hello: 'HEllo'});
	
	res.status(200).end();
};