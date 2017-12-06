/*
 * login controller
 */

exports.handleRequest = function(req, res) {
	
	var fs = require('fs');
	
	fs.readFile('data/users.json', function(err, data) {
		var users = JSON.parse(data);
		var us = require('underscore');
		console.log(req.body);
		var authenticatedUser = us.findWhere(users, {email: req.body.loginEmail, password: req.body.loginPassword});
		if (authenticatedUser === undefined) {
			res.render('index.html', {
				loginEmail: req.body.loginEmail,
				loginPassword: req.body.loginPassword,
				notification: "Invalid login credentials"
			});
			res.status(200).end();
			return;
		}
		console.log(authenticatedUser);
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(authenticatedUser));
		res.end();
	});
};