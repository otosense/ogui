import * as React from 'react'

import { useTheme } from '@mui/material/styles'
import { Box, IconButton, TableFooter, TablePagination, TableRow, TableCell } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import { centerTableFooter } from './tableStyles'

interface DataTablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

const DataTablePaginationActions = (props: DataTablePaginationActionsProps): JSX.Element => {
  const theme = useTheme()
  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const prevPageNum = props.page - 1
    props.onPageChange(event, prevPageNum)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const nextPageNum = props.page + 1
    props.onPageChange(event, nextPageNum)
  }

  return (
    <Box sx={{ flexShrink: 0 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={props.page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={props.count !== -1 && (props.page + 1) * props.rowsPerPage >= props.count}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </IconButton>
    </Box>
  )
}

interface DataTableFooterProps {
  rowsPerPage: number
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  page: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void
  count?: number
  selectedItemsCount: number
}

export const DataTableFooter = (props: DataTableFooterProps): JSX.Element => (
  <TableFooter sx={centerTableFooter}>
    <TableRow>
      {props.selectedItemsCount > 0 && (
        <TableCell>{props.selectedItemsCount} {props.selectedItemsCount === 1 ? 'item' : 'items'} selected</TableCell>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        colSpan={10}
        count={props.count ?? -1}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page'
          },
          native: true
        }}
        onPageChange={props.onPageChange}
        onRowsPerPageChange={props.onRowsPerPageChange}
        ActionsComponent={DataTablePaginationActions}
        labelDisplayedRows={({ from, to }) => `${from}-${to}`}
      />
    </TableRow>
  </TableFooter>
)
