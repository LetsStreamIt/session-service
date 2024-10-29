import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { standardConfig } from './infrastructure/communication/config'
import { acceptCommands } from './infrastructure/acceptCommands'

const app = express()
const server = http.createServer(app)

// Socket IO server
export const io: Server = new Server(server, {
  path: '/api/session/',
  cors: {
    origin: (_req, callback) => {
      callback(null, true)
    }
  }
})

acceptCommands(io)

const port: number = parseInt(standardConfig.SESSION_SERVICE_PORT, 10)
const hostname: string = standardConfig.SESSION_SERVICE_HOSTNAME

server.listen(port, hostname, () => {
  console.log(`listening on ${hostname}:${port}`)
})
