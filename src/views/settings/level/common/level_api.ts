import levelApi from '@/api/api-endpoints/levelApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { ILevel, ILevelDTO } from './level_types'

export const levelAPIKeys = {
  all: ['levels'] as const,
  lists: () => [...levelAPIKeys.all, 'lists'] as const,
  list: (filter: string) => [...levelAPIKeys.lists(), filter] as const,
  details: () => [...levelAPIKeys.all, 'detail'] as const,
  detail: (id: string) => [...levelAPIKeys.details(), id] as const,
}

export const useGetLevelsByCollegeIdQuery = (id: string) => {
  return useQuery({
    queryKey: levelAPIKeys.lists(),
    queryFn: async () => {
      const result = await levelApi.getLevelByCollegeId(id)
      return result.data
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
    staleTime: Infinity,
  })
}

export const useAddLevelMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const result = await levelApi.addLevel(data)
      return result.data
    },
    onMutate: (newLevel) => {
      queryClient.cancelQueries({ queryKey: levelAPIKeys.lists() })

      const prevLevels = queryClient.getQueryData(levelAPIKeys.lists())

      if (prevLevels) {
        queryClient.setQueryData(levelAPIKeys.lists(), (old: ILevelDTO[] | undefined) => {
          if (!old) {
            return [newLevel as ILevelDTO]
          }
          return [...old, newLevel]
        })
      }
      return { prevLevels, newLevel }
    },
    onError: (error, newLevel, context) => {
      console.log('Error adding level', error, newLevel)

      queryClient.setQueryData(levelAPIKeys.lists(), context?.prevLevels)
    },
    onSettled: (newLevel) => {
      if (newLevel) {
        queryClient.invalidateQueries({ queryKey: levelAPIKeys.lists() })
      }
    },
  })
}

export const useGetLevelByIdQuery = (id: string) => {
  return useQuery({
    queryKey: levelAPIKeys.detail(id),
    queryFn: async () => {
      const result = await levelApi.getLevelById(id)
      return result.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}

export const useUpdateLevelByIdMutation = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const result = await levelApi.updateLevelById(id, data)
      return result.data
    },
    onMutate: (newLevel) => {
      queryClient.cancelQueries({ queryKey: levelAPIKeys.lists() })
      queryClient.cancelQueries({ queryKey: levelAPIKeys.detail(newLevel?.id) })

      const prevLevel = queryClient.getQueryData(levelAPIKeys.detail(newLevel?.id))
      const prevList = queryClient.getQueryData(levelAPIKeys.lists())

      if (prevLevel) {
        queryClient.setQueryData(levelAPIKeys.detail(newLevel?.id), {
          ...prevLevel,
          ...newLevel,
        })
        if (prevList) {
          queryClient.setQueriesData(
            { queryKey: levelAPIKeys.lists() },
            (old: { data: ILevel[] | undefined } | undefined) => {
              if (!old?.data) {
                return { data: [newLevel as ILevel] }
              }
              return { data: [...old?.data, newLevel as ILevel] }
            },
          )
        }
      }
      return { newLevel, prevLevel, prevList }
    },
    onError: (error, id, context) => {
      console.log('Error updating level', error, id)

      queryClient.setQueryData(levelAPIKeys.detail(context?.newLevel?.id), context?.prevLevel)
      queryClient.setQueryData(levelAPIKeys.lists(), context?.prevList)
    },
    onSuccess(newLevel) {
      queryClient.invalidateQueries({ queryKey: levelAPIKeys.lists() })
      if (newLevel?.id) {
        queryClient.invalidateQueries({ queryKey: levelAPIKeys.detail(String(newLevel?.id)) })
      }
    },
  })
}

export const useDeleteLevelByIdMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const result = await levelApi.deleteLevelById(String(id))
      return result.data
    },
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: levelAPIKeys.lists() })
      queryClient.cancelQueries({ queryKey: levelAPIKeys.detail(String(id)) })

      const prevLevel = queryClient.getQueryData(levelAPIKeys.detail(String(id)))
      const prevList = queryClient.getQueryData(levelAPIKeys.lists())

      queryClient.setQueriesData(
        { queryKey: levelAPIKeys.lists() },
        (old: { data: ILevel[] | undefined } | undefined) => {
          if (!old?.data) {
            return { data: [] }
          }
          return {
            data: old.data.filter((item) => item.id !== id),
          }
        },
      )
      queryClient.removeQueries({ queryKey: levelAPIKeys.detail(String(id)) })
      return { prevLevel, prevList, id }
    },
    onError(error, id, context) {
      console.log('Error deleting level', error, id)

      if (context?.prevLevel) {
        queryClient.setQueryData(levelAPIKeys.detail(String(id)), context?.prevLevel)
      }
      if (context?.prevList) {
        queryClient.setQueryData(levelAPIKeys.lists(), context?.prevList)
      }
    },
    onSettled(_, error, id) {
      queryClient.invalidateQueries({ queryKey: levelAPIKeys.lists() })

      if (!error) {
        queryClient.removeQueries({ queryKey: levelAPIKeys.detail(String(id)) })
      }
    },
  })
}
