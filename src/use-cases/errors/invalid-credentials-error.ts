export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid Credentials, verify email and password!')
  }
}
