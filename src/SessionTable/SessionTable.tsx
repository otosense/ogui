import React, { type CSSProperties, useEffect, useState } from 'react'
import { FlexBox, otosenseTheme2022 } from '@otosense/components'
import { Box, Grid, Stack, Typography } from '@mui/material'

import { type Column, DataTable } from './DataTable'
import { formatSessionTime } from './utility'
import { type FilterOption } from './SearchFilterSideMenu'
import { cellDateTime, cellMW160 } from './tableStyles'
import {
  type PaginationOptions,
  type SessionFilterOptions,
  type SessionSortOptions,
  type Operator,
  type Optional,
  type Session
} from './types'
import { listSessions } from './testData'
import { detectDarkModeChange, getDarkModeValue } from '../utils'

interface SearchFilters {
  filter: Optional<SessionFilterOptions>
  sort: Optional<SessionSortOptions>
  pagination: Optional<PaginationOptions>
}

interface SessionTableProps {
  data: Session[]
  query?: Optional<SearchFilters>
  isMultiSelect?: boolean
  style?: Record<string, string>
  onSelectSessions: (sessions: Session[]) => void
}
const cellTags: CSSProperties = {
  maxWidth: 480,
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
  wordWrap: 'break-word'
}
const columns: Column[] = [
  {
    label: 'Start Date',
    sx: cellDateTime,
    key: (s: Session) => formatSessionTime(+s.bt),
    orderBy: 'bt'
  },
  {
    label: 'Duration (sec)',
    sx: cellMW160,
    key: (s: Session) => `${(s.tt - s.bt) / 1e6}`,
  },
  {
    label: 'Annotations',
    sx: cellTags,
    key: (s: Session) => {
      const uniqueAnnots = Array.from(new Set(s.annotations.map(a => a.name)))
      return uniqueAnnots.sort().join(', ')
    }
  }
]

