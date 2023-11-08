import React from 'react'
import SchemaFormFiddle from '../SchemaFormFiddle'
import { DagComponents, FormSpecStore } from './configs'
import { specifications, store } from './data'

async function fetchData (payload: any, url: string): Promise<any> {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...payload }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.error)
  }

  return json
}
function AppTest (): JSX.Element {
  const sum = (a: string): string => {
    const output = a
    return output
  }
  const getFullFormSpecStore = async (): Promise<any> => {
    // return store
    const payload = {
      _attr_name: '__iter__'
    }
    // Saving the Dag to Backend using API
    const response = await fetchData(payload, FormSpecStore)
    return response
  }

  const getSchemaForForm = async (data: any): Promise<any> => {
    // return specifications
    const payload = {
      _attr_name: '__getitem__',
      key: data
    }
    const response = await fetchData(payload, FormSpecStore)
    return response
  }

  const saveSchema = async (data: any): Promise<any> => {
    const payload = {
      _attr_name: '__setitem__',
      key: data.key,
      value: data.value
    }
    const response = await fetchData(payload, FormSpecStore)
    return response
  }

  const resetSchema = async (data: any): Promise<any> => {
    // return await specifications;
    const payload = {
      _attr_name: '__delitem__',
      key: data
    }

    const response = await fetchData(payload, FormSpecStore)
    return response
  }

  const callDagSchema = async (data: any): Promise<any> => {
    const response = await fetchData(data, DagComponents)
    return response
  }

  const egress = (output: any): any => {
    if (Array.isArray(output)) {
      return (
        <>
          <h4>Output:</h4>
          <ul>
            {output.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )
    }
    return (
      <>
        <h4>Output:</h4>
        <div dangerouslySetInnerHTML={{ __html: output }} />
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
