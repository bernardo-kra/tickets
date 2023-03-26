const { MongoClient } = require("mongodb");
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');

// Substitua a string uri pela string de conexão do MongoDB
const uri = "mongodb+srv://ber:admin@cluster0.vakij6c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = express();
app.use(cors())
app.use(express.json());

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});