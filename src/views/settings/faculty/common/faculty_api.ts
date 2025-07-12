import facultyApi from '@/api/api-endpoints/facultyApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { IFaculty } from './faculty_types'
import { computed, toValue, type Ref } from 'vue'

export const facultyAPIKeys = {
  all: ['faculties'] as const,
  lists: () => [...facultyAPIKeys.all, 'list'] as const,
  list: (filter: string) => [...facultyAPIKeys.lists(), filter] as const,
  details: () => [...facultyAPIKeys.all, 'detail'] as const,
  detail: (id: number) => [...facultyAPIKeys.details(), String(id)] as const,
  levelFaculties: (id: number) => [...facultyAPIKeys.all, id] as const,
}

export const useGetAllFaculties = () => {
  return useQuery({
    queryKey: facultyAPIKeys.lists(),
    queryFn: async () => {
      const result = await facultyApi.getAllFaculties()
      return result.data
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}

export const useAddFacultyMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newFaculty: any) => {
      const result = await facultyApi.addFaculty(newFaculty)
      return result.data
    },
    onMutate: (newFaculty) => {
      queryClient.cancelQueries({ queryKey: facultyAPIKeys.lists() })
      const prevList = queryClient.getQueryData(facultyAPIKeys.lists())

      if (prevList) {
        queryClient.setQueriesData(
          { queryKey: facultyAPIKeys.lists() },
          (old: IFaculty[] | undefined) => {
            if (!old) {
              return [newFaculty as IFaculty]
            }
            return [...old, newFaculty]
          },
        )
      }
      return { prevList }
    },
    onError: (error, newFaculty, context) => {
      console.log('Error adding new faculty', error, newFaculty)

      if (newFaculty) {
        queryClient.setQueryData(facultyAPIKeys.lists(), context?.prevList)
      }
    },
    onSettled: (newFaculty) => {
      if (newFaculty) {
        queryClient.invalidateQueries({ queryKey: facultyAPIKeys.lists() })
      }
    },
  })
}

export const useDeleteFacultyByIdMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const result = await facultyApi.deleteFacultyById(id)
      return result.data
    },
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: facultyAPIKeys.lists() })
      queryClient.cancelQueries({ queryKey: facultyAPIKeys.detail(id) })
      const prevFaculty = queryClient.getQueryData(facultyAPIKeys.detail(id))

      const prevFaculties = queryClient.getQueryData(facultyAPIKeys.lists())

      if (prevFaculties) {
        queryClient.setQueriesData(
          { queryKey: facultyAPIKeys.lists() },
          (old: { data: IFaculty[] | undefined } | undefined) => {
            if (!old?.data) {
              return { data: [] }
            }
            return {
              data: old.data?.filter((item) => item.id !== id),
            }
          },
        )
      }
      queryClient.removeQueries({ queryKey: facultyAPIKeys.detail(id) })
      return { prevFaculties, id, prevFaculty }
    },
    onError: (error, id, context) => {
      console.log('Error deleting faculty', error, id)

      if (context?.prevFaculties) {
        queryClient.setQueryData(facultyAPIKeys.lists(), context?.prevFaculties)
      }
      if (context?.prevFaculty) {
        queryClient.setQueryData(facultyAPIKeys.detail(id), context.prevFaculty)
      }
    },
    onSettled: (_, error, id) => {
      queryClient.invalidateQueries({ queryKey: facultyAPIKeys.lists() })

      if (!error) {
        queryClient.removeQueries({ queryKey: facultyAPIKeys.detail(id) })
      }
    },
  })
}

export const useUpdateFacultyByIdMutation = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newFaculty: any) => {
      const result = await facultyApi.updateFacultyById(id, newFaculty)
      return result.data
    },
    onMutate: (newFaculty) => {
      queryClient.cancelQueries({ queryKey: facultyAPIKeys.lists() })
      queryClient.cancelQueries({ queryKey: facultyAPIKeys.detail(id) })

      const prevLists = queryClient.getQueryData(facultyAPIKeys.lists())
      const prevFaculty = queryClient.getQueryData(facultyAPIKeys.detail(newFaculty?.id))

      if (prevFaculty) {
        queryClient.setQueryData(facultyAPIKeys.detail(newFaculty?.id), {
          ...prevFaculty,
          ...newFaculty,
        })
      }
      if (prevLists) {
        queryClient.setQueriesData(
          { queryKey: facultyAPIKeys.lists() },
          (old: { data: IFaculty[] | undefined } | undefined) => {
            if (!old?.data) {
              return { data: [newFaculty as IFaculty] }
            }
            return { data: [...old?.data, newFaculty as IFaculty] }
          },
        )
      }
      return { prevFaculty, prevLists, newFaculty }
    },
    onError: (error, newFaculty, context) => {
      console.log('Error updating faculty', error, newFaculty)

      queryClient.setQueryData(facultyAPIKeys.lists(), context?.prevLists)
      queryClient.setQueryData(facultyAPIKeys.detail(context?.newFaculty?.id), context?.prevFaculty)
    },
    onSettled: (newFaculty) => {
      queryClient.invalidateQueries({ queryKey: facultyAPIKeys.lists() })

      if (newFaculty?.id) {
        queryClient.invalidateQueries({ queryKey: facultyAPIKeys.detail(newFaculty?.id) })
      }
    },
  })
}

export const useGetFacultiesByCollegeIdQuery = (id: number) => {
  return useQuery({
    queryKey: facultyAPIKeys.lists(),
    queryFn: async () => {
      const result = await facultyApi.getFacultiesByCollegeId(id)
      return result.data
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!id,
  })
}

export const useGetFacultyByIdQuery = (id: number) => {
  return useQuery({
    queryKey: facultyAPIKeys.detail(id),
    queryFn: async () => {
      const result = await facultyApi.getFacultyById(id)
      return result.data
    },
    staleTime: Infinity,
    enabled: !!id,
  })
}

export const useGetFacultiesByLevelIdQuery = (id: number | Ref<number | null>) => {
  return useQuery({
    queryKey: facultyAPIKeys.levelFaculties(id as number),
    queryFn: async () => {
      const result = await facultyApi.getFacultiesByLevelId(toValue(id as number))
      return result.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: computed(() => !!toValue(id as number)),
  })
}
