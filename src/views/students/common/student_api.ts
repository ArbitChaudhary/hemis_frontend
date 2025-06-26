import { useQuery } from '@tanstack/vue-query'
import studentsApi from '../../../api/api-endpoints/studentsApi'

export const studentQueryKeys = {
  all: ['students'] as const,
  lists: () => [...studentQueryKeys.all, 'list'] as const,
  list: (filter: string) => [...studentQueryKeys.lists(), filter] as const,
}

export const useGetAllStudents = () => {
  return useQuery({
    queryKey: studentQueryKeys.lists(),
    queryFn: async () => {
      const result = await studentsApi.getAllStudents()
      return result.data
    },
    select: (data) => data?.data,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
