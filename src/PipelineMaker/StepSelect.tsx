import React, { useMemo, useState } from "react";
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";


interface IProps {
  stepNumber: number
  value: any
  items: any[];
  renderItem: (item: any) => string | JSX.Element;
  stringRepr: (item: any) => string;
  darkMode: boolean;
  onChange: (stepNumber: number, value: any) => void;
  onDelete: (stepNumber: number) => void;
  onOpen: (stepNumber: number) => void;
  onClose: (stepNumber: number) => void;
}

const StepSelect = (props: IProps): JSX.Element => {
  const {
    stepNumber,
    items,
    value,
    renderItem,
    stringRepr,
    onChange,
    onDelete,
    onOpen,
    onClose
  } = props

  const initSelectedIdx = value === '' ? value : props.items.indexOf(value)
  const [selectedIdx, setSelectedIdx] = useState(initSelectedIdx)
  const [isHovering, setIsHovering] = useState(false)

  const [searchText, setSearchText] = useState('')
  const containsText = (item: any, searchText: string): boolean => {
    const stringItem = stringRepr(item).toLowerCase()
    return stringItem.toLowerCase().includes(searchText.toLowerCase())
  }
  const filteredItems = useMemo(
    () => items.filter((item) => containsText(item, searchText)),
    [searchText]
  )

  const id = `step-${stepNumber}`
  const labelId = `step-label-${stepNumber}`
  const label = `Step #${stepNumber}`

  const handleChange = (event: SelectChangeEvent): void => {
    setIsHovering(false)
    const idx = +event.target.value
    setSelectedIdx(idx)
    const item = items[idx]
    onChange(stepNumber, item)
  }

  const handleDelete = (): void => {
    onDelete(stepNumber)
  }

  const handleMouseOver = (): void => {
    setIsHovering(true)
  }

  const handleMouseOut = (): void => {
    setIsHovering(false)
  }

  const handleOpen = (): void => {
    onOpen(stepNumber)
  }

  const handleClose = () => {
    setSearchText("");
    onClose(stepNumber);
  };

  const handleAddItem = () => {

  }

  const deleteButton = (
    <IconButton
      onClick={handleDelete}
      sx={{
        visibility: selectedIdx !== '' && isHovering ? 'visible' : 'hidden',
        position: 'absolute',
        right: '30px'
      }}
    >
      <DeleteIcon />
    </IconButton>
  );

  const menuProps = {
    autoFocus: false,
    style: {
      filter: props.darkMode ? 'invert(1)' : 'invert(0)',
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
      >
        <Grid item xs>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
              id={id}
              labelId={labelId}
              label={label}
              value={selectedIdx}
              renderValue={() => renderItem(items[selectedIdx])}
              MenuProps={menuProps}
              endAdornment={deleteButton}
              onChange={handleChange}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <ListSubheader>
                <TextField
                  size="small"
                  autoFocus
                  placeholder="Type to search..."
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => { setSearchText(e.target.value) }}
                  onKeyDown={(e) => {
                    if (e.key !== 'Escape') {
                      // Prevents autoselecting item while typing (default Select behaviour)
                      e.stopPropagation()
                    }
                  }}
                />
                <Button onClick={handleAddItem}>
                  <AddIcon /> Add a new item
                </Button>
              </ListSubheader>
              {filteredItems.map((item, i) => {
                const key = `step-${stepNumber}-item-${i}`
                const viewItem = renderItem(item)
                return (
                  <MenuItem key={key} value={i}>
                    {viewItem}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs>
          <FormControl fullWidth sx={{ my: 1 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={items}
              renderOption={(props, option) => (
                <li {...props}>
                   {renderItem(option)}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label={label} />}
            />
          </FormControl>
        </Grid> */}
        {/* {selectedIdx !== '' &&
          <Grid item xs='auto'>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        } */}
      </Grid>
    </Box>
  )
}

export default StepSelect

// import React from "react"
// import { Stack, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material';

// interface IProps {
//   items: any[];
//   renderItem?: (option: any) => string | JSX.Element;
//   onChange?: (val: string, i: number) => void;
//   val: string;
//   index: number;
// }

// export const selectBox = {
//   width: '100%'
// }

// const StepSelect = (props: IProps) => {
//   const { items, renderItem, val, onChange, index } = props;
//   const handleChange = (e: SelectChangeEvent) => {
//     if (!!onChange){
//       console.log(e.target.value, items[e.target.value]);
//       onChange(items[e.target.value], index);
//     }
//   }
//   const _renderItem = renderItem || ((option: any) => option.toString())
//   return(
//     <Stack sx={{width: '100%', marginBottom: 0}}>
//       {/* <Typography variant="overline">Step {index}</Typography> */}
//       <FormControl fullWidth>
//         <Select
//           id="demo-simple-select"
//           value={val || ''}
//           onChange={handleChange}
//           sx={selectBox}
//         >
//           {!!items.length && items.map((item, i) => {
//             const viewItem = _renderItem(item)
//             return (
//               <MenuItem key={i} value={i}>{viewItem}</MenuItem>
//             )
//           })}
//           <MenuItem>Add an option</MenuItem>
//         </Select>
//       </FormControl>
//     </Stack>
//   )
// }

// export default StepSelect;
