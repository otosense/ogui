import React, { useState } from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  type Theme,
  ThemeProvider,
  Typography,
  Checkbox
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import GradingIcon from '@mui/icons-material/Grading'
import { cellIconSpacing, SessionsTableContainer } from './tableStyles'
import { Row } from './Row'
import { type FilterOption, SessionFilter } from './SearchFilterSideMenu'
import { TablePaginationRowsPerPage } from './Pagination'
import { CenterBox, otosenseTheme2022 } from '@otosense/components'

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
  isMultiSelect?: boolean
  onSelectSessions: (sessionKeys: string[]) => void
  sessionKey: string
}

export const SessionTable = (props: TableProps): JSX.Element => {
  const [expandedRow, setExpandedRow] = useState<number>(-1)
  const [selectedSessions, setSelectedSessions] = useState<Set<string>>(new Set())

  const onChangeSelectSession = (sessionKey: string): void => {
    if (props.isMultiSelect === true) {
      const _difference = new Set(selectedSessions)
      if (_difference.has(sessionKey)) {
        _difference.delete(sessionKey)
      } else {
        _difference.add(sessionKey)
      }
      setSelectedSessions(_difference)
    } else {
      props.onSelectSessions([sessionKey])
    }
  }

  const addOrRemoveAllSessionsInView = (): void => {
    if (props.data?.length > 0) {
      const firstKey = props.data[0][props.sessionKey]
      const _difference = new Set(selectedSessions)
      if (selectedSessions.has(firstKey)) {
        props.data.forEach((v) => _difference.delete(v[props.sessionKey]))
      } else {
        props.data.forEach((v) => _difference.add(v[props.sessionKey]))
      }
      setSelectedSessions(_difference)
    }
  }
  const collapseWrap = (f: (...args: any[]) => void): VoidFunction => {
    return (...args) => {
      setExpandedRow(-1)
      f(...args)
    }
  }

  return (
    <ThemeProvider theme={props.theme ?? otosenseTheme2022}>
      <Box sx={{ minHeight: '720px', backgroundColor: '#fff' }}>
        {props.isMultiSelect === true &&
          <>
            <Button
              color="secondary"
              onClick={() => { props.onSelectSessions(Array.from(selectedSessions)) }}
              startIcon={<GradingIcon />}
            >
              <Typography variant="button">{'Submit Selection'}</Typography>
            </Button>

            <Button
              color="secondary"
              onClick={() => { setSelectedSessions(new Set()) }}
              startIcon={<ClearAllIcon />}
            >
              <Typography variant="button">{'Clear Selection'}</Typography>
            </Button>
          </>
        }
        <SessionFilter
          clearFilters={props.clearFilters}
          submitFilters={collapseWrap(props.submitFilters)}
          filterOptions={props.filterOptions}
        />
        <SessionsTableContainer sx={{ borderTop: '1px solid #eee', width: '100%' }}>
          <Table size="small" sx={{ marginBottom: 1 }} stickyHeader>
            <TableHead sx={{ borderBottom: '1px solid #eee' }}>
              <TableRow>
                {(props.isMultiSelect === true)
                  ? <TableCell
                      sx={{
                        paddingLeft: 0.3,
                        paddingRight: 0.3,
                        maxWidth: 24,
                        backgroundColor: '#fff'
                      }}
                    >
                      <CenterBox>
                        <DoneAllIcon
                          color="primary"
                          onClick={addOrRemoveAllSessionsInView}
                        />
                      </CenterBox>
                    </TableCell>
                  : <TableCell sx={{ background: '#fff' }} colSpan={1}/>
                }
                <TableCell sx={{ background: '#fff' }} colSpan={1}/>
                {renderHeaders(props.columns, props.orderBy, props.order, collapseWrap(props.onOrderChange))}
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
                    onClickExpand={() => { setExpandedRow(i !== expandedRow ? i : -1) }}
                    onSelectSession={() => {
                      const key = v[props.sessionKey]
                      onChangeSelectSession(key)
                    }}
                    isCheckbox={props.isMultiSelect}
                    isSelected={selectedSessions.has(v[props.sessionKey])}
                    renderExpandedData={() => props.renderExpandedData(v)}
                  />
                ))}</>
                : <TableRow>
                  <TableCell colSpan={props.columns.length + 2} sx={{ textAlign: 'center' }}>{'No Data'}</TableCell>
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
