import { CommandType } from './command'

/**
 * Response
 */
export interface IResponse<X> {
  command: CommandType
  content: X
}

/**
 * Response Status
 */
export enum ResponseStatus {
  SUCCESS = 0,
  FAILURE = 1
}

/**
 * Join Session Response Type
 */
export enum JoinSessionResponseType {
  SUCCESS = 0,
  USER_ALREADY_JOINED = 1,
  SESSION_NOT_FOUND = 2
}

/**
 * Token Status
 */
export enum TokenStatus {
  TOKEN_VALID = 0,
  TOKEN_INVALID = 1
}

/**
 * Create Session Response Content
 */
class CreateSessionResponseContent {
  status: ResponseStatus
  sessionName: string

  constructor(status: ResponseStatus, sessionName: string) {
    this.status = status
    this.sessionName = sessionName
  }
}

/**
 * User Token Response Content
 */
export class UserTokenResponseContent {
  status: ResponseStatus
  tokenStatus: TokenStatus

  constructor(status: ResponseStatus, tokenStatus: TokenStatus) {
    this.status = status
    this.tokenStatus = tokenStatus
  }
}

/**
 * Join Session Response Content
 */
export class JoinSessionResponseContent {
  responseType: JoinSessionResponseType
  videoId: string

  constructor(responseType: JoinSessionResponseType, videoId: string) {
    this.responseType = responseType
    this.videoId = videoId
  }
}

/**
 * Join Session Response
 */
export class JoinSessionResponse implements IResponse<JoinSessionResponseContent> {
  command: CommandType
  content: JoinSessionResponseContent

  constructor(content: JoinSessionResponseContent) {
    this.command = CommandType.JOIN_SESSION
    this.content = content
  }
}

/**
 * Create Session Response
 */
export class CreateSessionResponse implements IResponse<CreateSessionResponseContent> {
  command: CommandType
  content: CreateSessionResponseContent

  constructor(status: ResponseStatus, sessionName: string) {
    this.command = CommandType.CREATE_SESSION
    this.content = new CreateSessionResponseContent(status, sessionName)
  }
}

/**
 * Play Video Response
 */
export class PlayVideoResponse implements IResponse<ResponseStatus> {
  command: CommandType
  content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.PLAY_VIDEO
    this.content = content
  }
}

/**
 * Stop Video Reponse
 */
export class StopVideoResponse implements IResponse<ResponseStatus> {
  command: CommandType
  content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.STOP_VIDEO
    this.content = content
  }
}

/**
 * Send Message Response
 */
export class SendMessageResponse implements IResponse<ResponseStatus> {
  command: CommandType
  content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.SEND_MSG
    this.content = content
  }
}

/**
 * User Token Response
 */
export class UserTokenResponse implements IResponse<UserTokenResponseContent> {
  command: CommandType
  content: UserTokenResponseContent

  constructor(content: UserTokenResponseContent) {
    this.command = CommandType.USER_TOKEN
    this.content = content
  }
}

/**
 * Leave Session Response
 */
export class LeaveSessionResponse implements IResponse<ResponseStatus> {
  command: CommandType
  content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.LEAVE_SESSION
    this.content = content
  }
}
