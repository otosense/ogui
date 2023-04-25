import React, { useEffect, useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Drawer, Typography } from '@mui/material'

import {
  DateTimeFilter,
  MultilineOperatorFilter,
  renderSearchableFilter
} from './FilterFunctions'

import { firstLetterStyle } from './tableStyles'
import { type Operator, type Optional } from './types'
import { detectDarkModeChange, getDarkModeValue } from '../utils'

interface DateFilterOption {
  label: string
  options: 'date'
  fromValue: Optional<number>
  toValue: Optional<number>
  onChangeFrom: (value: number) => void
  onChangeTo: (value: number) => void
}
interface ArrayFilterOption {
  label: string
  options: any[]
  value: any
  onChange: (value: any) => void
}

interface MultilineOperatorFilterOption {
  label: string
  options: 'multilineOperator'
  linesValue: Optional<string[]>
  onChangeLines: (lines: string[]) => void
  operatorValue: Optional<Operator>
  onChangeOperator: (op: Operator | null) => void
  operatorOptions: Operator[]

}

export type FilterOption = ArrayFilterOption | DateFilterOption | MultilineOperatorFilterOption
interface FilterProps {
  clearFilters: VoidFunction
  submitFilters: VoidFunction
  filterOptions: FilterOption[]
}

export const Filter = (props: FilterProps): JSX.Element => {
  const [drawerState, setDrawerState] = useState<boolean>(false)

  const filterTitle = 'Filters'
  const textClear = 'Clear'
  const textSearch = 'Search'

  const toggleState = (): void => {
    setDrawerState(!drawerState)
  }

  return (
    <Box sx={{ float: 'right', mb: '16px' }}>
      <Button color="secondary" onClick={toggleState} startIcon={<TuneIcon />}>
        <Typography variant="button">
          {'Filters'}
        </Typography>
      </Button>
      <SearchFilter
        filterOptions={props.filterOptions}
        drawerState={drawerState}
        toggleState={toggleState}
        title={filterTitle}
        btnTxtSearch={textSearch}
        btnTxtClear={textClear}
        resetFilters={props.clearFilters}
        formatAndCallSetFilters={props.submitFilters}
      />
    </Box>
  )
}

export const SearchFooter = styled(Box)({
  position: 'absolute',
  bottom: 0,
  textAlign: 'right',
  width: '100%',
  height: '86px',
  padding: '1rem',
  backgroundColor: '#a3a6b4'
})

export const SearchHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  background: '#f3f3f3',
  padding: '18px'
})

interface SearchFilterProps {
  filterOptions: FilterOption[]
  drawerState: boolean
  toggleState: VoidFunction
  title: string
  btnTxtSearch: string
  btnTxtClear: string
  resetFilters: VoidFunction
  formatAndCallSetFilters: VoidFunction
}

export const SearchFilter = (props: SearchFilterProps): JSX.Element => {
  const {
    filterOptions,
    drawerState,
    toggleState,
    title,
    btnTxtSearch,
    btnTxtClear,
    resetFilters,
    formatAndCallSetFilters
  } = props

  // Detect dark mode
  const [darkMode, setDarkMode] = useState(getDarkModeValue())
  useEffect(() => { detectDarkModeChange(setDarkMode) }, [])

  const renderComponents = (filterOption: FilterOption): JSX.Element | undefined => {
    const { options } = filterOption
    if (options === 'date') {
      const { label, fromValue, toValue, onChangeFrom, onChangeTo } = filterOption
      return DateTimeFilter(label, fromValue, toValue, onChangeFrom, onChangeTo)
    } else if (options === 'multilineOperator') {
      const { label, linesValue, onChangeLines, operatorValue, onChangeOperator, operatorOptions } = filterOption
      return MultilineOperatorFilter(label, linesValue, onChangeLines, operatorValue, onChangeOperator, operatorOptions)
    } else if (Array.isArray(options)) {
      const { label, value, onChange } = filterOption
      return renderSearchableFilter(label, value, onChange, options)
    }
  }

  const style = {
    filter: darkMode ? 'invert(1)' : 'invert(0)'
  }

  return (
    <Drawer style={style} anchor="right" open={drawerState} onClose={toggleState}>
      <SearchHeader>
        <Typography variant="h3">{title}</Typography>
        <Box onClick={toggleState} sx={{ '&:hover': { cursor: 'pointer' } }}>
          <CloseIcon color="primary" />
        </Box>
      </SearchHeader>
      {filterOptions.map((fop, i) => {
        return (
          <Accordion key={`search-filter-${fop.label}-${i}`} disableGutters={true} sx={{ overflow: 'scroll' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={`filter-header-${fop.label}`}
            >
              <Typography variant="body2" mr={1} sx={firstLetterStyle}>
                {fop.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{renderComponents(fop)}</AccordionDetails>
          </Accordion>
        )
      })}
      <SearchFooter>
        <Button color="cancel" sx={{ mr: 1 }} onClick={resetFilters}>
          <Typography variant="button">
            {btnTxtClear}
          </Typography>
        </Button>
        <Button
          sx={{ mr: 1 }}
          onClick={formatAndCallSetFilters}
          disabled={false}
        >
          <Typography variant="button">
            {btnTxtSearch}
          </Typography>
        </Button>
      </SearchFooter>
    </Drawer>
  )
}
