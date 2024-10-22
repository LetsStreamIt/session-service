import { sha256 } from 'js-sha256'
import axios, { AxiosResponse } from 'axios'

export function httpGet(
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
 * Produces a Session name by combining the User email and Youtube Video id and applying SHA256.
 * @param email User email
 * @param videoId Youtube Video Id
 * @returns Session name
 */
export function sessionNameFromTokenAndVideoId(email: string, videoId: string): string {
  return sha256(email + videoId)
}
