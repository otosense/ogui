import * as React from 'react'

import { useTheme } from '@mui/material/styles'
import { Box, IconButton, TableFooter, TablePagination, TableRow } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import { centerTableFooter } from './tableStyles'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

const TablePaginationActions = (props: TablePaginationActionsProps): JSX.Element => {
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
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </IconButton>
    </Box>
  )
}

interface PaginationProps {
  rowsPerPage: number
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  page: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void

}

export const TablePaginationRowsPerPage = (props: PaginationProps): JSX.Element => (
  <TableFooter sx={centerTableFooter}>
    <TableRow>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        colSpan={10}
        count={-1}
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
        ActionsComponent={TablePaginationActions}
        labelDisplayedRows={({ from, to }) => `${from}-${to}`}
      />
    </TableRow>
  </TableFooter>
)
