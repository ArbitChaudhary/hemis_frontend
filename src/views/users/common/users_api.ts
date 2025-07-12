import userApi from '@/api/api-endpoints/userApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { IUser } from './user_types'

export const userQueryKeys = {
  all: ['users'] as const,
  lists: () => [...userQueryKeys.all, 'list'] as const,
  list: (filter: string) => [...userQueryKeys.lists(), filter] as const,
  details: () => [...userQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...userQueryKeys.details(), id] as const,
}

export const useGetAllUsersQuery = () => {
  return useQuery({
    queryKey: userQueryKeys.lists(),
    queryFn: async () => {
      const result = await userApi.getAllUsers()
      return result.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export const useUserRegisterMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newUser: any) => {
      const result = await userApi.registerUser(newUser)
      return result.data
    },
    onMutate: (newUser) => {
      queryClient.cancelQueries({ queryKey: userQueryKeys.lists() })
      const prevList = queryClient.getQueryData(userQueryKeys.lists())

      queryClient.setQueriesData(
        { queryKey: userQueryKeys.lists() },
        (old: IUser[] | undefined) => {
          if (!old) {
            return [newUser as IUser]
          }
          return [...old, newUser as IUser]
        },
      )
      return { prevList }
    },
    onError: (error, newUser, context) => {
      console.log('Error registering user', error, newUser)
      queryClient.setQueryData(userQueryKeys.lists(), context?.prevList)
    },
    onSettled: (newUser) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() })
    },
  })
}
