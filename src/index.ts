import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { registerCommands } from './presentation/registerCommands'

process.env.DEBUG = 'socket.io:*'

const app = express()
const server = http.createServer(app)

// export const io: Server = require('socket.io')(server, {
//   cors: {
//     origin: (origin: string | undefined, callback: (error: any, allow: boolean) => void) => {
//       // Allow all origins
//       callback(null, true)
//     },
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['my-custom-header'],
//     credentials: true
//   }
// })

// server-side
export const io: Server = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

// Define Namespaces
registerCommands(io)

server.listen(3000, () => {
  console.log('listening on *:3000')
})
