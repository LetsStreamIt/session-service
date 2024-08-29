import { Namespace } from 'socket.io'

export interface SessionNamespace {
  registerCommands(namespace: Namespace): void
}
