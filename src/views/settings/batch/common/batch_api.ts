import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { IBatch, IBatchDTO } from './batch_types'
import batchApi from '@/api/api-endpoints/batchApi'

export const batchAPIKeys = {
  all: ['batches'] as const,
  lists: () => [...batchAPIKeys.all, 'list'] as const,
  list: (filter: string) => [...batchAPIKeys.lists(), filter] as const,
  details: (id: string) => [...batchAPIKeys.all] as const,
}

export const useAddBatchMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: IBatchDTO) => {
      const result = await batchApi.addBatch(data)
      return result.data
    },
    onMutate: async (newBatch: IBatchDTO) => {
      queryClient.cancelQueries({ queryKey: batchAPIKeys.lists() })
      const prevBatches = queryClient.getQueryData<IBatch[]>(batchAPIKeys.lists())
      // Optimistically update
      if (prevBatches) {
        queryClient.setQueryData<IBatch[]>(batchAPIKeys.lists(), (old) => {
          return old ? [...old, newBatch as IBatch] : [newBatch as IBatch]
        })
      }
      return { prevBatches }
    },
    onError: (error, newBatch, context) => {
      console.log('Error adding batch', error, newBatch)
      queryClient.setQueryData(batchAPIKeys.lists(), context?.prevBatches)
    },
    onSettled: (newBatch) => {
      if (newBatch) {
        queryClient.invalidateQueries({ queryKey: batchAPIKeys.lists() })
      }
    },
  })
}

export const useGetBatchByCollegeIdQuery = (id: string) => {
  return useQuery({
    queryKey: batchAPIKeys.lists(),
    queryFn: async () => {
      const result = await batchApi.getBatchByCollegeId(id)
      return result.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}

export const useGetBatchByIdQuery = (id: string) => {
  return useQuery({
    queryKey: batchAPIKeys.details(id),
    queryFn: async () => {
      const result = await batchApi.getBatchById(id)
      return result.data
    },
    staleTime: Infinity,
    enabled: !!id,
  })
}

export const useEditBatchByIdMutation = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const result = await batchApi.updateBatchByid(id, data)
      return result.data
    },
    onMutate: (newBatch) => {
      queryClient.cancelQueries({ queryKey: batchAPIKeys.details(String(newBatch.id)) })
      queryClient.cancelQueries({ queryKey: batchAPIKeys.lists() })

      const prevBatch = queryClient.getQueryData(batchAPIKeys.details(String(newBatch?.id)))
      const prevList = queryClient.getQueryData(batchAPIKeys.lists())
      if (prevBatch) {
        queryClient.setQueryData(batchAPIKeys.details(String(newBatch?.id)), {
          ...prevBatch,
          ...newBatch,
        })
      }
      queryClient.setQueriesData(
        { queryKey: batchAPIKeys.lists() },
        (old: { data: IBatch[] | undefined } | undefined) => {
          if (!old?.data) {
            return { data: [newBatch as IBatch] }
          }
          return {
            data: [...old?.data, newBatch as IBatch],
          }
        },
      )
      return { prevBatch, prevList, newBatch }
    },
    onError: (error, newBatch, context) => {
      console.log('Error updating batch', error, context?.newBatch)
      queryClient.setQueryData(
        batchAPIKeys.details(String(context?.newBatch?.id)),
        context?.prevBatch,
      )
      queryClient.setQueryData(batchAPIKeys.lists(), context?.prevList)
    },
    onSettled: (newBatch) => {
      queryClient.invalidateQueries({ queryKey: batchAPIKeys.details(String(newBatch?.data?.id)) })
      queryClient.invalidateQueries({ queryKey: batchAPIKeys.lists() })
    },
  })
}

export const useDeleteBatchByIdMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const result = await batchApi.deleteBatchById(String(id))
      return result.data
    },
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: batchAPIKeys.details(String(id)) })
      queryClient.cancelQueries({ queryKey: batchAPIKeys.lists() })

      const prevBatch = queryClient.getQueryData(batchAPIKeys.details(String(id)))

      const prevList = queryClient.getQueryData(batchAPIKeys.lists())

      queryClient.setQueryData(
        batchAPIKeys.lists(),
        (old: { data: IBatch[] | undefined } | undefined) => {
          if (!old?.data) {
            return { data: [] }
          }
          return {
            data: old.data.filter((batch) => batch?.id !== id),
          }
        },
      )
      queryClient.removeQueries({ queryKey: batchAPIKeys.details(String(id)) })
      return { prevBatch, prevList, id }
    },
    onError: (error, id, context) => {
      console.log('Error deleteing batch', error, id)

      if (context?.prevBatch) {
        queryClient.setQueryData(batchAPIKeys.details(String(id)), context?.prevBatch)
      }
      if (context?.prevList) {
        queryClient.setQueryData(batchAPIKeys.lists(), context.prevList)
      }
    },
    onSuccess: (data, error, id) => {
      queryClient.invalidateQueries({ queryKey: batchAPIKeys.lists() })
      if (!error) {
        queryClient.cancelQueries({ queryKey: batchAPIKeys.details(String(id)) })
      }
    },
  })
}
