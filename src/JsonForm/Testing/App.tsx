import React from 'react'
import AppTest from './AppTest'
import 'react-splitter-layout/lib/index.css'
// import './../css/JsonForm.css'
import './../css/JsonForm.scss'
import AuthenticationPage from './Authentication'
import { BrowserRouter as Router } from 'react-router-dom'

function App (): JSX.Element {
  const onSubmit = (data: any): void => {
    console.log('object', data)
  }
  return (

    <Router>
      <AuthenticationPage FormData={onSubmit} />
      <AppTest />
    </Router>

  )
}

export default App
