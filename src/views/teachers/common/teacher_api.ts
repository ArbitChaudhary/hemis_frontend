import teacherApi from '@/api/api-endpoints/teacherApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { ITeacher } from './teacher_types'

export const teacherQueryKeys = {
  all: ['teachers'] as const,
  lists: () => [...teacherQueryKeys.all, 'lists'] as const,
  list: (filter: string) => [...teacherQueryKeys.lists(), filter] as const,
  details: () => [...teacherQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...teacherQueryKeys.details(), id] as const,
}

export const useGetAllTeachersQuery = (id?: number) => {
  return useQuery({
    queryKey: teacherQueryKeys.lists(),
    queryFn: async () => {
      if (!id) {
        const result = await teacherApi.getAllTeachers()
        return result.data
      } else {
        const result = await teacherApi.getTeachersListByCollegeId(id)
        return result.data
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export const useGetTeacherDetailsByIdQuery = (id: number) => {
  return useQuery({
    queryKey: teacherQueryKeys.detail(id),
    queryFn: async () => {
      const result = await teacherApi.getTeacherDetailById(id)
      return result.data
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}

export const useAddTeacherMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newTeacher: any) => {
      const result = await teacherApi.addTeacher(newTeacher)
      return result.data
    },
    onMutate: (newTeacher) => {
      queryClient.cancelQueries({ queryKey: teacherQueryKeys.lists() })
      const prevList = queryClient.getQueryData(teacherQueryKeys.lists())

      queryClient.setQueriesData(
        { queryKey: teacherQueryKeys.lists() },
        (old: ITeacher[] | undefined) => {
          if (!old) {
            return [newTeacher as ITeacher]
          }
          return [...old, newTeacher as ITeacher]
        },
      )
      return { prevList }
    },
    onError: (error, newTeacher, context) => {
      console.log('Error adding a new teacher', error, newTeacher)

      queryClient.setQueryData(teacherQueryKeys.lists(), context?.prevList)
    },
    onSettled: (newTeacher) => {
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.lists() })
    },
  })
}
