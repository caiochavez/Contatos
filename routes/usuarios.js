module.exports = function(app){

	const usuario = app.controllers.usuarios;
	const autenticar = require('../middleware/autenticar.js');

	app.route('/usuarios').get(autenticar, usuario.index);
	app.route('/usuarios/create').get(autenticar, usuario.create).post(usuario.post);
	app.route('/usuarios/show/:id').get(autenticar, usuario.show);
	app.route('/usuarios/delete/:id').get(autenticar, usuario.delete);
	app.route('/usuarios/edit/:id').get(autenticar, usuario.edit).post(usuario.update);
}