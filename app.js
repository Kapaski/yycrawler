
/**
 * Module dependencies.
 */

var express = require('express');
var list=require('./routes/list.js')
var tiantian = require('./routes/index_tiantian');
var yaya = require('./routes/index_yaya');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8889);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', yaya.index_yaya);
app.get('/list',list.list)
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
