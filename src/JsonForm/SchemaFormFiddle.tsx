import React, { memo, useCallback, useState } from 'react'
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
import ReactToastMessage from '../utilities/ReactToastMessage'
import { withInitialData } from './utilities/withInitialData'
import AuthenticationPage from './Testing/Authentication'

interface IFunctionCallerProps extends FormProps<any, RJSFSchema, any> {
  getStoreList: [] | (() => []) | (() => Promise<any[]>)
  onLoadSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  resetSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  saveSchema: Record<string, unknown> | (() => Record<string, unknown>) | (() => Promise<Record<string, unknown>>)
  func?: (...args: any[]) => any
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
  const { onLoadSchema, saveSchema, func, egress, resetSchema } = props
  const [collection, setCollection] = useState<any>({})
  const [formData, setFormData] = useState<IFormData>()
  const [selectedFormType, setSelectedFormType] = useState<Option>()
  const [show, setShow] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [openAuthModal, setOpenAuthModal] = useState(true)

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

  // useEffect(() => {
  // generateInitialData(getStoreList, setFuncList, setIsError, setIsLoading)
  // }, [getStoreList])

  const handleValue = (value: any): void => {
    setSelectedFormType(value)
  }

  const handleCloseModal = (): void => {
    setOpenModal(false)
  }

  const handleOpenModal = (): void => {
    setOpenModal(true)
  }

  const newJsonSpecValue = async (val: any): Promise<void> => {
    const data = await onLoadSchema(selectedFormType?.label)
    setCollection(data?.rjsf)
  }

  const loginAuthentication = (data: any): void => {
    console.log('object', data)
    setOpenAuthModal(false)
  }

  return (
    <main>
      {isError
        ? (<Alert severity="error" className="errorMessage">
          There is an Error getting Store List data
        </Alert>)
        : (
        <main className="main-json-fiddle">
           {isLoading && <LoadingOverlay />}
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

        {!isLoading && <CustomModal
            open={openAuthModal}
            handleClose={handleCloseModal}
            title="Authentication"
            content={<AuthenticationPage FormData={loginAuthentication} />}
        /> }
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
