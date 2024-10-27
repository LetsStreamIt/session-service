import axios, { AxiosResponse } from 'axios'
import { IAuthServiceUtils, IProfileServiceUtils } from '../../../domain/utils/profileServiceUtils'
import { standardConfig } from '../../config'

function httpGet(
  hostname: string,
  port: string,
  url: string,
  token: string
): Promise<AxiosResponse> {
  return axios.get(`http://${hostname}:${port}${url}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}

export class ProfileServiceUtils implements IProfileServiceUtils {
  getUsernameFromEmailAndToken(token: string, email: string): Promise<string> {
    return new Promise((resolve) => {
      httpGet(
        standardConfig.PROFILE_SERVICE_HOSTNAME,
        standardConfig.PROFILE_SERVICE_PORT,
        `/users/${email}`,
        token
      ).then((userInfo: AxiosResponse) => resolve(userInfo.data.username))
    })
  }
}

export class AuthServiceUtils implements IAuthServiceUtils {
  getUserEmailFromToken(token: string): Promise<string> {
    return new Promise((resolve) => {
      httpGet(
        standardConfig.AUTH_SERVICE_HOSTNAME,
        standardConfig.AUTH_SERVICE_PORT,
        '/api/auth/data',
        token
      ).then((userAuthData: AxiosResponse) => resolve(userAuthData.data.data.email))
    })
  }
}
