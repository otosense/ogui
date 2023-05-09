import React from 'react'
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { CenterBox } from '@otosense/components'
import Radio from '@mui/material/Radio'

import { cellIconSpacing } from './tableStyles'
import { type Column } from './DataTable'
import { CollapsedContents } from './CollapsedContents'
import { type Optional } from './types'

export interface RowProps {
  isExpanded: boolean
  onClickExpand: VoidFunction
  renderExpandedData?: () => JSX.Element
  onSelectItem: VoidFunction
  data: any
  columns: Column[]
  id: string
  isSelected?: boolean
  selectComponent?: 'checkbox' | 'radio'
}

const selectComponent = (type: Optional<'checkbox' | 'radio'>, isSelected: Optional<boolean>, onSelect: VoidFunction): JSX.Element => {
  if (type === 'checkbox') {
    return <Checkbox color="primary" checked={isSelected === true} onChange={onSelect} />
  } else if (type === 'radio') {
    return <Radio color="primary" checked={isSelected === true} onChange={onSelect} />
  }
  return <></>
}

export const Row = (props: RowProps): JSX.Element => (
  <React.Fragment key={`${props.id}`}>
    <TableRow sx={{ width: '100%', borderBottom: '0.5px solid #ccc' }} hover>
      <TableCell sx={cellIconSpacing}>
        <CenterBox>
          {selectComponent(props.selectComponent, props.isSelected, props.onSelectItem)}
        </CenterBox>
      </TableCell>
      {props.renderExpandedData != null && <TableCell sx={cellIconSpacing}>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={props.onClickExpand}
        >
          {props.isExpanded
            ? <KeyboardArrowUpIcon color="primary"/>
            : <KeyboardArrowDownIcon color="primary"/>}
        </IconButton>
      </TableCell>}
      {props.columns.map((c, i) => (
        <TableCell sx={c.sx} key={`${props.id}-col-${i}`}>
          {(typeof c.key === 'string') ? props.data[c.key] : c.key(props.data)}
        </TableCell>
      ))}
    </TableRow>
    {props.renderExpandedData != null &&
      <CollapsedContents isExpanded={props.isExpanded} renderData={props.renderExpandedData}/>}
  </React.Fragment>
)
