import React, { useEffect, useState } from 'react'

import {
  Autocomplete,
  Stack,
  TextField,
  type TextFieldProps,
  Typography
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { type Operator, type Optional } from './types'

export const MultilineOperatorFilter = (
  label: string,
  linesValue: Optional<string[]>,
  onChangeLines: (lines: string[]) => void,
  operatorValue: Optional<Operator>,
  onChangeOperator: (op: Operator) => void,
  operatorOptions: Operator[]
): JSX.Element => {
  const [lines, setlines] = useState<string>('')

  useEffect(() => {
    setlines((linesValue != null) ? linesValue.join('\n') : '')
  }, [linesValue])

  return (
    <>
      <TextField
        sx={{ height: 'auto', width: '100%' }}
        placeholder={'Separate values with newline'}
        variant="filled"
        value={lines}
        multiline
        rows={4}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setlines(event.target.value) }}
        onBlur={() => { onChangeLines(lines.replace(/^\s+|\s+$/g, '').split(/\n+/)) }}
      />
      <Autocomplete
        options={operatorOptions}
        id={`filter-${label}`}
        onChange={(e: any, newValue: string | null) => {
          if (newValue != null) {
            onChangeOperator(newValue as Operator)
          } else {
            onChangeOperator(operatorOptions[0])
          }
        }}
        value={operatorValue ?? operatorOptions[0]}
        renderInput={(params) => (
          <TextField {...params} placeholder={'Operator'} variant="filled" />
        )}
      />
    </>
  )
}

export const renderSearchableFilter = (
  label: string,
  value: Optional<string>,
  onChange: any,
  options: any
): JSX.Element => (
  <Autocomplete
    options={options}
    id={`filter-${label}`}
    onChange={(e: any, newValue: string | number | null) => {
      if (newValue != null) {
        onChange(newValue)
      } else {
        onChange('')
      }
    }}
    value={value ?? ''}
    renderInput={(params) => (
      <TextField {...params} placeholder={label} variant="filled" />
    )}
  />
)

export const DateTimeFilter = (
  label: string,
  fromValue: Optional<number>,
  toValue: Optional<number>,
  onChangeFrom: (value: number) => void,
  onChangeTo: (value: number) => void
): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')

  const makeSecondsZero = (str: Date): Date => {
    const timeText = str.toString().split(' ')
    const time = timeText[4].slice(0, -2).concat('00')
    const formatted = timeText
    formatted[4] = time
    const joined = formatted.join(' ')
    return new Date(joined)
  }
  const changeStartDate = (val: Date): void => {
    setStartDate(val)
    const formatted = makeSecondsZero(val)
    const epoch = formatted.getTime() * 1000
    onChangeFrom(epoch)
  }
  const changeEndDate = (val: Date): void => {
    const formatted = makeSecondsZero(val)
    const epoch = formatted.getTime() * 1000
    if (fromValue == null || fromValue <= epoch) {
      setError(false)
      setErrorText('')
      setEndDate(val)
      onChangeTo(epoch)
    } else {
      setErrorText('Start Date Must Be Earlier Than End Date')
      setError(true)
    }
  }
  useEffect(() => {
    if (fromValue == null && toValue == null) {
      setEndDate(null)
      setStartDate(null)
    } else if (fromValue != null && toValue != null) {
      // setFilterBtnDisabled(false);
    } else if (fromValue != null && toValue == null) {
      // setFilterBtnDisabled(true);
      setErrorText('Select End Date And Time')
      setError(true)
    } else if (toValue != null && fromValue == null) {
      // setFilterBtnDisabled(true);
      setErrorText('Select Start Date And Time')
      setError(true)
    } else if (toValue != null && fromValue != null) {
      // setFilterBtnDisabled(false);
      setError(false)
      setErrorText('')
    }
  }, [toValue, fromValue])

  return (
    <>
      <Stack mb={1}>
        <Typography variant="overline">
          {'Start Date'}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props: TextFieldProps) => <TextField {...props} />}
            value={startDate}
            onChange={(newValue: Date | null) => {
              if (!(newValue == null) && typeof newValue !== 'string') {
                changeStartDate(newValue)
              }
            }}
          />
        </LocalizationProvider>
      </Stack>
      <Stack>
        <Typography variant="overline">{'End Date'}</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props: TextFieldProps) => <TextField {...props} />}
            value={endDate}
            onChange={(newValue: Date | null) => {
              if (!(newValue == null) && typeof newValue !== 'string') {
                changeEndDate(newValue)
              }
            }}
          />
        </LocalizationProvider>
        {error &&
        <Typography variant="caption" color="error">{errorText}</Typography>
        }
      </Stack>
    </>
  )
}
