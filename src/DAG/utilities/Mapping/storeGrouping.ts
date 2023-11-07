import { groupBy, map, mapValues } from 'lodash'
// Storing all the "dag_store" / "funcstore" / "funcfactoriesstore"

const storeGrouping = (data: any): any => {
  const groupedData = groupBy(data, (item) => item[0])
  const result = mapValues(groupedData, (value) => map(value, (item) => item[1]))
  return result
}

export {
  storeGrouping
}
