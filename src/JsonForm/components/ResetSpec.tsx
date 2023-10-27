import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'

function ResetAll (props: any): JSX.Element {
  const { handleClose } = props
  const deleteHandler = (): void => {
    handleClose()
  }
  return (
        <>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'center' }} >
                Are you sure? This action will reset the Specification it its older state, and it cannot be undone.
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, width: '70%', margin: '10px auto', textAlign: 'center' }} >
                <Button variant="contained" onClick={deleteHandler} startIcon={<RestartAltIcon />}>
                    Reset
                </Button>
                <Button variant="contained" onClick={handleClose} startIcon={<CloseIcon />}>
                    Close
                </Button>
            </Box>
        </>
  )
}

export default ResetAll
