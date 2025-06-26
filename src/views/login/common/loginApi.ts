import type { ILogin } from '@/api/auth/authApi'
import authApi from '@/api/auth/authApi'
import { useMutation } from '@tanstack/vue-query'

export const useLoginUserMutation = () => {
  return useMutation({
    mutationKey: ['userloginapi'],
    mutationFn: async (data: ILogin) => {
      const result = await authApi.userLogin(data)
      return result
    },
    onError: (error, variables, context) => {
      console.log(error)
    },
  })
}
