import { VideoState } from './reactions'

export interface VideoReactions {
  retreiveVideoState(): Promise<VideoState>
  synchronizeUser(videoState: VideoState): Promise<void>
  syncronizeSession(videoState: VideoState): Promise<void>
}
