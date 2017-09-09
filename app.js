const express        = require('express'),
    path             = require('path'),
    favicon          = require('static-favicon'),
    logger           = require('morgan'),
    cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'),
    session          = require('express-session'),
    load             = require('express-load'), 
    mongoose         = require('mongoose'),
    flash            = require('express-flash'), 
    moment           = require('moment'),
    expressValidator = require('express-validator');

//conexão com o mongodb
mongoose.connect('mongodb://localhost/acadtec', function(err){
	if(err){
		console.log("Erro ao conectar no mongodb: " + err);
	}else{
		console.log("Conexão com o mongodb efetuada com sucesso!");
	}
});

const app = express();

//middleware
const erros = require('./middleware/erros');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'aulanodejsacadtec009933' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//Helpers
app.use(function(req,res,next){
	res.locals.session  = req.session.usuario;
	res.locals.isLogged = req.session.usuario ? true : false;
	res.locals.moment   = moment;
	next();
});

load('models').then('controllers').then('routes').into(app);

//middleware
app.use(erros.notfound);
app.use(erros.serverError);

app.listen(3000, function() {
    console.log('Express rodando na porta 3000');
});
