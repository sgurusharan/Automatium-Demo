/*
 * register controller
 */

function returnError(res, notificationText, params) {
	res.render('index.html', {
		registerEmail: params.registerEmail,
		registerPassword: params.registerPassword,
		registerRePassword: params.registerRePassword,
		notification: notificationText
	});
	res.status(200).end();
}

exports.handleRequest = function(req, res) {
	
	var fs = require('fs');
	
	fs.readFile('data/users.json', function(err, data) {
		var users = JSON.parse(data);
		var us = require('underscore');
		console.log(req.body);
		
		var authenticatedUser = us.findWhere(users, {email: req.body.registerEmail});
		
		if (authenticatedUser !== undefined) {
			returnError(res, 'Email ID already taken - please try logging in', req.body);
			return;
		}
		
		if (req.body.registerPassword.length < 8) {
			returnError(res, 'Password should be atleast 8 characters long', req.body);
			return;
		}
		
		if(req.body.registerPassword !== req.body.registerRePassword) {
			returnError(res, 'Passwords do not match', req.body);
			return;
		}
		
		var regex = /^\w[\w\.]*@[\w\.]+\.\w+$/;
		
		if (!regex.test(req.body.registerEmail)) {
			returnError(res, 'Please enter a valid email ID', req.body);
			return;
		}
		else {
			returnError(res, 'Valid email ID', req.body);
			return;
		}
	
	});
};