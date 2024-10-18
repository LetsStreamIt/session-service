import { sha256 } from 'js-sha256'
import { User, UserId } from '../../../user'
import axios, { AxiosResponse } from 'axios'

export function getUserEmailFromToken(token: string): UserId {
  return new UserId(token)
}

export function getUserFromToken(token: string): User {
  return new User(getUserEmailFromToken(token), 'Name', 'Surname')
}

export function isTokenValid(token: string): boolean {
  return true
}

export function isYoutubeVideoIdValid(videoId: string): Promise<boolean> {
  return new Promise((resolve) => {
    axios
      .request({
        url: 'oembed',
        baseURL: 'https://www.youtube.com/',
        params: {
          url: `https://youtu.be/${videoId}`,
          format: 'json'
        }
      })
      .then((response: AxiosResponse) => resolve(response.status === 200))
      .catch(() => resolve(false))
  })
}

export function sessionNameFromTokenAndVideoId(token: string, videoId: string): string {
  return sha256(token + videoId)
}