export const SessionTable = (props: SessionTableProps): JSX.Element => {
  // Detect dark mode
  const [darkMode, setDarkMode] = useState(getDarkModeValue())
  useEffect(() => { detectDarkModeChange(setDarkMode) }, [])

  const [fromBt, setFromBt] = useState<Optional<number> >(props.query?.filter?.from_bt)
  const [toBt, setToBt] = useState<Optional<number>>(props.query?.filter?.to_bt)
  const [fromTt, setFromTt] = useState<Optional<number>>(props.query?.filter?.from_tt)
  const [toTt, setToTt] = useState<Optional<number>>(props.query?.filter?.to_tt)
  const [sr, setSr] = useState<Optional<number>>(props.query?.filter?.sr)
  const [channels, setChannels] = useState<Optional<string[]>>(props.query?.filter?.channels?.names)
  const [channelsOp, setChannelsOp] = useState<Optional<Operator>>(props.query?.filter?.channels?.operator)
  const [annotations, setAnnotations] = useState<Optional<string[]>>(props.query?.filter?.annotations?.names)
  const [annotationsOp, setAnnotationsOp] = useState<Optional<Operator>>(props.query?.filter?.annotations?.operator)
  let defaultRowsPerPage = 50
  let defaultPage = 0
  if (props.query?.pagination?.from_idx != null) {
    defaultRowsPerPage = props.query.pagination.to_idx - props.query.pagination.from_idx
    defaultPage = props.query.pagination.from_idx / defaultRowsPerPage
  }
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage)
  const [page, setPage] = useState<number>(defaultPage)
  const [order, setOrder] = useState<'asc' | 'desc'>(props.query?.sort?.mode ?? 'desc')
  const [orderBy, setOrderBy] = useState<string>(props.query?.sort?.field ?? 'bt')
  const [filteredData, setFilteredData] = useState<Session[]>(props.data)

  const submitFilters = (): void => {
    const chFilter = (channels != null && channelsOp != null)
      ? {
          names: channels,
          operator: channelsOp
        }
      : null
    const anFilter = (annotations != null && annotationsOp != null)
      ? {
          names: annotations,
          operator: annotationsOp
        }
      : null

    const value: SearchFilters = {
      filter: {
        from_bt: fromBt,
        to_bt: toBt,
        from_tt: fromTt,
        to_tt: toTt,
        annotations: anFilter,
        device_ids: null,
        channels: chFilter,
        sr
      },
      sort: { field: orderBy as SessionSortOptions['field'], mode: order },
      pagination: {
        from_idx: page * rowsPerPage,
        to_idx: (page + 1) * rowsPerPage
      }
    }
    setFilteredData(listSessions(value.filter, value.sort, value.pagination, props.data))
  }

  const filterOptions: FilterOption[] = [
    {
      label: 'Start Date',
      options: 'date',
      fromValue: fromBt,
      toValue: toBt,
      onChangeFrom: setFromBt,
      onChangeTo: setToBt
    },
    {
      label: 'End Date',
      options: 'date',
      fromValue: fromTt,
      toValue: toTt,
      onChangeFrom: setFromTt,
      onChangeTo: setToTt
    },
    {
      label: 'Sample Rate',
      options: [44100, 48000],
      value: sr,
      onChange: setSr
    },
    {
      label: 'Channels',
      options: 'multilineOperator',
      linesValue: channels,
      onChangeLines: setChannels,
      operatorValue: channelsOp,
      onChangeOperator: setChannelsOp,
      operatorOptions: ['and', 'or']
    },
    {
      label: 'Annotations',
      options: 'multilineOperator',
      linesValue: annotations,
      onChangeLines: setAnnotations,
      operatorValue: annotationsOp,
      onChangeOperator: setAnnotationsOp,
      operatorOptions: ['and', 'or']
    }
  ]
  const clearFilters = (): void => {
    [setFromBt, setToBt, setFromTt, setToTt, setSr, setChannels, setChannelsOp, setAnnotations, setAnnotationsOp].forEach((setter) => {
      setter(null)
    })
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

  const onOrderChange = (orderBy: string): void => {
    setOrderBy(orderBy)
    setOrder(order === 'asc' ? 'desc' : 'asc')
    setPage(0)
  }

  const renderExpandedSession = (s: Session): JSX.Element => {
    return (
      <Grid container>
        <Grid item sm={4}>
          <Stack direction="row">
            <Box>{'Channels'}</Box>:
            <Stack mt={'5px'} ml={0}>
              {s.channels.map((c, i) => {
                return (
                  <FlexBox key={`channel-${i}`} ml={1}>
                    <Typography variant="h5">{c.name}</Typography>
                    {!(c.description.length === 0) && <Typography variant="h6" mr={0.5}>
                      {`\u00A0- ${c.description}`}
                    </Typography>}
                  </FlexBox>
                )
              })}
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={4}>
          <Stack direction="row">
            <Box>{`Sample Rate: ${s.sr}`}</Box>
          </Stack>
        </Grid>
      </Grid>
    )
  }

  useEffect(submitFilters, [page, order, orderBy, rowsPerPage])
  useEffect(() => {
    setPage(0)
  }, [fromBt, toBt, fromTt, toTt, sr, channels, channelsOp, annotations, annotationsOp, rowsPerPage])

  const style = {
    filter: darkMode ? 'invert(1)' : 'invert(0)',
    ...props.style
  }

  return (
    <div style={style}>
      <DataTable
        theme={otosenseTheme2022}
        data={filteredData}
        columns={columns}
        clearFilters={clearFilters}
        submitFilters={submitFilters}
        filterOptions={filterOptions}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        onPageChange={onPageChange}
        orderBy={orderBy}
        order={order}
        onOrderChange={onOrderChange}
        renderExpandedData={renderExpandedSession}
        isMultiSelect={props.isMultiSelect}
        onSelectItems={props.onSelectSessions}
        totalCount={props.data?.length ?? -1}
      />
    </div>
  )
}
