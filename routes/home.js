module.exports = function(app){

    const home = app.controllers.home;
    const autenticar = require('../middleware/autenticar.js');
    
	app.route('/').get(home.login).post(home.autenticacao);
	app.route('/home').get(autenticar, home.index);
	app.route('/logout').get(home.logout);
	app.route('/email').get(autenticar, home.email).post(home.enviar);
}