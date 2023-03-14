import React from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { CenterBox } from '@otosense/components'

import { cellIconSpacing } from './tableStyles'
import { type Column } from './Table'
import { CollapsedContents } from './CollapsedContents'

export interface RowProps {
  isExpanded: boolean
  onClickExpand: VoidFunction
  renderExpandedData: () => JSX.Element
  onSelectSession: VoidFunction
  data: any
  columns: Column[]
  id: string
}

export const Row = (props: RowProps): JSX.Element => (
  <React.Fragment key={`${props.id}`}>
    <TableRow sx={{ width: '100%', borderBottom: '0.5px solid #ccc' }} hover>
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
      <TableCell sx={cellIconSpacing}>
        <CenterBox>
          <OpenInNewIcon color="primary" onClick={props.onSelectSession}/>
        </CenterBox>
      </TableCell>
    </TableRow>
    <CollapsedContents isExpanded={props.isExpanded} renderData={props.renderExpandedData}/>
  </React.Fragment>
)
