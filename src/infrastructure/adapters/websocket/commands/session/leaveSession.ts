import { Socket } from 'socket.io'
import { ISessionService } from '../../../../../application/sessionService'
import { LeaveSessionCommand } from '../../../../../domain/aggregates/session/commands/sessionCommands'
import { ISessionReactions } from '../../../../../domain/common/reactions/sessionReactions'
import { User } from '../../../../../domain/common/user'
import { CommandType } from '../../../../../domain/common/command/command'
import { LeaveSessionResponse } from '../../../../../domain/common/command/response'

/**
 * Accept Leave Session Commands.
 * @param socket Socket IO Socket
 * @param sessionName Session name
 * @param user access user
 * @param sessionService Session Servuce
 * @param sessionReactions Session Reactions
 */
export function acceptLeaveSessionCommand(
  socket: Socket,
  user: User,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  socket.on(CommandType.LEAVE_SESSION, (ack) => {
    sessionService
      .handleLeaveSessionCommand(new LeaveSessionCommand(user, sessionName, sessionReactions))
      .then((leaveSessionResponse: LeaveSessionResponse) => ack(leaveSessionResponse))
  })
}
