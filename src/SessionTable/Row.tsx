import React from 'react'
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { CenterBox } from '@otosense/components'

import { cellIconSpacing } from './tableStyles'
import { type Column } from './DataTable'
import { CollapsedContents } from './CollapsedContents'

export interface RowProps {
  isExpanded: boolean
  onClickExpand: VoidFunction
  renderExpandedData: () => JSX.Element
  onSelectItem: VoidFunction
  data: any
  columns: Column[]
  id: string
  isSelected?: boolean
}

export const Row = (props: RowProps): JSX.Element => (
  <React.Fragment key={`${props.id}`}>
    <TableRow sx={{ width: '100%', borderBottom: '0.5px solid #ccc' }} hover>
      <TableCell sx={cellIconSpacing}>
        <CenterBox>
          <Checkbox color="primary" checked={props.isSelected} onChange={props.onSelectItem} />
        </CenterBox>
      </TableCell>
      <TableCell sx={cellIconSpacing}>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={props.onClickExpand}
        >
          {props.isExpanded
            ? <KeyboardArrowUpIcon color="primary"/>
            : <KeyboardArrowDownIcon color="primary"/>}
        </IconButton>
      </TableCell>
      {props.columns.map((c, i) => (
        <TableCell sx={c.sx} key={`${props.id}-col-${i}`}>
          {(typeof c.key === 'string') ? props.data[c.key] : c.key(props.data)}
        </TableCell>
      ))}
    </TableRow>
    <CollapsedContents isExpanded={props.isExpanded} renderData={props.renderExpandedData}/>
  </React.Fragment>
)
