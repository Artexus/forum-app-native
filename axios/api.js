import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { BASE_API_URL, GENERATE_TOKEN_URL, REGISTER_API_URL, LOGIN_API_URL } from '../constant';
import { doLogout, updateToken } from '../store'

export const useAxios = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userState = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  instance.interceptors.request.use(
    (config) => {
      const token = userState?.access_token;
      if (token && (config.url.includes('posts'))) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err?.config;
      if (originalConfig.url !== LOGIN_API_URL
       && originalConfig.url !== REGISTER_API_URL
       && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            await instance.get(GENERATE_TOKEN_URL,{
              data: {
                'token': userState.refresh_token,
                'request_type': 'access_token'
              }
            }).then((resp) => {
              if (resp.status == 200) {
                dispatch(updateToken({token:resp.detail.token, type:resp.detail.type}))
              }
            }).catch((err) => {
                dispatch(doLogout())
            })

            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
  return instance
}
