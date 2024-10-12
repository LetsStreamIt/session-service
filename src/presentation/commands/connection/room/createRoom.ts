import { sha256 } from 'js-sha256'
import { Server, Socket } from 'socket.io'
import { RoomService } from '../../../../application/roomService'
import { Ack } from '../../../../application/message'

function isYoutubeVideoIdValid(videoId: string): boolean {
  return true
}

function roomNameFromTokenAndVideoId(token: string, videoId: string): string {
  return sha256(token + videoId)
}

/**
 * Create Room Command
 * @param io
 * @param socket
 * @param token
 * @param roomController
 * @returns
 */
export function createRoomCommand(
  io: Server,
  socket: Socket,
  token: string,
  roomController: RoomService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { room } = message

    if (isYoutubeVideoIdValid(room)) {
      const roomName = roomNameFromTokenAndVideoId(token, room)
      roomController.createRoom(roomName)
      ack({ ack: Ack.OK, roomName: roomName })
    } else {
      ack({ ack: Ack.FAILURE, roomName: '' })
    }
  }
}
