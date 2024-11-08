import { Session, SessionId, SessionRepository } from '../../domain/aggregates/session/session'
import {
  PlayVideoCommand,
  StopVideoCommand
} from '../../domain/aggregates/video/commands/videoCommands'
import {
  VideoPlayedEvent,
  VideoStoppedEvent
} from '../../domain/aggregates/video/events/videoEvents'
import {
  PlayVideoResponse,
  ResponseStatus,
  StopVideoResponse
} from '../../domain/common/command/response'

/**
 * Play Video Command Handler.
 * Plays the Video if the Session is existing.
 * @param sessions Session Repository
 * @param command Play Video Command
 * @returns a Play Video Response specifying if the Command has been succesfully executed
 */
export async function handlePlayVideoCommand(
  sessions: SessionRepository,
  command: PlayVideoCommand
): Promise<PlayVideoResponse> {
  return new Promise((resolve) => {
    const session: Session | undefined = sessions.find(new SessionId(command.content.sessionName))
    if (session) {
      session.eventBus.publish(
        new VideoPlayedEvent(command.content.timestamp, command.content.sessionReactions)
      )
      resolve(new PlayVideoResponse(ResponseStatus.SUCCESS))
    } else {
      resolve(new PlayVideoResponse(ResponseStatus.FAILURE))
    }
  })
}

/**
 * Stop Video Command Handler.
 * Stop the Video if the Session is existing.
 * @param sessions Session Repository
 * @param command Stop Video Command
 * @returns a Stop Video Response specifying if the Command has been succesfully executed
 */
export async function handleStopVideoCommand(
  sessions: SessionRepository,
  command: StopVideoCommand
): Promise<StopVideoResponse> {
  return new Promise((resolve) => {
    const session: Session | undefined = sessions.find(new SessionId(command.content.sessionName))
    if (session) {
      session.eventBus.publish(
        new VideoStoppedEvent(command.content.timestamp, command.content.sessionReactions)
      )
      resolve(new StopVideoResponse(ResponseStatus.SUCCESS))
    } else {
      resolve(new StopVideoResponse(ResponseStatus.FAILURE))
    }
  })
}
