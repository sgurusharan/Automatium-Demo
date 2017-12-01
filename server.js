var express = require('express'),
    app     = express(),
    morgan  = require('morgan'),
    routes = require('./routes'),
	path = require('path');

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

app.get('/', routes.index);
app.get('/*')

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;