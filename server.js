const express = require('express')
const app = express()
const socketIo = require('socket.io')
const port = process.env.Port ||5005
app.use(express.static('public'))

const server = app.listen(port, console.log(port))

const io = socketIo(server)

io.on('connection', socket => {
    
    socket.on('change', data => {
        console.log('came');
        socket.broadcast.emit('changed', {
            message: data.value,
            name:data.name
        })
    })
    socket.on('submit', data=>{
        const {name, value} = data;
        socket.broadcast.emit('submitted',{
            name, 
            message:value
        })
    })

    socket.on('name', data=>{
        socket.broadcast.emit('nameIsCame',{ name :data.name});
        console.log(data.name)
    })

})