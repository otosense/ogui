import React, { useEffect, useState } from 'react'
import { otosenseTheme2022 } from '@otosense/components'

import { type Column, DataTable } from './DataTable'
import { formatSessionTime } from './utility'
import { cellDateTime, cellMW160 } from './tableStyles'
import {
  type PaginationOptions,
  type SessionFilterOptions,
  type SessionSortOptions,
  type Optional,
  type DppMetadata,
  type SortField,
  type CompareFunction
} from './types'
import { listData } from './testData'

interface SearchFilters {
  filter: Optional<SessionFilterOptions>
  sort: Optional<SessionSortOptions>
  pagination: Optional<PaginationOptions>
}

interface OtoTableProps {
  data: DppMetadata[]
  query?: Optional<SearchFilters>
  isMultiSelect?: boolean
  style?: Record<string, string>

  onSelectDpp: (dpp: DppMetadata[]) => void
}
const columns: Column[] = [
  {
    label: 'Name',
    sx: cellMW160,
    key: 'name',
    orderBy: 'name'
  },
  {
    label: 'Date Created',
    sx: cellDateTime,
    key: (s: DppMetadata) => formatSessionTime(+s.date_created),
    orderBy: 'date_created'
  },
  {
    label: 'Sample Rate',
    sx: cellMW160,
    key: 'sample_rate',
    orderBy: 'sample_rate'
  },
  {
    label: 'Performance',
    sx: {
      maxWidth: 240,
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      wordWrap: 'break-word'
    },
    key: (s: DppMetadata) => {
      const p = Math.floor(s.precision * 100)
      const r = Math.floor(s.recall * 100)
      return `Precision: ${p}% - Recall: ${r}%`
    }
  }
]

export const DppTable = (props: OtoTableProps): JSX.Element => {
  let defaultRowsPerPage = 50
  let defaultPage = 0
  if (props.query?.pagination?.from_idx != null) {
    defaultRowsPerPage = props.query.pagination.to_idx - props.query.pagination.from_idx
    defaultPage = props.query.pagination.from_idx / defaultRowsPerPage
  }
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage)
  const [page, setPage] = useState<number>(defaultPage)
  const [order, setOrder] = useState<'asc' | 'desc'>(props.query?.sort?.mode ?? 'desc')
  const [orderBy, setOrderBy] = useState<SortField | CompareFunction>(props.query?.sort?.field ?? 'bt')
  const [filteredData, setFilteredData] = useState<DppMetadata[]>(props.data)

  const submitFilters = (): void => {
    const value: SearchFilters = {
      filter: null,
      sort: { field: orderBy, mode: order },
      pagination: {
        from_idx: page * rowsPerPage,
        to_idx: (page + 1) * rowsPerPage
      }
    }
    setFilteredData(listData(value.sort, value.pagination, props.data) as DppMetadata[])
  }

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage)
  }
  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newVal = event.target.value
    setRowsPerPage(parseInt(newVal, 10))
    setPage(0)
  }

  const onOrderChange = (newOrderBy: SortField | CompareFunction): void => {
    setOrderBy(() => newOrderBy)
    setOrder(order === 'asc' ? 'desc' : 'asc')
    setPage(0)
  }

  useEffect(submitFilters, [page, order, orderBy, rowsPerPage])
  useEffect(() => { setPage(0) }, [rowsPerPage])
  return (
    <DataTable
      theme={otosenseTheme2022}
      style={props.style}
      data={filteredData}
      columns={columns}
      submitFilters={submitFilters}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      onPageChange={onPageChange}
      orderBy={orderBy}
      order={order}
      onOrderChange={onOrderChange}
      isMultiSelect={props.isMultiSelect}
      onSelectItems={props.onSelectDpp}
      totalCount={props.data?.length ?? -1}
    />
  )
}
