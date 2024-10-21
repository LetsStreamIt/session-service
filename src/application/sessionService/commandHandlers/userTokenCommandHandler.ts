import axios from 'axios'
import { UserTokenCommand } from '../../../domain/aggregates/session/commands/sessionCommands'
import {
  UserTokenResponse,
  UserTokenResponseContent,
  ResponseStatus,
  TokenStatus
} from '../../../domain/command/response'

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
    isTokenValid(command.token).then((valid: boolean) => {
      resolve(
        valid
          ? new UserTokenResponse(
              new UserTokenResponseContent(ResponseStatus.SUCCESS, TokenStatus.TOKEN_VALID)
            )
          : new UserTokenResponse(
              new UserTokenResponseContent(ResponseStatus.FAILURE, TokenStatus.TOKEN_INVALID)
            )
      )
    })
  })
}

/**
 * Checks if the provided access token is valid by querying the `auth-service`.
 * @param token Access token
 * @returns Promise resolved true if the token is valid, false otherwise
 */
function isTokenValid(token: string): Promise<boolean> {
  return new Promise((resolve) => {
    axios
      .post(
        'http://localhost:3000/api/auth/validate',
        {},
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        resolve(response.status === 200)
      })
  })
}
