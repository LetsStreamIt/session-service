import { SendMessageCommand } from '../../domain/aggregates/chat/commands/chatCommands'
import {
  CreateSessionCommand,
  UserTokenCommand,
  JoinSessionCommand,
  LeaveSessionCommand
} from '../../domain/aggregates/session/commands/sessionCommands'
import { SessionRepository } from '../../domain/aggregates/session/session'
import {
  PlayVideoCommand,
  StopVideoCommand
} from '../../domain/aggregates/video/commands/videoCommands'
import {
  CreateSessionResponse,
  UserTokenResponse,
  JoinSessionResponse,
  LeaveSessionResponse,
  SendMessageResponse,
  PlayVideoResponse,
  StopVideoResponse
} from '../../domain/command/response'
import { handleCreateSessionCommand } from './commandHandlers/createSessionCommandHandler'
import { handleUserTokenCommand } from './commandHandlers/userTokenCommandHandler'
import { handleJoinSessionCommand } from './commandHandlers/joinSessionCommandHandler'
import { handleLeaveSessionCommand } from './commandHandlers/leaveSessionCommandHandler'
import { handleSendMessageCommand } from './commandHandlers/chatCommandHandlers'
import {
  handlePlayVideoCommand,
  handleStopVideoCommand
} from './commandHandlers/videoCommandHandlers'

export class SessionService {
  sessions: SessionRepository

  constructor() {
    this.sessions = new SessionRepository()
  }

  async handleCreateSessionCommand(command: CreateSessionCommand): Promise<CreateSessionResponse> {
    return handleCreateSessionCommand(this.sessions, command)
  }

  async handleUserTokenCommand(command: UserTokenCommand): Promise<UserTokenResponse> {
    return handleUserTokenCommand(command)
  }

  async handleJoinSessionCommand(command: JoinSessionCommand): Promise<JoinSessionResponse> {
    return handleJoinSessionCommand(this.sessions, command)
  }

  async handleLeaveSessionCommand(command: LeaveSessionCommand): Promise<LeaveSessionResponse> {
    return handleLeaveSessionCommand(this.sessions, command)
  }

  async handleSendMessageCommand(command: SendMessageCommand): Promise<SendMessageResponse> {
    return handleSendMessageCommand(this.sessions, command)
  }

  async handlePlayVideoCommand(command: PlayVideoCommand): Promise<PlayVideoResponse> {
    return handlePlayVideoCommand(this.sessions, command)
  }

  async handleStopVideoCommand(command: StopVideoCommand): Promise<StopVideoResponse> {
    return handleStopVideoCommand(this.sessions, command)
  }
}
