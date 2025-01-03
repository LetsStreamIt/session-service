import { Socket as ClientSocket } from 'socket.io-client'
import { Server, Socket as ServerSocket } from 'socket.io'
import { ISessionService, SessionService } from '../../../../src/application/sessionService'
import { commonAfter, commonBefore } from './socketIoTestUtils'
import { acceptJoinSessionCommand } from '../../../../src/infrastructure/adapters/websocket/commands/session/joinSession'
import { User, UserId } from '../../../../src/domain/common/user'
import { CommandType } from '../../../../src/domain/common/command/command'
import {
  CreateSessionResponse,
  JoinSessionResponse,
  JoinSessionResponseStatus
} from '../../../../src/domain/common/command/response'
import { expect } from 'chai'
import { acceptCreateSessionCommand } from '../../../../src/infrastructure/adapters/websocket/commands/session/createSession'

describe('join session message', () => {
  let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket
  let sessionService: ISessionService
  const user: User = new User(new UserId('testUser@email.com'), 'testUsername')

  beforeEach((done) => {
    commonBefore().then(([ioServer, cSocket, sSocket]) => {
      io = ioServer
      serverSocket = sSocket
      clientSocket = cSocket
      sessionService = new SessionService()
      acceptJoinSessionCommand(io, serverSocket, user, sessionService)
      done()
    })
  })

  afterEach(() => commonAfter(io, clientSocket))

  it('should join the user if the specified session has been previously created', (done) => {
    acceptCreateSessionCommand(serverSocket, user, sessionService)
    const videoId: string = 'M7lc1UVf-VE'
    const validYoutubeUrl: string = `https://www.youtube.com/watch?v=${videoId}`

    clientSocket.emit(
      CommandType.CREATE_SESSION,
      { videoUrl: validYoutubeUrl },
      (createSessionResponse: CreateSessionResponse) => {
        clientSocket.emit(
          CommandType.JOIN_SESSION,
          { sessionName: createSessionResponse.content.sessionName },
          (joinSessionResponse: JoinSessionResponse) => {
            expect(joinSessionResponse.content.status).to.be.equal(
              JoinSessionResponseStatus.SUCCESS
            )
            expect(joinSessionResponse.content.videoId).to.be.equal(videoId)
            done()
          }
        )
      }
    )
  })

  it('should not join the user if the specified session does not exist', (done) => {
    clientSocket.emit(
      CommandType.JOIN_SESSION,
      { sessionName: 'thisSessionDoesNotExist' },
      (response: JoinSessionResponse) => {
        expect(response.content.status).to.be.equal(JoinSessionResponseStatus.SESSION_NOT_FOUND)
        expect(response.content.videoId).to.be.equal('')
        done()
      }
    )
  })

  it("should not join the user if he's already joined into another session", (done) => {
    acceptCreateSessionCommand(serverSocket, user, sessionService)
    const videoId: string = 'M7lc1UVf-VE'
    const validYoutubeUrl: string = `https://www.youtube.com/watch?v=${videoId}`

    clientSocket.emit(
      CommandType.CREATE_SESSION,
      { videoUrl: validYoutubeUrl },
      (createSessionResponse: CreateSessionResponse) => {
        clientSocket.emit(
          CommandType.JOIN_SESSION,
          { sessionName: createSessionResponse.content.sessionName },
          (joinSessionResponse: JoinSessionResponse) => {
            expect(joinSessionResponse.content.status).to.be.equal(
              JoinSessionResponseStatus.SUCCESS
            )
            clientSocket.emit(
              CommandType.JOIN_SESSION,
              { sessionName: createSessionResponse.content.sessionName },
              (joinSessionResponse: JoinSessionResponse) => {
                expect(joinSessionResponse.content.status).to.be.equal(
                  JoinSessionResponseStatus.USER_ALREADY_JOINED
                )
                done()
              }
            )
          }
        )
      }
    )
  })
})
