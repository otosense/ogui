import { map } from 'lodash'
import { dagName, funcName } from '../../Testing/configs'

interface ITransformedData {
  label: string
  value: any // Change 'any' to the appropriate type if applicable
}

export const storeMapping = (data: string[]): ITransformedData[] => {
  // Extract unique labels and sort them
  const uniqueLabels = Array.from(new Set(data))
  const sortedLabels = uniqueLabels.sort()

  const transformedData = map(sortedLabels, (label: string) => {
    const value = label // You can set the value to be something else if needed
    return { label, value }
  })

  return transformedData
}

export function arraySplitter (newValue: any): string[][] {
  return [newValue]?.map((str: string) => {
    const parts = str.split('.')
    const index = parts.findIndex((part: string) => (part === funcName || part === dagName))
    if (index !== -1) {
      return [parts.slice(0, index + 1).join('.'), parts.slice(index + 1).join('.')]
    } else {
      return [str]
    }
  })
}
