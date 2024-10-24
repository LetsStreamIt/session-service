import { AxiosResponse } from 'axios'
import { UserTokenCommand } from '../../../domain/aggregates/session/commands/sessionCommands'
import { UserTokenResponse, ResponseStatus, TokenStatus } from '../../../domain/command/response'
import { httpGet } from './utils'
import { User, UserId } from '../../../domain/user'
import { standardConfig } from '../../../config'

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
    httpGet(
      standardConfig.AUTH_SERVICE_HOSTNAME,
      standardConfig.AUTH_SERVICE_PORT,
      '/api/auth/data',
      command.token
    )
      .then((userAuthData: AxiosResponse) => {
        httpGet(
          standardConfig.PROFILE_SERVICE_HOSTNAME,
          standardConfig.PROFILE_SERVICE_PORT,
          `/users/${userAuthData.data.data.email}`,
          command.token
        )
          .then((userInfo: AxiosResponse) => {
            const user: User = new User(
              new UserId(userAuthData.data.data.email),
              userInfo.data.username
            )
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
