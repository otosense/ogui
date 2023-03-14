import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { StyledCollapse } from './tableStyles'

interface CollapsedContentsProps {
  isExpanded: boolean
  renderData: () => JSX.Element
}

export const CollapsedContents = (props: CollapsedContentsProps): JSX.Element => {
  return (
    <TableRow sx={{ width: '100%' }}>
      <TableCell sx={{ p: 0 }} colSpan={11}>
        <StyledCollapse in={props.isExpanded} timeout="auto" unmountOnExit>
          {props.isExpanded && props.renderData()}
        </StyledCollapse>
      </TableCell>
    </TableRow>
  )
}
