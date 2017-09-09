module.exports = function(app){
      
      const validacao = require('../validacoes/usuarios.js');
      const Usuario   = app.models.usuarios;

      const usuarioController = {
         index: function(req,res){
            Usuario.find(function(err,dados){
               if(err){
                   req.flash('erro', 'Erro ao buscar usuários: ' + err);
                   res.redirect('/usuarios');
               }else{
                    res.render('usuarios/index.jade', {lista: dados});
               }
            });
         },

         create: function(req,res){
            res.render('usuarios/create.jade', {user: new Usuario()});
         },

         post: function(req,res){
            if(validacao(req,res)){
               let model      = new Usuario();
               model.nome     = req.body.nome;
               model.email    = req.body.email;
               model.site     = req.body.site;
               model.password = model.generateHash(req.body.password);

               Usuario.findOne({'email': model.email}, function(err,data){
                  if(data){
                     req.flash('erro', 'Email encontra-se cadastrado, tente outro!');
                     res.render('usuarios/create', {user: model});
                  }else{
                      model.save(function(err){
                         if(err){
                           req.flash('erro', 'Erro ao cadastrar: ' + err);
                           res.render('usuarios/create', {user: req.body});
                        }else{
                           req.flash('info', 'Registro cadastrado com sucesso!');
                           res.redirect('/usuarios');
                        }
                     });
                   }
               });
            }else{
               res.render('usuarios/create.jade', {user: req.body});
            }
      
         },

         show: function(req,res){
            Usuario.findById(req.params.id, function(err,dados){
                if(err){
                  req.flash('erro', 'Erro ao vizualizar usuário: ' + err);
                  res.redirect('/usuarios');
                }else{
                  res.render('usuarios/show', {dados: dados});
                }
            });
         },

         delete: function(req,res){
            Usuario.remove({_id: req.params.id}, function(err){
               if(err){
                  req.flash('erro', 'Erro ao excluir usuário: ' + err);
                  res.redirect('/usuarios');
               }else{
                  req.flash('info', 'Registro excluido com sucesso!');
                  res.redirect('/usuarios');
               }
            });
         },

         edit: function(req,res){
            
               Usuario.findById(req.params.id, function(err,dados){
                  if(err){
                     req.flash('erro', 'Erro ao editar usuário: ' + err);
                     res.redirect('/usuarios');
               }else{
                  res.render('usuarios/edit', {model: dados});
               }
               });
         },

         update: function(req,res){
          if(validacao(req,res)){
            Usuario.findById(req.params.id, function(err,dados){
                let model = dados;
                model.site = req.body.site;
                model.password = req.body.password;

                model.save(function(err){
                  if(err){
                     req.flash('erro', 'Erro ao atualizar: ' + err);
                     res.render('usuarios/edit', {model: model});
                   }else{
                     req.flash('info', 'Registro atualizado com sucesso!');
                     res.redirect('/usuarios');
                   }
               });

            });

         }else{
            res.render('usuarios/edit', {model: req.body})
         }        
      }
   }

      return usuarioController;
}