const express = require('express');
const cors = require('cors'); //importa a biblioteca cors

const app = express();
const port = 3000;



const { createClient } = require('@supabase/supabase-js');
// Credenciais da sua base de dados Supabase
const supabaseUrl = 'https://obrtgyxyjvxjoirowjhe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9icnRneXh5anZ4am9pcm93amhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MTc1NTMsImV4cCI6MjA0MzQ5MzU1M30.H1Qfamo2091ThoO4vEiw5iuL0sRzkT4ETo8xx3rBm2I';
// Cria um cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);



// import Supabase Module
//import { createClient } from '@supabase/supabase-js';
// Create a single supabase client for interacting with your database
//const supabase = createClient('https://obrtgyxyjvxjoirowjhe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9icnRneXh5anZ4am9pcm93amhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MTc1NTMsImV4cCI6MjA0MzQ5MzU1M30.H1Qfamo2091ThoO4vEiw5iuL0sRzkT4ETo8xx3rBm2I');



// Habilita CORS para permitir requisições da interface web
app.use(cors()); //aplica o middleware cors a todas as rotas
app.use(express.json()); // Middleware para analisar dados JSON



// Rota para cadastrar um novo usuário
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;

    const { data, error } = await supabase
      .from('users')
      .insert({ name, email });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});


// Rota para consultar todos os usuários
app.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar usuários.' });
  }
});


// Rota para excluir um usuário
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
});


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
