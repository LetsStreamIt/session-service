import { Socket } from 'socket.io'
import { ISessionService } from '../../../../application/sessionService/sessionService'
import { LeaveSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { ISessionReactions } from '../../../../domain/reactions/sessionReactions'
import { User } from '../../../../domain/user'
import { CommandType } from '../../../../domain/command/command'

/**
 * Accept Leave Session Commands.
 * @param socket Socket IO Socket
 * @param sessionName Session name
 * @param user access user
 * @param sessionService Session Servuce
 * @param sessionReactions Session Reactions
 * @returns
 */
export function acceptLeaveSessionCommand(
  socket: Socket,
  user: User,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  socket.on(CommandType.LEAVE_SESSION, () => {
    sessionService.handleLeaveSessionCommand(
      new LeaveSessionCommand(user, sessionName, sessionReactions)
    )
  })
}
