const nodemailer = require('nodemailer');

module.exports = function(app){

const validacao = require('../validacoes/autenticacoes.js');
const Usuario = app.models.usuarios;

	const homeController = {
		index: function(res,res){
            res.render('home/index.jade');
		},

		login: function(req,res){
			res.render('home/login.jade');
		},

		autenticacao: function(req,res){
			let usuario  = new Usuario();
			let email    = req.body.email;
			let password = req.body.password;

			if(validacao(req,res)){
				Usuario.findOne({'email': email}, function(err,data){
					if(err){
						req.flash('erro', 'Erro ao entrar no sistema!' + err);
						res.redirect('/');
					}else if(!data){
						req.flash('erro', 'Email não encontrado!');
						res.redirect('/');
					}else if(!usuario.validPassword(password, data.password)){
						req.flash('erro', 'Senha inválida!');
						res.redirect('/');
					}else{
					    //Cria uma sessão
						req.session.usuario = data;
						res.redirect('/home');
					}
				});
			}else{
				res.redirect('/');
			}
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},

		email: function(req,res){
			res.render('home/email.jade');
		}

		/*enviar: function(req,res){
			let transport = nodemailer.createTransport({
				host: "smtp.mandrillapp.com",
				port: 587,
				auth: {
					user: "caiochaves",
					pass: ""
				}
			});

			let mailOptions = {
				from: req.body.nome+" <"+req.body.email+">",
				to: "caaiochavez@gmail.com",
				subject: req.body.assunto,
				text: req.body.mensagem
			}

			transport.sendMail(mailOptions, function(err, response){
				if(err){
					req.flash('erro', 'Erro ao enviar Email: ' + err);
					res.redirect('/email');
				}else{
					req.flash('info', 'Email enviado com sucesso!');
					res.redirect('/email');
				}
			});
		}*/
	}

	return homeController;
}