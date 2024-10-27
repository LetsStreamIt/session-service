import { Socket as ClientSocket } from 'socket.io-client'
import { Server, Socket as ServerSocket } from 'socket.io'
import { expect } from 'chai'
import { ISessionService, SessionService } from '../../../../src/application/sessionService'
import { acceptCreateSessionCommand } from '../../../../src/infrastructure/adapters/websocket/commands/session/createSession'
import { User, UserId } from '../../../../src/domain/common/user'
import { CommandType } from '../../../../src/domain/common/command/command'
import {
  CreateSessionResponse,
  ResponseStatus
} from '../../../../src/domain/common/command/response'
import { commonAfter, commonBefore } from './socketIoTestUtils'

describe('create session message', () => {
  let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket
  const sessionService: ISessionService = new SessionService()
  const user: User = new User(new UserId('testUser@email.com'), 'testUsername')

  before((done) => {
    commonBefore().then(([ioServer, cSocket, sSocket]) => {
      io = ioServer
      serverSocket = sSocket
      clientSocket = cSocket
      acceptCreateSessionCommand(serverSocket, user, sessionService)
      done()
    })
  })

  after(() => commonAfter(io, clientSocket))

  it('should create a session if the provided URL is valid Youtube Video', (done) => {
    const validYoutubeUrl: string = 'https://www.youtube.com/watch?v=M7lc1UVf-VE'
    clientSocket.emit(
      CommandType.CREATE_SESSION,
      { videoUrl: validYoutubeUrl },
      (response: CreateSessionResponse) => {
        expect(response.content.status).to.be.equal(ResponseStatus.SUCCESS)
        done()
      }
    )
  })

  it('should not create a session if the provided URL is not a Youtube Video', (done) => {
    const invalidYoutubeUrl: string = 'thisIsAnInvalidUrl'
    clientSocket.emit(
      CommandType.CREATE_SESSION,
      { videoUrl: invalidYoutubeUrl },
      (response: CreateSessionResponse) => {
        expect(response.content.status).to.be.equal(ResponseStatus.FAILURE)
        done()
      }
    )
  })
})
