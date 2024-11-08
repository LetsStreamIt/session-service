import {
  UserTokenCommand,
  UserTokenCommandContent
} from '../../domain/aggregates/session/commands/sessionCommands'
import {
  UserTokenResponse,
  ResponseStatus,
  UserTokenResponseStatus
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
    const content: UserTokenCommandContent = command.content
    content.authServiceUtils
      .getUserEmailFromToken(content.token)
      .then((email: string) => {
        content.profileServiceUtils
          .getUsernameFromEmailAndToken(content.token, email)
          .then((username: string) => {
            const user: User = new User(new UserId(email), username)
            resolve(
              new UserTokenResponse(
                ResponseStatus.SUCCESS,
                UserTokenResponseStatus.TOKEN_VALID,
                user
              )
            )
          })
          .catch(() =>
            resolve(
              new UserTokenResponse(
                ResponseStatus.FAILURE,
                UserTokenResponseStatus.TOKEN_VALID,
                undefined
              )
            )
          )
      })
      .catch(() =>
        resolve(
          new UserTokenResponse(
            ResponseStatus.FAILURE,
            UserTokenResponseStatus.TOKEN_INVALID,
            undefined
          )
        )
      )
  })
}
