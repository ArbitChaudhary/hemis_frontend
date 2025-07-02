import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import studentsApi from '../../../api/api-endpoints/studentsApi'
import type { IStudent, IStudentDTO } from './types'

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

export const useAddStudentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newStudent: IStudentDTO) => {
      const result = await studentsApi.addStudent(newStudent)
      return result.data
    },
    onMutate: async (newStudent) => {
      await queryClient.cancelQueries({ queryKey: studentQueryKeys.lists() })

      const previousStudents = queryClient.getQueryData(studentQueryKeys.lists())
      if (previousStudents) {
        queryClient.setQueriesData(
          { queryKey: studentQueryKeys.lists() },
          (old: IStudentDTO[] | undefined) => {
            if (!old) {
              return [newStudent as IStudentDTO]
            }
            return [...old, newStudent as IStudentDTO]
          },
        )
      }
      return { previousStudents }
    },
    onError: (error, newStudent, context) => {
      console.log('Error adding student', error, newStudent)
      queryClient.setQueryData(studentQueryKeys.lists(), context?.previousStudents)
    },
    onSettled: (newStudent) => {
      if (newStudent) {
        queryClient.invalidateQueries({ queryKey: studentQueryKeys.lists() })
      }
    },
  })
}
