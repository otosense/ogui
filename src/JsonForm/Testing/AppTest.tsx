import React from 'react'
import SchemaFormFiddle from '../SchemaFormFiddle'
import { specifications, store } from './Mockdata'
import 'react-splitter-layout/lib/index.css'
import './../css/JsonForm.scss'

function AppTest (): JSX.Element {
  const sum = (a: string): string => {
    const output = a
    return output
  }
  const getFullFormSpecStore = async (): Promise<any> => {
    return store
  }

  const getSchemaForForm = async (data: any): Promise<any> => {
    return specifications
  }

  const saveSchema = async (data: any): Promise<any> => {
    return specifications
  }

  const resetSchema = async (data: any): Promise<any> => {
    return specifications
  }

  const callDagSchema = async (data: any): Promise<any> => {
    return 'p'
  }

  const egress = (output: any): any => {
    let isJsonable = true
    try {
      JSON.stringify(output)
    } catch (e) {
      isJsonable = false
    }

    // if (Array.isArray(output)) {
    //   return (
    //     <>
    //       <h4>Output:</h4>
    //       <ul>
    //         {output.map((item, index) => (
    //           <li key={index}>{item}</li>
    //         ))}
    //       </ul>
    //     </>
    //   )
    // } else

    const doc = new DOMParser().parseFromString(output, 'text/html')
    const isHtml = Array.from(doc.body.childNodes).some(node => node.nodeType === 1)

    let outputEl = <div>{output}</div>

    if (isHtml) {
      outputEl = <div dangerouslySetInnerHTML={{ __html: output }} />
    } else if (isJsonable) {
      outputEl = <pre>{JSON.stringify(output, null, 2)}</pre>
    }

    return (
      <>
        <h4>Output:</h4>
        {outputEl}
      </>
    )
  }

  const configuration = {
    getStoreList: getFullFormSpecStore(),
    onLoadSchema: getSchemaForForm,
    saveSchema,
    func: sum,
    egress,
    resetSchema,
    callDagSchema
  }
  return (
    <SchemaFormFiddle {...configuration} />
  )
}
export default AppTest
