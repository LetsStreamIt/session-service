import { createServer } from 'node:http'
import { type AddressInfo } from 'node:net'
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client'
import { Server, type Socket as ServerSocket } from 'socket.io'

export function commonBefore(): Promise<[Server, ClientSocket, ServerSocket]> {
  return new Promise((resolve) => {
    const httpServer = createServer()
    const io: Server = new Server(httpServer)
    let clientSocket: ClientSocket
    let serverSocket: ServerSocket

    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port
      clientSocket = ioc(`http://localhost:${port}`)
      io.on('connection', (socket) => {
        serverSocket = socket
      })
      clientSocket.on('connect', () => resolve([io, clientSocket, serverSocket]))
    })
  })
}

export function commonAfter(io: Server, clientSocket: ClientSocket) {
  io.close()
  clientSocket.disconnect()
}
