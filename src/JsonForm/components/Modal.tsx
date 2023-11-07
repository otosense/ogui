import React from 'react'
import { Modal, Box, Typography, Paper } from '@mui/material'

interface ICustomModal {
  open: boolean
  handleClose: () => void
  title: string
  content: JSX.Element
}
const CustomModal = (props: ICustomModal): JSX.Element => {
  const { open, handleClose, title, content } = props
  return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400
                }}
            >
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5" className="ModalTitle">
                        {title}
                    </Typography>
                    {/* <Typography variant="body2" gutterBottom> */}
                        {content}
                    {/* </Typography> */}
                </Paper>
            </Box>
        </Modal>
  )
}

export default CustomModal
