/**
 * Profile Service Utils interface
 */
export interface IProfileServiceUtils {
  getUsernameFromEmailAndToken(token: string, email: string): Promise<string>
}

/**
 * Auth Service Utils interface
 */
export interface IAuthServiceUtils {
  getUserEmailFromToken(token: string): Promise<string>
}
