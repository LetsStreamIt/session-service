import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { standardConfig } from './infrastructure/config'
import { acceptCommands } from './infrastructure/acceptCommands'

const app = express()
const server = http.createServer(app)

// Socket IO server
export const io: Server = new Server(server, {
  cors: {
    origin: (_origin: string | undefined, callback: (error: any, allow: boolean) => void) => {
      // Allow all origins
      callback(null, true)
    }
  }
})

acceptCommands(io)

const port: string = standardConfig.LOCAL_PORT

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
