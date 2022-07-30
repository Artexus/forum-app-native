export interface UserState {
  id: string,
  username: string,
  email: string,
  access_token: string,
  refresh_token: string
}
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export interface Token {
  token: string,
  type: TokenType
}
