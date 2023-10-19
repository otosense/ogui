import React, { memo, useCallback, useEffect, useState } from 'react'
import Form from '@rjsf/mui'
import validator from '@rjsf/validator-ajv8'
import { isEmpty, isFunction, isObject } from 'lodash'
import { Alert } from '@mui/material'
import { type FormProps } from '@rjsf/core'
import { type RJSFSchema } from '@rjsf/utils'
import SplitterLayout from 'react-splitter-layout'
import SearchBox from './components/SearchBox'
import Editors from './components/Editor'
import LoadingOverlay from '../utilities/Loader'
import { useOrientation } from '../utilities/withOrientationEffect'

interface IFunctionCallerProps extends FormProps<any, RJSFSchema, any> {
  getStoreList: [] | (() => []) | (() => Promise<any[]>)
  onLoadSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  saveSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  func?: (...args: any[]) => any
  egress?: (...args: any[]) => any
}

type IFormData = Record<string, any>
interface Option {
  label: string
  value: string
}

const SchemaFormFiddle = (props: IFunctionCallerProps): JSX.Element => {
  const { getStoreList, onLoadSchema, saveSchema, func, egress } = props
  const [collection, setCollection] = useState<any>({})
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [funcList, setFuncList] = useState<string[]>([])
  const [formData, setFormData] = useState<IFormData>()
  const [selectedFormType, setSelectedFormType] = useState<Option>()
  const [show, setShow] = useState()

  const onSubmit = (props: IFormData): void => {
    const { formData } = props
    setFormData(formData)
    const output = func?.(...Object.values(formData))
    setShow((egress != null) ? egress(output) : output)
  }
  // handle orientation change
  const orientation = useOrientation((orientation: boolean) => orientation)

  const handleUpload = useCallback((data: any) => {
    setCollection(JSON.parse(data))
  }, [])

  const schemaData = (data: { rjsf: any }): void => {
    setCollection(data?.rjsf)
  }

  useEffect(() => {
    generateInitialData(getStoreList, setFuncList, setIsError, setIsLoading)
  }, [getStoreList])

  const handleValue = (value: any): void => {
    setSelectedFormType(value)
  }

  if (isLoading) return <LoadingOverlay />

  return (
    <main>
      {isError
        ? (<Alert severity="error" className="errorMessage">
          There is an Error getting Store List data
        </Alert>)
        : (
        <main className="main-json-fiddle">
          <h1 className="center">JSON Form Fiddle</h1>
          <div className="inputs-fiddle">
            <SearchBox
              handleValue={handleValue}
              data={funcList}
              onLoadSchema={onLoadSchema}
              schemaData={schemaData}
            />
          </div>

          <section className="jsonFiddle">
            <SplitterLayout
              vertical={orientation}
              percentage={true}
              secondaryInitialSize={50}
              secondaryMinSize={50}
            >
              <div className="fiddle-left-side">
                <div className="schema-layout layout-common">
                  <Editors
                    data={collection}
                    onDataUploaded={handleUpload}
                    title="Specifications"
                    saveSchema={saveSchema}
                    formType={selectedFormType}
                  />
                </div>
              </div>
              <div className="fiddle-right-side">
                {!isEmpty(collection) && (
                  <Form
                    validator={validator}
                    {...collection}
                    onSubmit={onSubmit}
                    formData={formData} // remove this to clear the value once the submit button is clicked
                  />
                )}
                {show}
              </div>
            </SplitterLayout>
          </section>
        </main>
          )}
    </main>
  )
}

SchemaFormFiddle.defaultProps = {
  getStoreList: [],
  onLoadSchema: {},
  saveSchema: {}
}

export default memo(SchemaFormFiddle)
function generateInitialData (
  DagFuncList: any[] | (() => any[]) | (() => Promise<any[]>),
  setFuncList: React.Dispatch<any>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): void {
  // setIsLoading(true);
  if (isEmpty(DagFuncList)) {
    setFuncList([]) // Return an empty array if DagFuncList is not provided
    setIsError(true)
  }

  if (isObject(DagFuncList)) {
    setIsError(false)
    const result: any = DagFuncList
    if (isFunction(result?.then)) {
      // Check if the result of the function is a promise
      result.then((dataArray: any) => {
        if (dataArray.length > 0) {
          setFuncList(dataArray)
        } else {
          setIsError(true)
          setFuncList([])
        }
        setIsLoading(false)
      })
    } else {
      setFuncList(result)
    }
    setIsLoading(false)
  }
}
