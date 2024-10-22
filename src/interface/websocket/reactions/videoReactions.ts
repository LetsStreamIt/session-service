import { Server, Socket } from 'socket.io'
import {
  IVideoReactions,
  VideoReactionType,
  IVideoState
} from '../../../domain/reactions/videoReactions'
import { VideoState } from '../../../domain/aggregates/video/video'

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
      this.socket.emit(VideoReactionType.VIDEO_STATE, (videoState: VideoState) => {
        resolve(videoState)
      })
    })
  }

  synchronizeClient(videoState: IVideoState): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit(VideoReactionType.SYNCHRONIZE, videoState)
      resolve()
    })
  }

  syncronizeSession(videoState: IVideoState): Promise<void> {
    return new Promise((resolve) => {
      this.io.to(this.sessionName).emit(VideoReactionType.SYNCHRONIZE, videoState)
      resolve()
    })
  }
}
