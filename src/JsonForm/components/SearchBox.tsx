import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'
import { arraySplitter, storeMapping } from '../utilities/Mapping/storeMapping'
import { isObject, isFunction, last, initial, isEmpty } from 'lodash'
import { showToast } from '../../utilities/ReactToastMessage'
import { dagName, errorKey, noStoreData } from '../Testing/configs'

interface Option {
  label: string
  value: string
}

interface ISearchBox {
  handleValue: any
  data: any
  onLoadSchema: any
  schemaData: any
}

function SearchBox (props: ISearchBox): JSX.Element {
  const { handleValue, data, onLoadSchema, schemaData } = props
  const [selectedValue, setSelectedValue] = useState<Option | null>(null)
  const [funcLists, setFuncLists] = useState<Option[]>([])

  useEffect(() => {
    const conversion = storeMapping(data)
    setFuncLists(conversion)
  }, [data])

  const selectValueFromDropDown = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ): void => {
    if (!isEmpty(newValue)) {
      setSelectedValue(newValue)
      handleValue(newValue)
      const outputArray = arraySplitter(newValue?.value)
      // if (onLoadSchema) {
      const val = onLoadSchema(outputArray[0])
      if (isObject(val)) {
        const result: any = val
        if (isFunction(result?.then)) {
          // Check if the result of the function is a promise
          result.then((dataArray: any) => {
            if (isEmpty(dataArray)) {
              showToast(noStoreData, errorKey)
              schemaData?.({ rjsf: {} })
            } else {
              schemaData?.(dataArray)
            }
          }).catch((error: any) => {
            // Handle the error here
            showToast(error?.message, errorKey)
            schemaData?.({ rjsf: {} })
          })
        } else {
          schemaData?.(result)
        }
      }
    }

    // }
  }

  useEffect(() => {
    funcLists.map((option: any) => {
      const eln = option.label.split('.')
      if (!(eln[0] === dagName)) {
        option.label = eln?.splice(1, eln.length - 1).join('.')
      }
      return option
    })
  }, [funcLists])

  return (
        <div className='autoComplete-Dropdown'>
            <Autocomplete
                id="searchBox"
                options={funcLists}
                getOptionLabel={(option) => option.label}
                // groupBy={(option) => option.label.split('.').splice(0, 3).join('.')}
                groupBy={(option) => initial(option?.label.split('.')).join('.')}
                value={selectedValue}
                onChange={selectValueFromDropDown}
                renderInput={(params) => <TextField {...params} label="Form Types" />}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {/* {option?.label?.split('.')[3]} */}
                        {last(option?.label?.split('.'))}
                    </Box>
                )}
            />
            {/* <p>Selected Value: {(selectedValue != null) ? selectedValue.value : ''}</p> */}
        </div>
  )
}

export default SearchBox
