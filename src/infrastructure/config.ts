/**
 * Standard Service Configuration uses environment variables
 */
export const standardConfig: IServiceConfig = {
  LOCAL_PORT: process.env.PORT || '4000',
  SESSION_SERVICE_HOSTNAME: process.env.SESSION_SERVICE_HOSTNAME || 'localhost',
  PROFILE_SERVICE_HOSTNAME: process.env.PROFILE_SERVICE_HOSTNAME || 'localhost',
  PROFILE_SERVICE_PORT: process.env.PROFILE_SERVICE_PORT || '8080',
  AUTH_SERVICE_HOSTNAME: process.env.AUTH_SERVICE_HOSTNAME || 'localhost',
  AUTH_SERVICE_PORT: process.env.AUTH_SERVICE_PORT || '3000'
}

/**
 * Service Configuration
 */
interface IServiceConfig {
  LOCAL_PORT: string
  SESSION_SERVICE_HOSTNAME: string
  PROFILE_SERVICE_HOSTNAME: string
  PROFILE_SERVICE_PORT: string
  AUTH_SERVICE_HOSTNAME: string
  AUTH_SERVICE_PORT: string
}
