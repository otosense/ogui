import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
import { Button, TextField, Grid, Typography } from '@mui/material'

const AuthenticationPage = (props: { FormData: any }): JSX.Element => {
  const { FormData } = props
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()
  // const navigate = useNavigate()

  const onSubmit = async (data: any): Promise<void> => {
    console.log({ data })
    FormData(data)
    setIsLoading(true)

    // Mock the authentication API call by returning true always.
    const isAuthenticated = true

    if (isAuthenticated) {
      console.log('Home Page')
      // Navigate to the home page.
      // navigate('/')
    } else {
      // Display an error message.
      alert('Invalid username or password.')
    }

    setIsLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Username"
              variant="outlined"
              {...register('username', { required: true, minLength: 8 })}
            />
           {(errors.username !== null && errors?.username?.type === 'required') && (
              <Typography className="error-text" color="error">
                Username is required.
              </Typography>
           )}
            {(errors.username !== null && errors?.username?.type === 'minLength') && (
              <Typography className="error-text" color="error">
                Username must be at least 8 characters.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              {...register('password', { required: true, minLength: 8 })}
            />
            {errors.password !== null && errors?.password?.type === 'required' && (
              <Typography className="error-text" color="error">
                Password is required.
              </Typography>
            )}
            {errors.password !== null && errors?.password?.type === 'minLength' && (
              <Typography className="error-text" color="error">
                Password must be at least 8 characters.
              </Typography>
            )}
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
