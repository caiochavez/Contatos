module.exports = function(app){
	const contato = app.controllers.contatos;
	const autenticar = require('../middleware/autenticar');

	app.route('/contatos/:id').get(autenticar, contato.index);
	app.route('/contatos/create/:id').get(autenticar, contato.create).post(contato.post);
	app.route('/contatos/delete/:id/:amigo').post(contato.excluir);
}