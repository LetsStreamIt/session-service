import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { registerCommands } from './interface/websocket/registerCommands'
import { standardConfig } from './config'

const app = express()
const server = http.createServer(app)

export const io: Server = new Server(server, {
  cors: {
    origin: (origin: string | undefined, callback: (error: any, allow: boolean) => void) => {
      // Allow all origins
      callback(null, true)
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

// Define Namespaces
registerCommands(io)

const port = standardConfig.LOCAL_PORT

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
