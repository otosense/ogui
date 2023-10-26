import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Grid } from '@mui/material'

const AuthenticationPage = (props: { FormData: any }): JSX.Element => {
  const { FormData } = props
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data: any): Promise<void> => {
    console.log({ data })
    FormData(data)
    setIsLoading(true)

    // Mock the authentication API call by returning true always.
    const isAuthenticated = true

    if (isAuthenticated) {
      console.log('Home Page')
      // Navigate to the home page.
      navigate('/')
    } else {
      // Display an error message.
      alert('Invalid username or password.')
    }

    setIsLoading(false)
  }

  return (
    <div>
      <h1>Authentication</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Username"
              variant="outlined"
              {...register('username')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              {...register('password')}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              fullWidth
            >
              Log In
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AuthenticationPage
