import { Server } from 'socket.io'
import { acceptConnectionCommand } from './commands/connection/connection'
import { SessionService } from '../../../application/sessionService'
import {
  AuthServiceUtils,
  ProfileServiceUtils
} from '../../communication/profileService/externalServicesUtils'

/**
 * Accepts Commands
 * @param io Socket IO Server
 */
export async function acceptCommands(io: Server) {
  acceptConnectionCommand(
    io,
    new SessionService(),
    new ProfileServiceUtils(),
    new AuthServiceUtils()
  )
}
