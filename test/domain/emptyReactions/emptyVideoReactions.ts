import { IVideoReactions, IVideoState } from '../../../src/domain/common/reactions/videoReactions'

export class EmptyVideoReactions implements IVideoReactions {
  retreiveVideoState(): Promise<IVideoState> {
    throw new Error('Method should not be used for testing.')
  }
  synchronizeClient(_videoState: IVideoState): void {
    throw new Error('Method should not be used for testing.')
  }
  syncronizeSession(_videoState: IVideoState): void {
    throw new Error('Method should not be used for testing.')
  }
}
