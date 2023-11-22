import React from 'react'
import Dagger from '../Dagger'
import { LRUCache } from '../utilities/lruCache'
import { executeData, loadDagFuncList, onloadSavedDagData } from './data'
// import { loadDagFuncList } from './data';

function AppTest (): JSX.Element {
  const sample = async (): Promise<any> => {
    return loadDagFuncList
  }

  const saver = async (data: any): Promise<any> => {
    return null
  }

  const onloadSavedDag = async (data: any): Promise<any> => {
    return onloadSavedDagData
  }
  const lruCacheParamsList = new LRUCache<string, any>(100)

  const loadParamsList = async (data: any): Promise<any> => {
    // caching logic for loadParamsList
    const cached = lruCacheParamsList.get(data)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (cached) {
      return cached
    }

    return executeData

    // to cache
    // lruCacheParamsList.set(data, json)
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
