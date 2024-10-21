import { Session, SessionId, SessionRepository } from '../../../domain/aggregates/session/session'
import {
  PlayVideoCommand,
  StopVideoCommand
} from '../../../domain/aggregates/video/commands/videoCommands'
import {
  VideoPlayedEvent,
  VideoStoppedEvent
} from '../../../domain/aggregates/video/events/videoEvents'
import {
  PlayVideoResponse,
  ResponseStatus,
  StopVideoResponse
} from '../../../domain/command/response'

export async function handlePlayVideoCommand(
  sessions: SessionRepository,
  command: PlayVideoCommand
): Promise<PlayVideoResponse> {
  return new Promise((resolve) => {
    const session: Session | undefined = sessions.find(new SessionId(command.sessionName))
    if (session) {
      session.eventBus().publish(new VideoPlayedEvent(command.timestamp, command.sessionReactions))
      resolve(new PlayVideoResponse(ResponseStatus.SUCCESS))
    } else {
      resolve(new PlayVideoResponse(ResponseStatus.FAILURE))
    }
  })
}

export async function handleStopVideoCommand(
  sessions: SessionRepository,
  command: StopVideoCommand
): Promise<StopVideoResponse> {
  return new Promise((resolve) => {
    const session: Session | undefined = sessions.find(new SessionId(command.sessionName))
    if (session) {
      session.eventBus().publish(new VideoStoppedEvent(command.timestamp, command.sessionReactions))
      resolve(new StopVideoResponse(ResponseStatus.SUCCESS))
    } else {
      resolve(new StopVideoResponse(ResponseStatus.FAILURE))
    }
  })
}
