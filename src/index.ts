import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { registerCommands } from './interface/websocket/registerCommands'

process.env.DEBUG = 'socket.io:*'

const app = express()
const server = http.createServer(app)

export const io: Server = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

// Define Namespaces
registerCommands(io)

server.listen(4000, () => {
  console.log('listening on *:4000')
})
