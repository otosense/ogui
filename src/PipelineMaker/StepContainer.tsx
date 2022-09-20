import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { Box  } from '@mui/material';

interface IProps {
  children: JSX.Element;
  index: number;
  onClick: (index: number) => void;
}

const stepBoxStyle = {
  width: 'calc(100% - 96px)',
  marginTop: 0.5,
  marginBottom: 0.5,
  marginLeft: 1,
  marginRight:1,
  background: 'white',
  paddingTop: 1,
  paddingLeft: 1,
  paddingRight: 1,
  paddingBottom: 0,
  display: 'flex'
}
const iconBox = {
  width: 80,
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minHeight: 90,
  cursor: 'pointer',
}

const StepContainer = (props: IProps) => {
  const { index, onClick, children } = props;

  const deleteStep = () => {
    const arrIndex = index - 1;
    onClick(arrIndex)
  }
  return(
      <Box sx={stepBoxStyle}>
        {children}
        <Box sx={iconBox} onClick={deleteStep} >
          {props.index !== 1 && <DeleteIcon sx={{color: '#003965'}} />}
        </Box>
      </Box>
  )
}

export default StepContainer