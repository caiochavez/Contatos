module.exports = function(req,res){
	req.assert('email', 'Email inválido!').isEmail();
	req.assert('password', 'Sua senha deve conter de 6 a 10 caracteres.').len(6,10);

	const validacoesErros = req.validationErrors() || [];

	if(validacoesErros.length > 0){
		validacoesErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	}
	return true;
}