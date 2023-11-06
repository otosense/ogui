import React from 'react'
import SchemaFormFiddle from '../SchemaFormFiddle'

const EndPointURL = 'http://20.219.8.178:8888'
const fetchURL = `${EndPointURL}/form_spec_store`
async function fetchData (payload: any): Promise<any> {
  try {
    const response = await fetch(fetchURL, {
      method: 'POST',
      body: JSON.stringify({ ...payload }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}
function AppTest (): JSX.Element {
  const sum = (a: string): string => {
    const output = a
    return output
  }
  const getFullFormSpecStore = async (): Promise<any> => {
    // return await store;
    const payload = {
      _attr_name: '__iter__'
    }
    // Saving the Dag to Backend using API
    const response = await fetchData(payload)
    return response
  }

  const getSchemaForForm = async (data: any): Promise<any> => {
    // return await specifications;
    const payload = {
      _attr_name: '__getitem__',
      key: data
    }
    const response = await fetchData(payload)
    return response
  }

  const saveSchema = async (data: any): Promise<any> => {
    const payload = {
      _attr_name: '__setitem__',
      key: data.key,
      value: data.value
    }
    const response = await fetchData(payload)
    return response
  }

  const resetSchema = async (data: any): Promise<any> => {
    // return await specifications;
    const payload = {
      _attr_name: '__delitem__',
      key: data
    }

    const response = await fetchData(payload)
    return response
  }

  const egress = (output: any): any => {
    return <h1>{output}</h1>
  }

  const configuration = {
    getStoreList: getFullFormSpecStore(),
    onLoadSchema: getSchemaForForm,
    saveSchema,
    func: sum,
    egress,
    resetSchema
  }
  return (
    <SchemaFormFiddle {...configuration} />
  )
}
export default AppTest
