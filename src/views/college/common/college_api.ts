import collegeApi from '@/api/api-endpoints/collegeApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { ICollege } from './college_types'

export const collegeQueryKeys = {
  all: ['colleges'] as const,
  lists: () => [...collegeQueryKeys.all, 'lists'] as const,
  list: (filter: string) => [...collegeQueryKeys.lists(), filter] as const,
  details: () => [...collegeQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...collegeQueryKeys.details(), id] as const,
}

export const useGetAllCollegesListQuery = () => {
  return useQuery({
    queryKey: collegeQueryKeys.lists(),
    queryFn: async () => {
      const result = await collegeApi.getAllCollegesList()
      return result.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export const useGetCollegeByIdQuery = (id: number) => {
  return useQuery({
    queryKey: collegeQueryKeys.detail(id),
    queryFn: async () => {
      const result = await collegeApi.getCollegeById(id)
      console.log(result?.data)
      return result.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}

export const useAddCollegeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newCollege: any) => {
      const result = await collegeApi.registerCollege(newCollege)
      return result.data
    },
    onMutate: (newCollege) => {
      queryClient.cancelQueries({ queryKey: collegeQueryKeys.lists() })

      const prevList = queryClient.getQueryData(collegeQueryKeys.lists())

      queryClient.setQueriesData(
        { queryKey: collegeQueryKeys.lists() },
        (old: ICollege[] | undefined) => {
          if (!old) {
            return [newCollege as ICollege]
          }
          return [...old, newCollege as ICollege]
        },
      )
      return { prevList }
    },
    onError: (error, newCollege, context) => {
      console.log('Error registering college', error, newCollege)

      queryClient.setQueryData(collegeQueryKeys.lists(), context?.prevList)
    },
    onSettled: (_) => {
      queryClient.invalidateQueries({ queryKey: collegeQueryKeys.lists() })
    },
  })
}

export const useUpdateCollegeByIdMutation = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newCollege: any) => {
      const result = await collegeApi.updateCollegeById(id, newCollege)
      return result.data
    },
    onMutate: (newCollege) => {
      queryClient.cancelQueries({ queryKey: collegeQueryKeys.lists() })
      queryClient.cancelQueries({ queryKey: collegeQueryKeys.detail(id) })

      const prevCollege = queryClient.getQueryData(collegeQueryKeys.detail(newCollege?.id))
      const prevList = queryClient.getQueryData(collegeQueryKeys.lists())

      if (prevCollege) {
        queryClient.setQueryData(collegeQueryKeys.detail(id), {
          ...prevCollege,
          ...newCollege,
        })
      }
      if (prevList) {
        queryClient.setQueriesData(
          { queryKey: collegeQueryKeys.lists() },
          (old: { data: ICollege[] | undefined } | undefined) => {
            if (!old?.data) {
              return { data: [newCollege as ICollege] }
            }
            return {
              data: [...old.data, newCollege as ICollege],
            }
          },
        )
      }
      return { prevCollege, prevList, newCollege }
    },
    onError: (error, newCollege, context) => {
      console.log('Could not update college', error, newCollege)

      queryClient.setQueryData(collegeQueryKeys.lists(), context?.prevList)
      queryClient.setQueryData(
        collegeQueryKeys.detail(context?.newCollege?.id),
        context?.prevCollege,
      )
    },
    onSettled: (newCollege) => {
      queryClient.invalidateQueries({ queryKey: collegeQueryKeys.lists() })
      if (newCollege?.id) {
        queryClient.invalidateQueries({ queryKey: collegeQueryKeys.detail(newCollege?.id) })
      }
    },
  })
}

export const useDeleteCollegeByIdMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const result = await collegeApi.deleteCollegeById(id)
      return result.data
    },
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: collegeQueryKeys.lists() })
      queryClient.cancelQueries({ queryKey: collegeQueryKeys.detail(id) })

      const prevCollege = queryClient.getQueryData(collegeQueryKeys.detail(id))
      const prevList = queryClient.getQueryData(collegeQueryKeys.lists())

      queryClient.setQueriesData(
        { queryKey: collegeQueryKeys.lists() },
        (old: { data: ICollege[] | undefined } | undefined) => {
          if (!old?.data) {
            return { data: [] }
          }
          return { data: old?.data.filter((item) => item?.id !== id) }
        },
      )
      queryClient.removeQueries({ queryKey: collegeQueryKeys.detail(id) })
      return { id, prevList, prevCollege }
    },
    onError: (error, id, context) => {
      console.log('Could not delete college', error, id)

      queryClient.setQueryData(collegeQueryKeys.lists(), context?.prevList)

      queryClient.setQueryData(collegeQueryKeys.detail(id), context?.prevCollege)
    },
    onSettled: (data, error, id) => {
      queryClient.invalidateQueries({ queryKey: collegeQueryKeys.lists() })

      if (!error) {
        queryClient.removeQueries({ queryKey: collegeQueryKeys.detail(id) })
      }
    },
  })
}
