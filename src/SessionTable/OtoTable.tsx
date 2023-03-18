import React, { useEffect, useState } from 'react'
import { FlexBox, otosenseTheme2022 } from '@otosense/components'
import { Box, Grid, Stack, Typography } from '@mui/material'

import { type Column, SessionTable } from './Table'
import { formatSessionTime } from './utility'
import { type FilterOption } from './Filter'
import { cellDateTime, cellMW160 } from './tableStyles'
import {
  type PaginationOptions,
  type SessionFilterOptions,
  type SessionSortOptions,
  type Operator,
  type Optional,
  type Session
} from './types'

interface StComponentValue {
  filter: Optional<SessionFilterOptions>
  sort: Optional<SessionSortOptions>
  pagination: Optional<PaginationOptions>
}

interface OtoTableProps {
  setComponentValue: (value: StComponentValue) => void
  data: Session[]
  query?: Optional<StComponentValue>
}

const columns: Column[] = [
  {
    label: 'Start Date',
    sx: cellDateTime,
    key: (s: Session) => formatSessionTime(+s.bt),
    orderBy: 'bt'
  },
  {
    label: 'End Date',
    sx: cellDateTime,
    key: (s: Session) => formatSessionTime(+s.tt),
    orderBy: 'tt'
  },
  { label: 'Duration (sec)', sx: cellMW160, key: (s: Session) => `${(s.tt - s.bt) / 1e6}` },
  { label: 'Sample Rate (Hz)', sx: cellMW160, key: 'sr', orderBy: 'sr' },
  { label: 'Bit Depth', sx: cellMW160, key: 'bit_depth' }
]

export const OtoTable = (props: OtoTableProps): JSX.Element => {
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

    const value: StComponentValue = {
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
    props.setComponentValue(value)
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
    const occurrences = s.annotations.reduce((acc: Record<string, number>, { name }) => {
      (acc[name] != null) ? ++acc[name] : acc[name] = 1
      return acc
    }, {})
    return (
      <Grid container>
        <Grid item sm={4}>
          <Stack direction="row">
            <Box>{'Channels'}</Box>:
            <Stack mt={'5px'} ml={0}>
              {s.channels.map((c, i) => {
                return (
                  <FlexBox key={`channel-${i}`} ml={1}>
                    <Typography variant="h4">{c.name}-</Typography>
                    <Typography variant="h5" mr={0.5}>{c.description}</Typography>
                  </FlexBox>
                )
              })}
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={4}>
          <Stack direction="row">
            <Box>{'Annotation Occurrences'}</Box>:
            <Stack mt={'5px'} ml={0}>
              {Object.entries(occurrences).map(([name, count], i) => {
                return (
                  <FlexBox key={`occurrences-${i}`} ml={1}>
                    <Typography variant="h4">{name}-</Typography>
                    <Typography variant="h5" mr={0.5}>{count}</Typography>
                  </FlexBox>
                )
              })}
            </Stack>
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
    <SessionTable
      theme={otosenseTheme2022}
      data={props.data}
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
    />
  )
}
