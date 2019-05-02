const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
const cors = require('cors');
const access = require('access-control')
const core = access({ maxAge: "8 hour", credentials: true, origin: true })
const version = '/api/v1/'
const port = process.env.PORT || 3013;
app.use(core);
app.use(
    cors({
        optionsSuccessStatus: 200,
        preflightContinue: true,
        credentials: true
    })
)
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}));

io.on('connection', function (socket) {
    console.log('Conexted');
    socket.on('disicnnect', function () {
        console.log('Disconnect');
    })
    socket.on('sent-message', function (message) {
        io.sockets.emit('new-message', message)
    })
})
var user_login = require('./Router/login')
var user_insert = require('./Router/user')
app.use(version + 'user_login', user_login)
app.use(version + 'user_insert', user_insert)
http.listen(port, function () {
    console.log('running in port http://localhost:' + port)
})
