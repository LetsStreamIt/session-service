import { IVideoReactions, IVideoState } from '../../../src/domain/reactions/videoReactions'

export class EmptyVideoReactions implements IVideoReactions {
  retreiveVideoState(): Promise<IVideoState> {
    throw new Error('Method should not be used for testing.')
  }
  synchronizeClient(videoState: IVideoState): Promise<void> {
    throw new Error('Method should not be used for testing.')
  }
  syncronizeSession(videoState: IVideoState): Promise<void> {
    throw new Error('Method should not be used for testing.')
  }
}
