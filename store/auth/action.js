import {LOGIN, LOGOUT, UserState, Token} from './type'
export function doLogin(payload){
  const body:UserState = {
    id: payload.id,
    username: payload.username,
    email: payload.email,
    access_token: payload.access_token,
    refresh_token: payload.refresh_token
  }

  return {
    type:LOGIN,
    payload:body
  }
}


export function doLogout(){
  return {
    type:LOGOUT,
    payload:null
  }
}

export function updateToken(token: Token) {
  return {
    type: token.type,
    payload: token
  }
}
