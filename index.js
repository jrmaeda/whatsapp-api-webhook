const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Verificação do webhook (GET)
app.get('/webhook', (req, res) => {
  const verifyToken = 'idunas123'; // use o mesmo na Meta

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === verifyToken) {
    console.log('✅ Webhook verificado com sucesso!');
    res.status(200).send(challenge);
  } else {
    res.status(403).send('❌ Verificação falhou');
  }
});

// Recebimento de mensagens (POST)
app.post('/webhook', (req, res) => {
  console.log('📨 Evento recebido do WhatsApp:');
  console.dir(req.body, { depth: null });
  res.sendStatus(200);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Webhook rodando na porta ${PORT}`);
});
