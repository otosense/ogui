import React, { useEffect, useState } from 'react'
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
// import ClearAllIcon from '@mui/icons-material/ClearAll'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { DataTableContainer } from './tableStyles'
import { Row } from './Row'
import { type FilterOption, Filter } from './SearchFilterSideMenu'
import { DataTableFooter } from './DataTableFooter'
import { CenterBox, otosenseTheme2022 } from '@otosense/components'
import { detectDarkModeChange, getDarkModeValue } from '../utils'
import { type CompareFunction, type SortField } from './types'

export interface Column {
  // eslint-disable-next-line @typescript-eslint/key-spacing
  key: (string | ((data: any) => any))
  label: string
  sx: any
  orderBy?: SortField | CompareFunction
}

const renderHeaders = (columns: Column[], orderBy: SortField | CompareFunction, order: 'asc' | 'desc', onOrderChange: (orderBy: SortField | CompareFunction) => void): JSX.Element => {
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
                  onOrderChange(c.orderBy as SortField | CompareFunction)
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
  style?: Record<string, string>
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
  orderBy: SortField | CompareFunction
  order: 'asc' | 'desc'
  onOrderChange: (orderBy: SortField | CompareFunction) => void
  renderExpandedData: (data: any) => JSX.Element
  isMultiSelect?: boolean
  onSelectItems: (items: any[]) => void
  totalCount?: number
  isDarkMode?: boolean
}

export const DataTable = (props: TableProps): JSX.Element => {
  const [expandedRow, setExpandedRow] = useState<number>(-1)
  const [selectedItems, setSelectedItems] = useState<Set<any>>(new Set())
  const [darkMode, setDarkMode] = useState<boolean>(props.isDarkMode ?? getDarkModeValue())
  useEffect(() => {
    if (props.isDarkMode == null) {
      detectDarkModeChange(setDarkMode)
    } else {
      setDarkMode(props.isDarkMode)
    }
  }, [])

  const onChangeSelectItem = (item: any): void => {
    if (props.isMultiSelect === true) {
      const _difference = new Set(selectedItems)
      if (_difference.has(item)) {
        _difference.delete(item)
      } else {
        _difference.add(item)
      }
      setSelectedItems(_difference)
      props.onSelectItems(Array.from(_difference))
    } else {
      setSelectedItems(new Set([item]))
      props.onSelectItems([item])
    }
  }

  const addOrRemoveAllItemsInView = (): void => {
    if (props.data?.length > 0) {
      const firstItem = props.data[0]
      const _difference = new Set(selectedItems)
      if (selectedItems.has(firstItem)) {
        props.data.forEach((v) => _difference.delete(v))
      } else {
        props.data.forEach((v) => _difference.add(v))
      }
      setSelectedItems(_difference)
      props.onSelectItems(Array.from(_difference))
    }
  }
  const collapseWrap = (f: (...args: any[]) => void): VoidFunction => {
    return (...args) => {
      setExpandedRow(-1)
      f(...args)
    }
  }

  return (
    <div style={{ filter: darkMode ? 'invert(1)' : 'invert(0)', ...props.style }}>
      <ThemeProvider theme={props.theme ?? otosenseTheme2022}>
        <Box sx={{ minHeight: '720px', backgroundColor: '#fff' }}>
          <Filter
            clearFilters={props.clearFilters}
            submitFilters={collapseWrap(props.submitFilters)}
            filterOptions={props.filterOptions}
          />
          <DataTableContainer sx={{ borderTop: '1px solid #eee', width: '100%' }}>
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
                            onClick={addOrRemoveAllItemsInView}
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
                      onSelectItem={() => {
                        onChangeSelectItem(v)
                      }}
                      isSelected={selectedItems.has(v)}
                      renderExpandedData={() => props.renderExpandedData(v)}
                    />
                  ))}</>
                  : <TableRow>
                    <TableCell colSpan={props.columns.length + 2} sx={{ textAlign: 'center' }}>{'No Data'}</TableCell>
                  </TableRow>
                }
              </TableBody>
              <DataTableFooter
                rowsPerPage={props.rowsPerPage}
                onRowsPerPageChange={collapseWrap(props.onRowsPerPageChange)}
                page={props.page}
                onPageChange={collapseWrap(props.onPageChange)}
                count={props.totalCount ?? -1}
                selectedItemsCount={selectedItems.size}
              />
            </Table>
          </DataTableContainer>
        </Box>
      </ThemeProvider>
    </div>
  )
}
