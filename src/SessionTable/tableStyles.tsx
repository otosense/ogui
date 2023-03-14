import { type CSSProperties } from 'react'
import { styled } from '@mui/material/styles'
import { Collapse, TableContainer } from '@mui/material'

export const cellMW160: CSSProperties = {
  maxWidth: 160,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

export const cellIconSpacing: CSSProperties = {
  paddingLeft: 0.3,
  paddingRight: 0.3,
  maxWidth: 24
}
export const cellDateTime: CSSProperties = {
  maxWidth: 192,
  minWidth: 192,
  overflow: 'hidden',
  background: 'transparent'
}

export const SessionsTableContainer = styled(TableContainer)({
  height: 'calc(100vh - 130px)',
  overflow: 'auto',
  ml: -1,
  mr: -1,
  borderTop: '1px solid #eee',
  width: '100%'
})

export const firstLetterStyle = {
  textTransform: 'none',
  '::first-letter': {
    textTransform: 'uppercase'
  }
}

export const centerTableFooter: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  position: 'fixed',
  bottom: 0,
  borderTop: '1px solid lightgray',
  background: 'white'
}
export const StyledCollapse = styled(Collapse)({
  backgroundColor: 'rgba(0,161,192, 0.05)',
  paddingLeft: '100px'
})
