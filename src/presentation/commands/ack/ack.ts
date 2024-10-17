export enum CommandType {
  CONNECTION = 'connection',
  USER_TOKEN = 'userToken',
  DISCONNECT = 'disconnect',
  CREATE_ROOM = 'createRoom',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  SEND_MSG = 'sendMessage',
  STOP_VIDEO = 'stopVideo',
  PLAY_VIDEO = 'playVideo'
}

export interface SessionCommand {
  type: CommandType
  token: string
}

export interface Response<X> {
  command: CommandType
  content: X
}

export enum ResponseStatus {
  SUCCESS = 0,
  FAILURE = 1
}

export enum JoinSessionResponseType {
  SUCCESS = 0,
  USER_ALREADY_JOINED = 1,
  SESSION_NOT_FOUND = 2
}

export enum TokenStatus {
  TOKEN_VALID = 0,
  TOKEN_INVALID = 1
}

class CreateSessionResponseContent {
  status: ResponseStatus
  sessionName: string

  constructor(status: ResponseStatus, sessionName: string) {
    this.status = status
    this.sessionName = sessionName
  }
}

export class UserTokenResponseContent {
  status: ResponseStatus
  tokenStatus: TokenStatus

  constructor(status: ResponseStatus, tokenStatus: TokenStatus) {
    this.status = status
    this.tokenStatus = tokenStatus
  }
}

export class JoinSessionResponseContent {
  responseType: JoinSessionResponseType
  videoId: string

  constructor(responseType: JoinSessionResponseType, videoId: string) {
    this.responseType = responseType
    this.videoId = videoId
  }
}

export class JoinSessionResponse implements Response<JoinSessionResponseContent> {
  command: CommandType
  content: JoinSessionResponseContent

  constructor(content: JoinSessionResponseContent) {
    this.command = CommandType.JOIN_ROOM
    this.content = content
  }
}

export class CreateSessionResponse implements Response<CreateSessionResponseContent> {
  command: CommandType
  content: CreateSessionResponseContent

  constructor(status: ResponseStatus, sessionName: string) {
    this.command = CommandType.CREATE_ROOM
    this.content = new CreateSessionResponseContent(status, sessionName)
  }
}

export class PlayVideoResponse implements Response<ResponseStatus> {
  command: CommandType
  content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.PLAY_VIDEO
    this.content = content
  }
}

export class StopVideoResponse implements Response<ResponseStatus> {
  command: CommandType
  content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.STOP_VIDEO
    this.content = content
  }
}

export class SendMessageResponse implements Response<ResponseStatus> {
  command: CommandType
  content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.SEND_MSG
    this.content = content
  }
}

export class UserTokenResponse implements Response<UserTokenResponseContent> {
  command: CommandType
  content: UserTokenResponseContent

  constructor(content: UserTokenResponseContent) {
    this.command = CommandType.USER_TOKEN
    this.content = content
  }
}

export class LeaveSessionResponse implements Response<ResponseStatus> {
  command: CommandType
  content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.LEAVE_ROOM
    this.content = content
  }
}
