import { map } from 'lodash'

interface ITransformedData {
  label: string
  value: any
}

export const storeMapping = (data: any): ITransformedData[] => {
  const transformedData = map(data, item => {
    const value = item
    const label = item // Extract the last part after the last dot
    return { label, value }
  })
  return transformedData
}
