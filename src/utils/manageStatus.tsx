interface StatusType {
  isLoading: boolean
  isError: boolean
}

type ErrorType<T> = {
  error: T | unknown
}

export const manageStatus = ({ isLoading, isError }: StatusType, { error }: ErrorType<object>) => {
  if (isLoading) {
    return <h2>Loading...</h2>
  } else if (isError) {
    return <h2>{Object(error).message}</h2>
  }
}
