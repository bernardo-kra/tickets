const { MongoClient } = require("mongodb");
require('dotenv/config');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');

// Substitua a string uri pela string de conexão do MongoDB
const uri = process.env.MYURI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = express();
app.use(cors())
app.use(express.json());

// Middleware para verificar o token de acesso em todas as rotas protegidas
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ mensagem: 'Token de acesso não fornecido' });
    }

    jwt.verify(token, process.env.TOKEN_SIGNATURE, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: 'Token de acesso inválido' });
        }

        req.user = decoded;
        next();
    });
};

// app.use(verificarToken)

app.post('/user', async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        await client.connect();
        const database = client.db('tickets');
        const collection = database.collection('user');

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await collection.insertOne({ firstName, lastName, email, phone, password: hashedPassword });
        console.log(result);
        res.json({ message: `Insert _id: ${result.insertedId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

app.get("/user", async (req, res) => {
    res.send(req.body)
})

app.post('/login', async (req, res) => {
    try {
        await client.connect();
        const { email, password } = req.body;

        // Buscar usuário no banco de dados
        const database = client.db('tickets');
        const collection = database.collection('user');
        const user = await collection.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SIGNATURE, { expiresIn: '3h' });

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                nome: user.nome,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

app.get('/protegido', verificarToken, (req, res) => {
    return res.status(200).json({ mensagem: 'Acesso permitido', user: req.user });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});