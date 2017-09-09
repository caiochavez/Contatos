const validacao = require('../validacoes/contatos');

module.exports = function(app){

	const Amigo = app.models.amigos;

	const ContatoController = {
		index: function(req,res){
			let id = req.params.id;
			Amigo.findById(id, function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao listar contatos: ' + err);
					res.render('contatos/index', {lista: null});
				}
				res.render('contatos/index', {lista: dados.contatos, id: id});
			});
		},

		create: function(req,res){
			res.render('contatos/create.jade', {model: new Amigo(), id: req.params.id});
		},

		post: function(req,res){
			if(validacao(req,res)){
				let id = req.params.id;
			    Amigo.findById(id, function(err,dados){
			    	let contato = req.body.contatos;
			    	dados.contatos.push(contato);
			    	dados.save(function(err){
					if(err){
					   req.flash('erro', 'Erro ao cadastrar contato: ' + err);
				    }else{
				    	req.flash('info', 'Contato adicionado com sucesso!');
				    	res.redirect('/contatos/'+id);
				    }
				});
			});

			}else{
				res.render('contatos/create.jade', {model: req.body, id: req.params.id});
			}
	
		},

		excluir: function(req,res){
			let id = req.params.amigo;
			Amigo.findById(id, function(err,dados){
				if(err){
					res.json(400, 'Erro ao excluir contato: ' + err);
				}else{
					let contatoID = req.params.id;
					dados.contatos.id(contatoID).remove();
					dados.save(function(err){
						if(err){
						   res.json(400, 'Erro ao excluir contato: ' + err);		
						}else{
							res.json(200, 'Registro excluido com sucesse');
						}
					});
				}
			});
		}

	}

	return ContatoController;

}