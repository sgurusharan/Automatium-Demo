var express = require('express'),
    app     = express(),
    morgan  = require('morgan'),
    url = require('url'),
	path = require('path');

var routes_dir = './routes';

Object.assign=require('object-assign');

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


//error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

var handleRequest = function(req, res) {
	var q = url.parse(req.url);
	console.log(q);
	if (q.pathname === '/') {
		res.redirect('/index' + q.search);
		return;
	}
	try {
		var router = require(routes_dir + q.pathname);
		router.handleRequest(req.query, res);
	}
	catch (err) {
		console.error(err.stack);
		if (err.code === 'MODULE_NOT_FOUND') {
			res.status(404).send("The page you are looking for is not found!");
		}
		else {
			res.status(500).send('Unexpected error when processing your request!');
		}
	}
};

app.get('/*', handleRequest);

app.post('/*', handleRequest);

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;