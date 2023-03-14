import React, { useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  type Theme,
  ThemeProvider
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { SessionsTableContainer } from './tableStyles'
import { Row } from './Row'
import { type FilterOption, SessionFilter } from './Filter'
import { TablePaginationRowsPerPage } from './Pagination'
import { otosenseTheme2022 } from '@otosense/components'

export interface Column {
  // eslint-disable-next-line @typescript-eslint/key-spacing
  key: (string | ((data: any) => any))
  label: string
  sx: any
  orderBy?: string
}

const renderHeaders = (columns: Column[], orderBy: string, order: 'asc' | 'desc', onOrderChange: (orderBy: string) => void): JSX.Element => {
  return (
    <>
      {columns.map((c, i) => {
        if (c.orderBy != null) {
          return (
            <TableCell
              key={`header-${i}`}
              sx={{ background: '#fff' }}
              sortDirection={orderBy === c.orderBy ? order : false}
            >
              <TableSortLabel
                active={orderBy === c.orderBy}
                direction={orderBy === c.orderBy ? order : 'asc'}
                onClick={() => {
                  onOrderChange(c.orderBy as string)
                }}
              >
                {c.label}
                {orderBy === c.orderBy
                  ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                    )
                  : null}
              </TableSortLabel>
            </TableCell>
          )
        }

        return <TableCell key={`header-${i}`} sx={{ background: '#fff' }}>{c.label}</TableCell>
      })}
    </>
  )
}

interface TableProps {
  theme?: Theme
  data: any[]
  columns: Column[]
  clearFilters: VoidFunction
  submitFilters: VoidFunction
  filterOptions: FilterOption[]
  rowsPerPage: number
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  page: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void
  orderBy: string
  order: 'asc' | 'desc'
  onOrderChange: (orderBy: string) => void
  renderExpandedData: (data: any) => JSX.Element
}

export const SessionTable = (props: TableProps): JSX.Element => {
  const [expandedRow, setExpandedRow] = useState<number>(-1)
  const collapseWrap = (f: (...args: any[]) => void): VoidFunction => {
    return (...args) => {
      setExpandedRow(-1)
      f(...args)
    }
  }

  return (
    <ThemeProvider theme={props.theme ?? otosenseTheme2022}>
      <Box>
        <SessionFilter
          clearFilters={props.clearFilters}
          submitFilters={collapseWrap(props.submitFilters)}
          filterOptions={props.filterOptions}
        />
        <SessionsTableContainer sx={{ borderTop: '1px solid #eee', width: '100%' }}>
          <Table size="small" sx={{ marginBottom: 1 }} stickyHeader>
            <TableHead sx={{ borderBottom: '1px solid #eee' }}>
              <TableRow>
                <TableCell sx={{ background: '#fff' }} colSpan={1}/>
                {renderHeaders(props.columns, props.orderBy, props.order, collapseWrap(props.onOrderChange))}
                <TableCell sx={{ background: '#fff' }} colSpan={1}/>
              </TableRow>
            </TableHead>
            <TableBody sx={{ marginBottom: 64 }}>
              {props.data?.length > 0
                ? <>{props.data.map((v, i) => (
                  <Row
                    key={`row-${i}`}
                    id={`row-${i}`}
                    data={v}
                    columns={props.columns}
                    isExpanded={i === expandedRow}
                    onClickExpand={() => {
                      setExpandedRow(i !== expandedRow ? i : -1)
                    }}
                    onSelectSession={() => {
                      console.log(v)
                    }}
                    renderExpandedData={() => props.renderExpandedData(v)}
                  />
                ))}</>
                : <TableRow>
                  <TableCell colSpan={9} sx={{ textAlign: 'center' }}>{'No Data'}</TableCell>
                </TableRow>
              }
            </TableBody>
            <TablePaginationRowsPerPage
              rowsPerPage={props.rowsPerPage}
              onRowsPerPageChange={collapseWrap(props.onRowsPerPageChange)}
              page={props.page}
              onPageChange={collapseWrap(props.onPageChange)}
            />
          </Table>
        </SessionsTableContainer>
      </Box>
    </ThemeProvider>
  )
}
