import { Server, Socket } from 'socket.io'
import { VideoStateDeserializer } from '../presentation/deserialization/videoStateDeserializer'
import { SerializerImpl } from '../presentation/serialization/messageSerializer'

export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

export interface VideoState {
  timestamp: number
  state: PlayState
}

export class VideoNotifications {
  io: Server
  socket: Socket
  sessionName: string

  constructor(io: Server, socket: Socket, sessionName: string) {
    this.io = io
    this.socket = socket
    this.sessionName = sessionName
  }

  retreiveVideoState(): Promise<VideoState> {
    return new Promise((resolve, reject) => {
      this.socket.emit('videoState', (response: any) => {
        const videoState = new VideoStateDeserializer().deserialize(JSON.parse(response))
        resolve(videoState)
      })
    })
  }

  synchronizeUser(videoState: VideoState): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit('synchronize', new SerializerImpl().serialize(videoState))
      resolve()
    })
  }

  syncronizeSession(videoState: VideoState): Promise<void> {
    return new Promise((resolve, reject) => {
      this.io.to(this.sessionName).emit('synchronize', new SerializerImpl().serialize(videoState))
      resolve()
    })
  }
}
