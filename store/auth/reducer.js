import { UserState,  LOGIN, LOGOUT } from './type'
export const AuthReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN :
      return action.payload
    case LOGOUT :
      return null
    case "access_token":
      state.access_token = action.payload.token
      return state
    case "refresh_token":
      state.refresh_token = action.payload.token
      return state
    default :
      return state
  }
}
