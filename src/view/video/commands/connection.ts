// import { Namespace, Socket } from 'socket.io'
// import { chatCommandListener, commandListener } from '../utils'
// import { disconnectionCommand } from './disconnect'
// import { userTokenCommand } from './userToken'
// import { ChatController } from '../../../controllers/chat/chatController'

// /**
//  * On connection command.
//  * After the client successfully creates a connection with the chat namespace, it enables the client to further:
//  * (1) send the token as first initialization step;
//  * (2) disconnect from the namespace.
//  * @param chatNamespace
//  * @param chatController
//  */
// export function connectionCommand(chatNamespace: Namespace, chatController: ChatController) {
//   commandListener(
//     chatNamespace,
//     'connection',
//     () => true,
//     (socket: Socket) => {
//       chatCommandListener(
//         socket,
//         'userToken',
//         userTokenCommand(chatNamespace, socket, chatController)
//       )
//       chatCommandListener(socket, 'disconnect', disconnectionCommand(socket))
//     }
//   )
// }
