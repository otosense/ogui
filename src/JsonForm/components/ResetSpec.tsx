import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import LoadingOverlay from '../../utilities/Loader'
import { showToast } from '../../utilities/ReactToastMessage'
import { arraySplitter } from '../utilities/Mapping/storeMapping'
import { errorKey, resetMessage, successKey } from '../Testing/configs'

function ResetAll (props: any): JSX.Element {
  const { handleClose, resetSchema, formType, newJsonSpecValue } = props
  const [isLoading, setIsLoading] = useState(false)
  const deleteHandler = async (): Promise<void> => {
    try {
      setIsLoading(true)
      handleClose()
      const outputArray = arraySplitter(formType.value)
      const data = await resetSchema(outputArray[0])
      try {
        if (data === null) {
          showToast(resetMessage, successKey)
          newJsonSpecValue(data)
        }
      } catch (error: any) {
        showToast(error?.message, errorKey)
      }
    } catch (error: any) {
      showToast(error?.message, errorKey)
    } finally {
      setIsLoading(false)
    }
  }

  return (
        <>
        {isLoading && <LoadingOverlay />}
            <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'center' }} >
                Are you sure? This action will reset the Specification to its older state, and it cannot be undone.
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
