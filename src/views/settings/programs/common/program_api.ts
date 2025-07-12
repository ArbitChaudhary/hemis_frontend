import programApi from '@/api/api-endpoints/programApi'
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, toValue, type Ref } from 'vue'
import type { IPrograms } from './programs_types'

export const programAPIKeys = {
  all: ['programs'] as const,
  lists: () => [...programAPIKeys.all, 'lists'] as const,
  list: (filter: string) => [...programAPIKeys.lists(), filter] as const,
  details: () => [...programAPIKeys.all, 'detail'] as const,
  detail: (id: number) => [...programAPIKeys.details(), id] as const,
  collegeProgramList: (id: number) => [...programAPIKeys.lists(), id] as const,
}

export const useGetAllProgramsQuery = () => {
  return useQuery({
    queryKey: programAPIKeys.lists(),
    queryFn: async () => {
      const result = await programApi.getAllPrograms()
      return result.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export const useGetProgramsByCollegeIdQuery = (id: number | Ref<number | null>) => {
  return useQuery({
    queryKey: programAPIKeys.collegeProgramList(id as number),
    queryFn: async () => {
      const result = await programApi.getProgramsByCollegeId(Number(id))
      return result.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: computed(() => !!toValue(id)),
  })
}

export const useAddProgramMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newProgram: any) => {
      const result = await programApi.addProgram(newProgram)
      return result.data
    },
    onMutate: (newProgram) => {
      queryClient.cancelQueries({ queryKey: programAPIKeys.lists() })

      const prevList = queryClient.getQueryData(programAPIKeys.lists())

      if (prevList) {
        queryClient.setQueriesData(
          { queryKey: programAPIKeys.lists() },
          (old: IPrograms[] | undefined) => {
            if (!old) {
              return [newProgram as IPrograms]
            }
            return [...old, newProgram as IPrograms]
          },
        )
      }
      return { prevList }
    },
    onError: (error, newProgram, context) => {
      console.log('Error adding program', error, newProgram)

      queryClient.setQueryData(programAPIKeys.lists(), context?.prevList)
    },
    onSettled: (newProgram) => {
      if (newProgram) {
        queryClient.invalidateQueries({ queryKey: programAPIKeys.lists() })
      }
    },
  })
}

export const useUpdateProgramByIdMutation = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newProgram: any) => {
      const result = await programApi.updateProgramById(id, newProgram)
      return result?.data
    },
    onMutate: (newProgram) => {
      queryClient.cancelQueries({ queryKey: programAPIKeys.lists() })
      queryClient.cancelQueries({ queryKey: programAPIKeys.detail(newProgram?.id) })

      const prevProgram = queryClient.getQueryData(programAPIKeys.detail(newProgram?.id))
      const prevList = queryClient.getQueryData(programAPIKeys.lists())

      if (prevProgram) {
        queryClient.setQueryData(programAPIKeys.detail(newProgram?.id), {
          ...prevProgram,
          ...newProgram,
        })
        if (prevList) {
          queryClient.setQueriesData(
            { queryKey: programAPIKeys.lists() },
            (old: { data: IPrograms[] | undefined } | undefined) => {
              if (!old?.data) {
                return { data: [] }
              }
              return { data: [...old.data, newProgram as IPrograms] }
            },
          )
        }
      }
      return { newProgram, prevList, prevProgram }
    },
    onError: (error, newProgram, context) => {
      console.log('Error updating program', error, newProgram)

      queryClient.setQueryData(programAPIKeys.detail(context?.newProgram?.id), context?.prevProgram)
      queryClient.setQueryData(programAPIKeys.lists(), context?.prevList)
    },
    onSettled: (data, error, newProgram) => {
      queryClient.invalidateQueries({ queryKey: programAPIKeys.lists() })
      queryClient.invalidateQueries({ queryKey: programAPIKeys.detail(newProgram?.id) })
    },
  })
}

export const useDeleteProgramByIdMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const result = await programApi.deleteProgramById(id)
      return result.data
    },
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: programAPIKeys.lists() })
      queryClient.cancelQueries({ queryKey: programAPIKeys.detail(id) })

      const prevList = queryClient.getQueryData(programAPIKeys.lists())
      const prevProgram = queryClient.getQueryData(programAPIKeys.detail(id))

      queryClient.setQueriesData(
        { queryKey: programAPIKeys.lists() },
        (old: { data: IPrograms[] | undefined } | undefined) => {
          if (!old?.data) {
            return { data: [] }
          }
          return { data: old.data.filter((item) => item.id !== id) }
        },
      )
      queryClient.removeQueries({ queryKey: programAPIKeys.detail(id) })
      return { prevList, prevProgram, id }
    },
    onError: (error, id, context) => {
      console.log('Error deleting program', error, id)

      queryClient.setQueryData(programAPIKeys.lists(), context?.prevList)
      queryClient.setQueryData(programAPIKeys.detail(id), context?.prevProgram)
    },
    onSettled: (data, error, id) => {
      queryClient.invalidateQueries({ queryKey: programAPIKeys.lists() })

      if (!error) {
        queryClient.removeQueries({ queryKey: programAPIKeys.detail(id) })
      }
    },
  })
}
