import { IChatReactions } from "../../../src/domain/reactions/chatReactions"
import { ISessionReactions } from "../../../src/domain/reactions/sessionReactions"
import { IVideoReactions } from "../../../src/domain/reactions/videoReactions"

export class EmptySessionReactions implements ISessionReactions {

    joinUserToSession(): void {
        throw new Error('Method should not be used for testing.')
    }
    leaveUserFromSessionAndDisconnect(): void {
        throw new Error('Method should not be used for testing.')
    }
    get getChatReactions(): IChatReactions {
        throw new Error('Method should not be used for testing.')
    }
    get getVideoReactions(): IVideoReactions {
        throw new Error('Method should not be used for testing.')
    }
    
}