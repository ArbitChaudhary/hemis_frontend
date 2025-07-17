import teacherApi from '@/api/api-endpoints/teacherApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { IStaff } from './staff_types'
import staffApi from '@/api/api-endpoints/staffApi'

export const staffQueryKeys = {
  all: ['teachers'] as const,
  lists: () => [...staffQueryKeys.all, 'lists'] as const,
  list: (filter: string) => [...staffQueryKeys.lists(), filter] as const,
  details: () => [...staffQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...staffQueryKeys.details(), id] as const,
}

export const useGetAllStaffsQuery = (id?: number) => {
  return useQuery({
    queryKey: staffQueryKeys.lists(),
    queryFn: async () => {
      if (!id) {
        const result = await staffApi.getAllStaffs()
        return result.data
      } else {
        const result = await staffApi.getStaffsListByCollegeId(id)
        return result.data
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export const useGetStaffDetailsByIdQuery = (id: number) => {
  return useQuery({
    queryKey: staffQueryKeys.detail(id),
    queryFn: async () => {
      const result = await staffApi.getStaffDetailById(id)
      return result.data
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}

export const useAddStaffMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newStaff: any) => {
      const result = await staffApi.addStaff(newStaff)
      return result.data
    },
    onMutate: (newStaff) => {
      queryClient.cancelQueries({ queryKey: staffQueryKeys.lists() })
      const prevList = queryClient.getQueryData(staffQueryKeys.lists())

      queryClient.setQueriesData(
        { queryKey: staffQueryKeys.lists() },
        (old: IStaff[] | undefined) => {
          if (!old) {
            return [newStaff as IStaff]
          }
          return [...old, newStaff as IStaff]
        },
      )
      return { prevList }
    },
    onError: (error, newStaff, context) => {
      console.log('Error adding a new staff', error, newStaff)

      queryClient.setQueryData(staffQueryKeys.lists(), context?.prevList)
    },
    onSettled: (newStaff) => {
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.lists() })
    },
  })
}
