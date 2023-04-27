import React, { useEffect, useState } from 'react'
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
  type Session,
  type TestResult
} from './types'
import { listSessions } from './testData'

interface SearchFilters {
  filter: Optional<SessionFilterOptions>
  sort: Optional<SessionSortOptions>
  pagination: Optional<PaginationOptions>
}

interface OtoTableProps {
  data: TestResult[]
  query?: Optional<SearchFilters>
  isMultiSelect?: boolean
  style?: Record<string, string>

  onSelectSessions: (sessions: TestResult[]) => void
}
const columns: Column[] = [
  {
    label: 'Start Date',
    sx: cellDateTime,
    key: (s: Session) => formatSessionTime(+s.bt),
    orderBy: 'bt'
  },
  { label: 'Duration (sec)', sx: cellMW160, key: (s: Session) => `${(s.tt - s.bt) / 1e6}` },
  {
    label: 'Tags',
    sx: {
      maxWidth: 240,
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      wordWrap: 'break-word'
    },
    key: (s: Session) => {
      const uniqueTags = new Set(s.annotations.map(a => a.name))
      return Array.from(uniqueTags).join(', ')
    }
  },
  {
    label: 'Class',
    sx: cellMW160,
    key: 'class',
    orderBy: 'class'
  },
  {
    label: 'Class Predicted',
    sx: cellMW160,
    key: 'class_predicted',
    orderBy: 'class_predicted'
  },
  {
    label: 'Prediction Accuracy',
    sx: cellMW160,
    key: (s: TestResult) => (s.class === s.class_predicted) ? 'correct' : 'incorrect'
  }
]

export const TestResultsTable = (props: OtoTableProps): JSX.Element => {
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
                    {typeof c.description === 'string' && <Typography variant="h6" mr={0.5}>
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

  return (
    <DataTable
      theme={otosenseTheme2022}
      style={props.style}
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
  )
}
