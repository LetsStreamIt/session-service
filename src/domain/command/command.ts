/**
 * Command Type
 */
export enum CommandType {
  CONNECTION = 'connection',
  USER_TOKEN = 'userToken',
  DISCONNECT = 'disconnect',
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
export interface ISessionCommand {
  type: CommandType
}
