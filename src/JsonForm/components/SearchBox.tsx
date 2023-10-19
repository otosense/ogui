import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'
import { storeMapping } from '../utilities/Mapping/storeMapping'
import { isObject, isFunction, last, initial } from 'lodash'

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
    newValue: Option | null
  ): void => {
    setSelectedValue(newValue)
    handleValue(newValue)
    // if (onLoadSchema) {
    const val = onLoadSchema(newValue?.value)
    if (isObject(val)) {
      const result: any = val
      if (isFunction(result?.then)) {
        // Check if the result of the function is a promise
        result.then((dataArray: any) => {
          // schemaData && schemaData(dataArray.rjsf.schema);
          schemaData?.(dataArray)
        })
      } else {
        schemaData?.(result)
      }
    }
    // }
  }
  return (
        <div className='autoComplete-Dropdown'>
            <Autocomplete
                id="form-list"
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
