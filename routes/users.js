
//routes/users.js

const express = require('express');

//importa variavel supabase do arquivo app.js
const { supabase } = require('../app');

const router = express.Router(); //Cria um novo roteador

//referencia para o arquivo CRUD para users
const usersController = require('../controllers/usersController');

// Rota para cadastrar um novo usuario
router.post('/', usersController.createUser);
// Rota (antiga) para cadastrar um novo usuário
//router.post('/', async (req, res) => {
//    try {
//      const { name, email } = req.body;
//  
//      const { data, error } = await supabase
//        .from('users')
//        .insert({ name, email });
//  
//      if (error) {
//        return res.status(500).json({ error: error.message });
//      }
//  
//     res.status(201).json(data);
//    } catch (error) {
//      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
//    }
//  });
  

// Rota para consultar todos os usuarios
router.get('/', usersController.getAllUsers);
// Rota (antiga) para consultar todos os usuários
//router.get('/', async (req, res) => {
//    try {
//      const { data, error } = await supabase.from('users').select('*');
//  
//     if (error) {
//        return res.status(500).json({ error: error.message });
//      }
//  
//      res.status(200).json(data);
//    } catch (error) {
//      res.status(500).json({ error: 'Erro ao consultar usuários.' });
//    }
//  });


// Exclui um usuario
router.delete('/:id', usersController.deleteUser);
// Rota para excluir um usuário
//router.delete('/:id', async (req, res) => {
//    try {
//      const { id } = req.params;
//  
//      const { error } = await supabase
//        .from('users')
//        .delete()
//        .eq('id', id);
//  
//      if (error) {
//        return res.status(500).json({ error: error.message });
//      }
//  
//      res.status(204).send(); // 204 No Content
//    } catch (error) {
//      res.status(500).json({ error: 'Erro ao excluir usuário.' });
//    }
//  });


// Atualiza um usuario
router.put('/:id', usersController.updateUser);


//exporta o roteador
module.exports = router;

