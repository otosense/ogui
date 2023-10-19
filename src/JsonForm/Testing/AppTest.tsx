import React from 'react'
import SchemaFormFiddle from '../SchemaFormFiddle'

function AppTest (): JSX.Element {
//   const sum = (a: number, b: number): number => {
//     const output = a + b
//     // console.log('object', output, typeof output);
//     return output
//   }
  const getFullFormSpecStore = async (): Promise<any> => {
    // return await store;

    const payload = {
      _attr_name: '__iter__'
    }
    // Saving the Dag to Backend using API
    try {
      const response = await fetch('http://20.219.8.178:8080/form_spec_store', {
        method: 'POST',
        body: JSON.stringify({
          ...payload
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const json = await response.json()
      // console.log('json', json);
      return json
    } catch (error) {
      console.error('Error fetching data:', error)
      return [] // Return an empty array or handle the error appropriately
    }
  }

  const getSchemaForForm = async (data: any): Promise<any> => {
    // return await specifications;
    const payload = {
      _attr_name: '__getitem__',
      key: data
    }

    try {
      const response = await fetch('http://20.219.8.178:8080/form_spec_store', {
        method: 'POST',
        body: JSON.stringify({
          ...payload
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const json = await response.json()
      // console.log('json', json);
      return json
    } catch (error) {
      console.error('Error fetching data:', error)
      return [] // Return an empty array or handle the error appropriately
    }
  }

  const saveSchema = async (data: any): Promise<any> => {
    const payload = {
      _attr_name: '__setitem__',
      key: data.key,
      value: data.value
    }
    console.log({ payload })
    try {
      const response = await fetch('http://20.219.8.178:8080/form_spec_store', {
        method: 'POST',
        body: JSON.stringify({
          ...payload
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const json = await response.json()
      // console.log('json', json);
      return json
    } catch (error) {
      console.error('Error fetching data:', error)
      return [] // Return an empty array or handle the error appropriately
    }
  }

  const configuration = {
    getStoreList: getFullFormSpecStore(),
    onLoadSchema: getSchemaForForm,
    saveSchema
  }
  return (
        <SchemaFormFiddle {...configuration} />
  )
}
export default AppTest
