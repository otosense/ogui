import React, { useState, useEffect } from 'react'
import { isEmpty, isFunction, isObject } from 'lodash'
import { errorKey } from '../Testing/configs'

export function withInitialData (WrappedComponent: React.ComponentType<any>) {
  return function ComponentWithInitialData (props: any) {
    const [funcList, setFuncList] = useState<string[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
      // setIsLoading(true);
      if (isEmpty((props.getStoreList))) {
        setFuncList([]) // Return an empty array if DagFuncList is not provided
        setIsError(true)
      }

      if (isObject(props.getStoreList)) {
        setIsError(false)
        const result: any = props.getStoreList
        if (isFunction(result?.then)) {
          // Check if the result of the function is a promise
          result.then((dataArray: any) => {
            if (Object.prototype.hasOwnProperty.call(dataArray, errorKey)) {
              setIsError(true)
              setErrorMessage(dataArray?.error?.message)
              setIsLoading(false)
            } else if (dataArray.length > 0) {
              // setFuncList(dataArray.map((item: any) => item[1]))
              setFuncList(dataArray)
            } else {
              setIsError(true)
              setFuncList([])
            }
            setIsLoading(false)
          }).catch((error: any) => {
            // Handle the error here
            setIsError(true)
            setErrorMessage(error?.message)
            setIsLoading(false)
          })
        } else {
          // setFuncList(result.map((item: any) => item[1]))
          setFuncList(result)
        }
        // setIsLoading(false)
      }
    }, [props.getStoreList])

    return (
      <WrappedComponent
        {...props}
        funcList={funcList}
        isError={isError}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    )
  }
}
