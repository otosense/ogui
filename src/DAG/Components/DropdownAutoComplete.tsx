import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { last, initial } from 'lodash'
import { storeMapping } from '../../JsonForm/utilities/Mapping/storeMapping'

interface Option {
  label: string
  value: string
}

interface ISearchBox {
  handleValue: any
  data: any
}

function DropdownAutoComplete (props: ISearchBox): JSX.Element {
  const { handleValue, data } = props
  const [selectedValue, setSelectedValue] = useState<Option | null>(null)
  const [funcLists, setFuncLists] = useState<Option[]>([])
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const conversion = storeMapping(data)
    setFuncLists(conversion)
  }, [data])

  const selectValueFromDropDown = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Option | null
  ): void => {
    setSelectedValue(newValue)
    handleValue(newValue?.value)
  }
  return (
        <div className='autoComplete-Dropdown'>
            <Autocomplete
                id="funcLists-list"
                options={funcLists}
                getOptionLabel={(option) => option.label}
                // groupBy={(option) => option.label.split('.').splice(0, 3).join('.')}
                groupBy={(option) => initial(option?.label.split('.')).join('.')}
                value={selectedValue}
                onChange={selectValueFromDropDown}
                size='medium'
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Select Node"
                    style={{
                      color: '#fff !important',
                      width: '100%', // Set the width to 100% to match the parent
                      borderColor: '#fff !important'
                    }}
                    onClick={() => { setOpen(true) }}
                    InputProps={{
                      ...params.InputProps,
                      style: { color: '#fff !important', borderColor: '#fff !important' }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} style={{ backgroundColor: '#1f2937', color: '#fff', width: '100%' }}>
                        {/* {option?.label?.split('.')[3]} */}
                        {last(option?.label?.split('.'))}
                    </Box>
                )}
                open={open}
                onOpen={() => { setOpen(true) }}
                onClose={() => { setOpen(false) }}
                    style={{
                      width: '100%',
                      color: '#fff',
                      borderColor: '#fff'
                    }}
            />
            {/* <p>Selected Value: {(selectedValue != null) ? selectedValue.value : ''}</p> */}
        </div>
  )
}

export default DropdownAutoComplete
