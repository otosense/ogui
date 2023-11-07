import React, { useState, useMemo } from 'react'
export function withInitialData (WrappedComponent: React.ComponentType<any>) {
  return function ComponentWithInitialData (props: any) {
    const { data } = props
    const [flatRow, setFlatRowData] = useState<string[]>([])
    const [dataCopy, setDataCopy] = useState<string[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>()
    console.log({ data })
    useMemo(() => {
      setIsLoading(true)
      if (data.length === 0) {
        setIsError(true)
        setIsLoading(false)
        setErrorMessage('data is not provided')
        return [] // Return an empty array if data is not provided
      }

      if (typeof data === 'function') {
        // Check if data is a function
        const result: any = data()
        if (typeof result.then === 'function') {
          // Check if the result of the function is a promise
          return result.then((dataArray: any) => {
            setFlatRowData(dataArray)
            setDataCopy([...dataArray])
            setIsLoading(false)
            return dataArray
          })
        } else {
          const dataArray = result as any[] // Assuming the result is an array
          setFlatRowData(dataArray)
          setDataCopy([...dataArray])
          setIsLoading(false)
          return dataArray // Return the result of the function
        }
      } else if (Array.isArray(data)) {
        // Check if data is an array
        setFlatRowData(data)
        setDataCopy([...data])
        setIsLoading(false)
        return data // Return the provided array
      } else {
        setIsLoading(false)
        setIsError(true)
        setErrorMessage('unknown data type found,')
        return [] // Return an empty array for unknown data types
      }
    }, [data])

    return (
      <WrappedComponent
        {...props}
        flatRow={flatRow}
        dataCopy={dataCopy}
        isError={isError}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    )
  }
}
