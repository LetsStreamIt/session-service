import { sha256 } from 'js-sha256'
import { User, UserId } from '../../../domain/user'
import axios, { AxiosResponse } from 'axios'

/**
 * User Id From token.
 * @param token access token
 * @returns User Id
 */
export function userIdFromToken(token: string): UserId {
  return new UserId(token)
}

/**
 * User from token.
 * @param token token
 * @returns User from access token
 */
export function userFromToken(token: string): User {
  return new User(userIdFromToken(token), 'Name', 'Surname')
}

/**
 * Checks if the video id string provided as parameter is linked to a Youtube Video.
 * @param videoId video id string
 * @returns Promise resolve to true if the video id is linked to a Youtube Video, false otherwise
 */
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

/**
 * Extracts the Youtube Video id from the URL, if correct.
 * @param url URL provided by the client
 * @returns string representing the Youtube Video Id, or undefined if the URL is not valid
 */
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

/**
 * Produces a Session name by combining the token and Youtube Video id and applying SHA256.
 * @param token access token
 * @param videoId Youtube Video Id
 * @returns Session name
 */
export function sessionNameFromTokenAndVideoId(token: string, videoId: string): string {
  return sha256(token + videoId)
}
