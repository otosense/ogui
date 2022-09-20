import React from "react"
import { Stack, Select, FormControl, MenuItem, SelectChangeEvent, Typography } from '@mui/material';

interface IProps {
  items: string[];
  onChange: (val: string, i: number) => void;
  val: string;
  index: number;
}

export const selectBox = {
  width: '100%'
}

const StepSelect = (props: IProps) => {
  const { items, val, onChange, index } = props;
  const handleChange = (e: SelectChangeEvent) => {
    onChange(e.target.value, index)
  }
  return(
    <Stack sx={{width: '100%', marginBottom: 0}}>
      <Typography variant="overline">Step {index}</Typography>
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={val || ''}
          onChange={handleChange}
          sx={selectBox}
        >
          {!!items.length && items.map((item, i) => {
            return (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default StepSelect;