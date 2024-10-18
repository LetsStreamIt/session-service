import { Server, Socket } from 'socket.io'
import { VideoStateDeserializer } from '../presentation/deserialization/videoStateDeserializer'
import { SerializerImpl } from '../presentation/serialization/messageSerializer'
import { VideoNotificationType } from './notification'

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
      this.socket.emit(VideoNotificationType.VIDEO_STATE, (response: any) => {
        const videoState = new VideoStateDeserializer().deserialize(JSON.parse(response))
        resolve(videoState)
      })
    })
  }

  synchronizeUser(videoState: VideoState): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        VideoNotificationType.SYNCHRONIZE,
        new SerializerImpl().serialize(videoState)
      )
      resolve()
    })
  }

  syncronizeSession(videoState: VideoState): Promise<void> {
    return new Promise((resolve, reject) => {
      this.io
        .to(this.sessionName)
        .emit(VideoNotificationType.VIDEO_STATE, new SerializerImpl().serialize(videoState))
      resolve()
    })
  }
}
