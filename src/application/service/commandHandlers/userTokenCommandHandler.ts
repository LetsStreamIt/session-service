import axios from 'axios'
import { UserTokenCommand } from '../../../domain/aggregates/session/commands/sessionCommands'
import {
  UserTokenResponse,
  UserTokenResponseContent,
  ResponseStatus,
  TokenStatus
} from '../../../domain/command/response'

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
