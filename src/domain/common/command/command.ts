/**
 * Command Type
 */
export enum CommandType {
  USER_TOKEN = 'userToken',
  CREATE_SESSION = 'createSession',
  JOIN_SESSION = 'joinSession',
  LEAVE_SESSION = 'leaveSession',
  SEND_MSG = 'sendMessage',
  STOP_VIDEO = 'stopVideo',
  PLAY_VIDEO = 'playVideo'
}

/**
 * Session Command Interface
 */
export interface ISessionCommand<X> {
  readonly type: CommandType
  readonly content: X
}
