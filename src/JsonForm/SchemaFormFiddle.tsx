import React, { memo, useCallback, useEffect, useState } from 'react'
import Form from '@rjsf/mui'
import validator from '@rjsf/validator-ajv8'
import { isEmpty } from 'lodash'
import { Alert, Typography } from '@mui/material'
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
import { errorKey } from './Testing/configs'

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
  errorMessage: string
}): JSX.Element => {
  const { funcList, isError, isLoading, errorMessage } = props
  const { onLoadSchema, saveSchema, egress, resetSchema, callDagSchema } = props
  const [collection, setCollection] = useState<any>({})
  const [formData, setFormData] = useState<IFormData>()
  const [selectedFormType, setSelectedFormType] = useState<Option>()
  const [show, setShow] = useState<any>()
  const [openModal, setOpenModal] = useState(false)
  const [funcStoreList, setFuncStoreList] = useState(funcList)
  const [isLoadingComponent, setIsLoadingComponent] = useState<boolean>(isLoading)

  useEffect(() => {
    const combinedCheck = funcList.flatMap((subarray: any) => subarray?.join('.'))
    setFuncStoreList(combinedCheck)
    if (!isEmpty(funcList)) {
      setIsLoadingComponent(false)
    }
    // setFuncStoreList(funcList.map(func => func[1]))
  }, [funcList])

  const onSubmit = async (props: IFormData): Promise<void> => {
    setIsLoadingComponent(true)
    const { formData } = props
    setFormData(formData)
    const outputArray = arraySplitter(selectedFormType?.value)
    const finalPay = {
      ...formData,
      _key: outputArray[0]
    }

    try {
      let output = await callDagSchema(finalPay)
      if (Object.prototype.hasOwnProperty.call(output, errorKey)) {
        const errEl: any = (
          <Alert severity={errorKey} className="errorMessage">
            {output?.error.message}
          </Alert>
        )
        setShow(errEl)
      } else {
        output = (egress != null) ? egress(output) : output
        setShow(output)
        setIsLoadingComponent(false)
      }
    } catch (error: any) {
      const errEl: any = (
        <Alert severity={errorKey} className="errorMessage">
            {error.message}
        </Alert>
      )
      setShow(errEl)
    }
    setIsLoadingComponent(false)
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
    console.log('selectedFormType', selectedFormType)
    const outputArray = arraySplitter(selectedFormType?.value)
    console.log('outputArray', outputArray)
    try {
      const data = await onLoadSchema(outputArray[0])
      setCollection(data?.rjsf)
    } catch (error: any) {
      showToast(error?.message, errorKey)
      setIsLoadingComponent(false)
    }
  }

  return (
    <main>
      {isError
        ? (<Alert severity="error" className="errorMessage">
          {errorMessage}
        </Alert>)
        : (
        <main className="main-json-fiddle">
           {(isLoadingComponent) && <LoadingOverlay />}
          <Typography variant="h3" gutterBottom>
          JSON Form Fiddle
          </Typography>
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

                <div style={{ margin: '10px 0' }}>
                {show}
                </div>
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
