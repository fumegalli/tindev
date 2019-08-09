const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

// Não é a forma mais adequada de guardar essa informação
// Mas por hora é a solução mais simples
const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query

    connectedUsers[user] = socket.id
})

mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-eld9p.mongodb.net/omnistack8?retryWrites=true&w=majority',
    { useNewUrlParser: true }
)

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
    return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)
