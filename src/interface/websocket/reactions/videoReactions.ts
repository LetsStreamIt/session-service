import { Server, Socket } from 'socket.io'
import { VideoStateDeserializer } from '../../../presentation/deserialization/videoStateDeserializer'
import { SerializerImpl } from '../../../presentation/serialization/messageSerializer'
import {
  IVideoReactions,
  VideoReactionType,
  IVideoState
} from '../../../domain/reactions/videoReactions'

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
      this.socket.emit(VideoReactionType.VIDEO_STATE, (response: any) => {
        const videoState = new VideoStateDeserializer().deserialize(JSON.parse(response))
        resolve(videoState)
      })
    })
  }

  synchronizeUser(videoState: IVideoState): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit(VideoReactionType.SYNCHRONIZE, new SerializerImpl().serialize(videoState))
      resolve()
    })
  }

  syncronizeSession(videoState: IVideoState): Promise<void> {
    return new Promise((resolve) => {
      this.io
        .to(this.sessionName)
        .emit(VideoReactionType.SYNCHRONIZE, new SerializerImpl().serialize(videoState))
      resolve()
    })
  }
}
