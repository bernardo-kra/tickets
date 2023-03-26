const express = require('express');
const app = express();

const { MongoClient } = require("mongodb");

// Substitua a string uri pela string de conexão do MongoDB
const uri = "mongodb+srv://ber:admin@cluster0.vakij6c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

app.use(express.json());

app.post('/user', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ticket');
        const collection = database.collection('user');
        const { name, lastname, email, phone, password } = req.body;
        const userDocument = { name, lastname, email, phone, password };
        const result = await collection.insertOne(userDocument);
        res.json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    } finally {
        await client.close();
    }
});

app.listen(5173, () => {
    console.log('Servidor iniciado na porta 5173!');
}); 