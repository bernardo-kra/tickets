const { MongoClient } = require("mongodb")
var ObjectId = require('mongodb').ObjectId
require('dotenv/config')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const uri = process.env.MYURI
const client = new MongoClient(uri, { useUnifiedTopology: true })
const listRoutes = require('express-list-routes')

const app = express()
app.use(cors())
app.use(express.json())


const verificarToken = (req, res, next) => {
    const removeBearer = (token) => {
        const pattern = /bearer /gi
        const hasBearer = pattern.test(token)
        if (hasBearer) {
            return token.replace(pattern, '')
        }
        return token
    }

    const token = removeBearer(req.header('Authorization'))
    
    if (!token) {
        return res.status(401).json({ mensagem: 'Access token not provided' })
    }

    jwt.verify(token, process.env.TOKEN_SIGNATURE, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: 'Invalid access token' })
        }

        req.user = decoded
        next()
    })
}

app.post('/user', async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body

    try {
        await client.connect()
        const database = client.db('tickets')
        const collection = database.collection('user')

        const existingUser = await collection.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ja cadastrado' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await collection.insertOne({ firstName, lastName, email, phone, password: hashedPassword })
        res.json({ message: `Insert _id: ${result.insertedId}` })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    } finally {
        await client.close()
    }
})

app.get("/user", async (req, res) => {
    res.send(req.body)
})

app.post('/login', async (req, res) => {
    try {
        await client.connect()
        const { email, password } = req.body

        // Buscar usuário no banco de dados
        const database = client.db('tickets')
        const collection = database.collection('user')
        const user = await collection.findOne({ email })

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({mensagem: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SIGNATURE, { expiresIn: '3h' })

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                nome: user.nome,
            },
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensagem: 'Internal server error' })
    }
})

app.post('/create-tickets', verificarToken, async (req, res) => {
    const { eventName, location, date, details, contact, startAt, endAt } = req.body
    const creatorId = req.user.id
    const sector = req.body.sector

    try {
        await client.connect()
        const database = client.db('tickets')
        const collection = database.collection('tickets')

        const result = await collection.insertOne({ eventName, location, date, details, contact, startAt, endAt, creatorId, sector })

        res.json({ message: `Insert _id: ${result.insertedId}`, sector })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    } finally {
        await client.close()
    }
})

app.put('/update/:id', verificarToken, async (req, res) => {
    const ticketId = req.params.id
    const { eventName, location, date, details, contact, startAt, endAt, sector } = req.body
    const userId = req.user.id

    try {
        await client.connect()
        const database = client.db('tickets')
        const collection = database.collection('tickets')

        const ticket = await collection.findOne({ _id: new ObjectId(ticketId) })
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' })
        }

        if (ticket.creatorId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this ticket' })
        }

        const result = await collection.updateOne({ _id: new ObjectId(ticketId) }, { $set: { eventName, location, date, details, contact, startAt, endAt, sector } })

        if (result.modifiedCount === 0) {
            return res.status(500).json({ message: 'Failed to update ticket' })
        }

        res.json({ message: `Ticket updated: ${ticketId}` })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    } finally {
        await client.close()
    }
})

app.get('/tickets', async (req, res) => {
    try {
        await client.connect()
        const database = client.db('tickets')
        const collection = database.collection('tickets')

        const tickets = await collection.find().toArray()

        res.json(tickets)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    } finally {
        await client.close()
    }
})

app.get('/my-tickets', verificarToken, async (req, res) => {
    try {
        await client.connect()
        const database = client.db('tickets')
        const collection = database.collection('tickets')
        const creatorId = req.user.id

        const tickets = await collection.find({ creatorId: creatorId }).toArray()

        res.json(tickets)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    } finally {
        await client.close()
    }
})

app.get('/my-tickets/:id', verificarToken, async (req, res) => {
    const { id } = req.params
    try {
        await client.connect()
        const database = client.db('tickets')
        const collection = database.collection('tickets')
        const ticket = await collection.findOne({ _id: new ObjectId(id) })

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' })
        }
        return res.json(ticket)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Server error' })
    }
})

app.get('/tickets/:id', async (req, res) => {
    const { id } = req.params

    try {
        await client.connect()
        const database = client.db('tickets')
        const collection = database.collection('tickets')

        const ticket = await collection.findOne({ _id: new ObjectId(id) })
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' })
        }
        return res.json(ticket)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Server error' })
    }
})

app.get('/protect', verificarToken, (req, res) => {
    return res.status(200).json({ mensagem: 'Access allowed', user: req.user })
})

listRoutes(app)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
