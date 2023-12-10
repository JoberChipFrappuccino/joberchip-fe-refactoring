import type { QueryFunction, QueryKey } from '@tanstack/query-core'
import { parseQueryArgs } from '@tanstack/query-core'
import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'

type UseSuspenseQuery<TData, TError> = Omit<UseQueryResult<TData, TError>, 'data'> & { data: TData }

/**
 * @description Suspense를 사용할 경우 TData가 undefined가 아님을 보장합니다.
 */
export const useSuspenseQuery = <TQueryFnData, TError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  arg1: TQueryKey | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg2?: QueryFunction<TQueryFnData, TQueryKey> | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg3?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseSuspenseQuery<TData, TError> => {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3)
  const queryResult = useQuery({
    ...parsedOptions,
    suspense: true
  }) as unknown as UseSuspenseQuery<TData, TError>
  return queryResult
}
