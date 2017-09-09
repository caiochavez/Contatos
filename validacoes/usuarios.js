const url = require('url');

module.exports = function(req,res){
	const createUrl = url.parse(req.url).pathname == "/usuarios/create";
	const updateUrl = !createUrl;

	req.assert('nome', 'Informe o seu Nome').notEmpty();
	if(createUrl){
		req.assert('email', 'Email inválido').isEmail();
		req.assert('password','Sua senha deve conter de 6 a 10 caracteres').len(6,10);
	}
	req.assert('site','A URL do site não é válida').isURL();

	const validateErros = req.validationErrors() || [];

	//verificar se a senha confere
	if(req.body.password != req.body.password_confirmar){
		validateErros.push({msg: 'Senha não confere'});
	}

	if(validateErros.length > 0){
		validateErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	}else{
		return true;
	}
}