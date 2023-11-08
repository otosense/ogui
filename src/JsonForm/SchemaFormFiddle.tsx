import React, { memo, useCallback, useEffect, useState } from 'react'
import Form from '@rjsf/mui'
import validator from '@rjsf/validator-ajv8'
import { isEmpty } from 'lodash'
import { Alert } from '@mui/material'
import { type FormProps } from '@rjsf/core'
import { type RJSFSchema } from '@rjsf/utils'
import SplitterLayout from 'react-splitter-layout'
import SearchBox from './components/SearchBox'
import Editors from './components/Editor'
import LoadingOverlay from '../utilities/Loader'
import { useOrientation } from '../utilities/withOrientationEffect'
import CustomModal from './components/Modal'
import ResetAll from './components/ResetSpec'
import ReactToastMessage, { showToast } from '../utilities/ReactToastMessage'
import { withInitialData } from './utilities/withInitialData'
import { arraySplitter } from './utilities/Mapping/storeMapping'

interface IFunctionCallerProps extends FormProps<any, RJSFSchema, any> {
  getStoreList: [] | (() => []) | (() => Promise<any[]>)
  onLoadSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  resetSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  saveSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  callDagSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  egress?: (...args: any[]) => any
}

type IFormData = Record<string, any>
interface Option {
  label: string
  value: string
}

const SchemaFormFiddle = (props: IFunctionCallerProps & {
  funcList: string[]
  isError: boolean
  isLoading: boolean
}): JSX.Element => {
  const { funcList, isError, isLoading } = props
  const { onLoadSchema, saveSchema, egress, resetSchema, callDagSchema } = props
  const [collection, setCollection] = useState<any>({})
  const [formData, setFormData] = useState<IFormData>()
  const [selectedFormType, setSelectedFormType] = useState<Option>()
  const [show, setShow] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [funcStoreList, setFuncStoreList] = useState(funcList)
  const [isCallingComponent, setIsCallingComponent] = useState<boolean>(false)

  useEffect(() => {
    const combinedCheck = funcList.flatMap((subarray: any) => subarray?.join('.'))
    setFuncStoreList(combinedCheck)
    // setFuncStoreList(funcList.map(func => func[1]))
  }, [funcList])

  const onSubmit = async (props: IFormData): Promise<void> => {
    setIsCallingComponent(true)
    const { formData } = props
    setFormData(formData)
    const outputArray = arraySplitter(selectedFormType?.value)
    const finalPay = {
      ...formData,
      _key: outputArray[0]
    }
    try {
      let output = await callDagSchema(finalPay)
      output = (egress != null) ? egress(output) : output
      setShow(output)
      setIsCallingComponent(false)
    } catch (error) {
      const errEl: any = (
        <Alert severity="error" className="errorMessage">
            {error.message}
        </Alert>
      )
      setShow(errEl)
    }
    setIsCallingComponent(false)
  }
  // handle orientation change
  const orientation = useOrientation((orientation: boolean) => orientation)

  const handleUpload = useCallback((data: any) => {
    setCollection(JSON.parse(data))
  }, [])

  const schemaData = (data: { rjsf: any }): void => {
    setCollection(data?.rjsf)
  }

  // useEffect(() => {
  // generateInitialData(getStoreList, setFuncList, setIsError, setIsLoading)
  // }, [getStoreList])

  const handleValue = (value: any): void => {
    setSelectedFormType(value)
    setFormData({})
    setShow(null)
  }

  const handleCloseModal = (): void => {
    setOpenModal(false)
  }

  const handleOpenModal = (): void => {
    setOpenModal(true)
  }

  const newJsonSpecValue = async (val: any): Promise<void> => {
    const outputArray = arraySplitter(selectedFormType?.value)
    const data = await onLoadSchema(outputArray[0])
    setCollection(data?.rjsf)
  }

  return (
    <main>
      {isError
        ? (<Alert severity="error" className="errorMessage">
          There is an Error getting Store List data
        </Alert>)
        : (
        <main className="main-json-fiddle">
           {(isLoading || isCallingComponent) && <LoadingOverlay />}
          <h1 className="center">JSON Form Fiddle</h1>
          <div className="inputs-fiddle">
            <SearchBox
              handleValue={handleValue}
              data={funcStoreList}
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
                    handleOpenModal={handleOpenModal}
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
        <CustomModal
            open={openModal}
            handleClose={handleCloseModal}
            title="Reset the Specification Panel"
            content={<ResetAll handleClose={handleCloseModal} resetSchema={resetSchema}
            formType={selectedFormType} newJsonSpecValue={newJsonSpecValue}/>
          }
        />
        <ReactToastMessage />
    </main>
  )
}

SchemaFormFiddle.defaultProps = {
  getStoreList: [],
  onLoadSchema: {},
  saveSchema: {}
}

export default memo(withInitialData(SchemaFormFiddle))
