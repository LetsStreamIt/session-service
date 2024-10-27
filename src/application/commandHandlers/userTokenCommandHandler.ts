import { UserTokenCommand } from '../../domain/aggregates/session/commands/sessionCommands'
import {
  UserTokenResponse,
  ResponseStatus,
  TokenStatus
} from '../../domain/common/command/response'
import { User, UserId } from '../../domain/common/user'

/**
 * User Token Command Handler.
 * Checks if the access token is valid.
 * @param command User Token Command
 * @returns a User Token Response to send back to the client specifying if the token is valid or invalid.
 */
export async function handleUserTokenCommand(
  command: UserTokenCommand
): Promise<UserTokenResponse> {
  return new Promise((resolve) => {
    command.authServiceUtils
      .getUserEmailFromToken(command.token)
      .then((email: string) => {
        command.profileServiceUtils
          .getUsernameFromEmailAndToken(command.token, email)
          .then((username: string) => {
            const user: User = new User(new UserId(email), username)
            resolve(new UserTokenResponse(ResponseStatus.SUCCESS, TokenStatus.TOKEN_VALID, user))
          })
          .catch(() =>
            resolve(
              new UserTokenResponse(ResponseStatus.FAILURE, TokenStatus.TOKEN_VALID, undefined)
            )
          )
      })
      .catch(() =>
        resolve(new UserTokenResponse(ResponseStatus.FAILURE, TokenStatus.TOKEN_INVALID, undefined))
      )
  })
}
