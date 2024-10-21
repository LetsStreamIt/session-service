import { Server, Socket } from 'socket.io'
import { VideoStateDeserializer } from '../../../presentation/deserialization/videoStateDeserializer'
import { SerializerImpl } from '../../../presentation/serialization/messageSerializer'
import {
  VideoReactions,
  VideoReactionType,
  VideoState
} from '../../../domain/reactions/videoReactions'

export class WSVideoReactions implements VideoReactions {
  io: Server
  socket: Socket
  sessionName: string

  constructor(io: Server, socket: Socket, sessionName: string) {
    this.io = io
    this.socket = socket
    this.sessionName = sessionName
  }

  retreiveVideoState(): Promise<VideoState> {
    return new Promise((resolve) => {
      this.socket.emit(VideoReactionType.VIDEO_STATE, (response: any) => {
        const videoState = new VideoStateDeserializer().deserialize(JSON.parse(response))
        resolve(videoState)
      })
    })
  }

  synchronizeUser(videoState: VideoState): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit(VideoReactionType.SYNCHRONIZE, new SerializerImpl().serialize(videoState))
      resolve()
    })
  }

  syncronizeSession(videoState: VideoState): Promise<void> {
    return new Promise((resolve) => {
      this.io
        .to(this.sessionName)
        .emit(VideoReactionType.SYNCHRONIZE, new SerializerImpl().serialize(videoState))
      resolve()
    })
  }
}
