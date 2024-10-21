import { PlayState, VideoState } from '../../domain/reactions/reactions'
import { AbstractDeserializer } from './deserializer'

class PlayStateDeserializer extends AbstractDeserializer<PlayState> {
  isJsonValid(json: any): boolean {
    return (Object.values(PlayState) as string[]).includes(json)
  }

  deserializeJson(json: any): PlayState {
    return json as PlayState
  }
}

export class VideoStateDeserializer extends AbstractDeserializer<VideoState> {
  isJsonValid(json: any): boolean {
    return typeof json.state === 'string' && typeof json.timestamp === 'number'
  }

  deserializeJson(json: any): VideoState {
    return { state: new PlayStateDeserializer().deserialize(json.state), timestamp: json.timestamp }
  }
}
