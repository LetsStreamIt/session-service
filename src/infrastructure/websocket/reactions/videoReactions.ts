import { Server, Socket } from 'socket.io'
import {
  IVideoReactions,
  VideoReactionType,
  IVideoState
} from '../../../domain/common/reactions/videoReactions'

/**
 * WebSocket Video Reactions
 */
export class WSVideoReactions implements IVideoReactions {
  io: Server
  socket: Socket
  sessionName: string

  constructor(io: Server, socket: Socket, sessionName: string) {
    this.io = io
    this.socket = socket
    this.sessionName = sessionName
  }

  retreiveVideoState(): Promise<IVideoState> {
    return new Promise((resolve) => {
      this.socket.emit(VideoReactionType.VIDEO_STATE, (videoState: IVideoState) => {
        resolve(videoState)
      })
    })
  }

  synchronizeClient(videoState: IVideoState) {
    this.socket.emit(VideoReactionType.SYNCHRONIZE, videoState)
  }

  syncronizeSession(videoState: IVideoState) {
    this.io.to(this.sessionName).emit(VideoReactionType.SYNCHRONIZE, videoState)
  }
}
