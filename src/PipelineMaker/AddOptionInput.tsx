import React, { ChangeEvent, useState } from "react";

import { Button, TextField, Typography, Stack, /*MenuItem, Select, SelectChangeEvent */ } from '@mui/material';

interface IProps {
  addOption: (str: string) => void;
}

const AddOptionInput = (props: IProps) => {
  // const options = ['string', 'array', 'function', 'object', 'number'];
  const [textVal, setTextVal] = useState<string>('');
  // const [selectVal, setSelectVal] = useState<string>('');
  const changeTextField = (e: ChangeEvent<HTMLInputElement>) => {
    setTextVal(e.target.value)
  }
  // const changeSelect = (e: SelectChangeEvent) => {
  //   setSelectVal(e.target.value)
  // }
  const addAnOption = () => {
    // push into an array for the original options
    // but need to store a type to somewhere else.
    props.addOption(textVal);
    setTextVal('')
  }
  return(
    <Stack sx={{width: 'calc(100% - 48px)',
      padding: 1}}>
      {/* <Stack>
        <Typography variant="overline">Select a type of your input</Typography>
        <Select
          value={selectVal}
          onChange={changeSelect}
        >
          {options.map((option) => {
            return (
              <MenuItem value={option}>{option}</MenuItem>
            )
          })}
        </Select>
      </Stack> */}
      <Stack direction="row" sx={{alignItems: 'end'}}>
        <Stack sx={{width: '100%'}}>
          <Typography variant="overline">Type an option to add</Typography>
          <TextField
            value={textVal}
            onChange={changeTextField}
          />
        </Stack>
        <Button
          onClick={addAnOption}
          disabled={!textVal}
          sx={{minWidth: 'max-content'}}
        >Add option</Button>
      </Stack>
    </Stack>
  )
}

export default AddOptionInput;