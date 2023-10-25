import { map } from 'lodash'

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
