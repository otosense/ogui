import React from 'react'
import Dagger from '../Dagger'
import { LRUCache } from '../utilities/lruCache'
// import { loadDagFuncList } from './data';

const EndPointURL = 'http://20.219.8.178:8888'
const StoreURL = `${EndPointURL}/dag_component_info_store `
const saveDagURL = `${EndPointURL}/dag_spec_store`
const storeFuncKey = 'funcs'
async function fetchData (payload: any, url: string): Promise<any> {
  try {
    const response = await fetch(url, {
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
  const sample = async (): Promise<any> => {
    // return await loadDagFuncList;

    const payload = {
      _attr_name: '__iter__'
    }
    // Saving the Dag to Backend using API
    const response = await fetchData(payload, StoreURL)
    return response
  }

  // const sample = () => {
  //     return loadDagFuncList;
  // };

  const saver = async (data: any) => {
    const payload = {
      _attr_name: '__setitem__',
      k: data.name,
      v: data.combinedObj
    }
    // Saving the Dag to Backend using API
    const response = await fetchData(payload, saveDagURL)
    return response
  }

  const onloadSavedDag = async (data: any): Promise<any> => {
    const payload = {
      _attr_name: '__getitem__',
      k: data
    }
    const response = await fetchData(payload, saveDagURL)
    return response
  }
  const lruCacheParamsList = new LRUCache<string, any>(100)

  const loadParamsList = async (data: any): Promise<any> => {
    const cached = lruCacheParamsList.get(data)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (cached) {
      return cached
    }

    // console.log('data', data);
    const payload = {
      _attr_name: '__getitem__',
      k: [storeFuncKey, data]
    }

    try {
      const response = await fetch(StoreURL, {
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
      lruCacheParamsList.set(data, json)
      return json
    } catch (error) {
      console.error('Error fetching data:', error)
      return [] // Return an empty array or handle the error appropriately
    }
  }

  const configuration = {
    DagFuncList: sample,
    LoadDagList: sample,
    onSave: saver,
    onloadSavedDag,
    loadParamsList
  }
  return (
        <>
            <Dagger {...configuration} />
        </>
  )
}

export default AppTest
