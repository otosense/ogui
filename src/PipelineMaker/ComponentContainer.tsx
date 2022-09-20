import React from "react"

import { Box, Typography } from '@mui/material';
import { CSSProperties } from "@mui/styled-engine";

interface IProps {
  children: JSX.Element;
  title: string;
}

const containerStyle: CSSProperties = {
  width: 800,
  height: 'calc(100% - 48px)',
  display: 'flex',
  justifyContent: 'flex-start',
  background: '#F3F3F3',
  minHeight: 400,
  maxHeight: 'auto',
  flexDirection: 'column',
  border: '1px solid #F3F3F3',
  alignItems: 'center',
  overflow: 'auto'
}
const titleStyle: CSSProperties = {
  background: 'white',
  height: 40,
  width: 'calc(100% - 48px)',
  display: 'flex',
  alignItems: 'center',
  padding: 1
}
const ConpomentContainer = (props: IProps) => {
  const { title, children } = props;
  return(
      <Box sx={containerStyle}>
        <Box sx={titleStyle}>
          <Typography variant="h2">{title}</Typography>
        </Box>
        {children}
      </Box>
  )
}

export default ConpomentContainer;