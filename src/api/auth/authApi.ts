import { authorize } from '../axios'

export interface ILogin {
  email: string
  password: string
}

export default {
  userLogin(data: ILogin) {
    return authorize.post('/auth/login', data)
  },
}
