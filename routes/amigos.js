module.exports = function(app){
	const amigo = app.controllers.amigos;
	const autenticar = require('../middleware/autenticar');

	app.route('/amigos').get(autenticar, amigo.index);
	app.route('/amigos/create').get(autenticar, amigo.create).post(amigo.salvar);
	app.route('/amigos/show/:id').get(autenticar, amigo.show);
	app.route('/amigos/delete/:id').get(autenticar, amigo.excluir);
	app.route('/amigos/edit/:id').get(autenticar, amigo.editar).post(amigo.update);
}