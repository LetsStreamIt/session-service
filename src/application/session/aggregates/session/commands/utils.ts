import { sha256 } from 'js-sha256'
import { User, UserId } from '../../../user'

export function getUserEmailFromToken(token: string): UserId {
  return new UserId(token)
}

export function getUserFromToken(token: string): User {
  return new User(getUserEmailFromToken(token), 'Name', 'Surname')
}

export function isYoutubeVideoIdValid(videoId: string): boolean {
  return true
}

export function sessionNameFromTokenAndVideoId(token: string, videoId: string): string {
  return sha256(token + videoId)
}
