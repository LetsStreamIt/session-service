import { sha256 } from 'js-sha256'
import { User, UserId } from '../../../user'
import axios, { AxiosResponse } from 'axios'

export function getUserEmailFromToken(token: string): UserId {
  return new UserId(token)
}

export function getUserFromToken(token: string): User {
  return new User(getUserEmailFromToken(token), 'Name', 'Surname')
}

export function isTokenValid(token: string): Promise<boolean> {
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

export function isYoutubeIdValid(videoId: string): Promise<boolean> {
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

export function youtubeVideoIdFromUrl(url: string): Promise<string | undefined> {
  return new Promise((resolve) => {
    const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/)
    if (match !== null && match[1]) {
      const videoId: string = match[1]
      isYoutubeIdValid(videoId).then((isValid: boolean) => resolve(isValid ? videoId : undefined))
    } else {
      resolve(undefined)
    }
  })
}

export function sessionNameFromTokenAndVideoId(token: string, videoId: string): string {
  return sha256(token + videoId)
}
