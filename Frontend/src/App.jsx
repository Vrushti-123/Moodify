import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router'
import { router } from './routes/app.routes'
import "./features/shared/styles/global.scss"
import "./features/shared/styles/button.scss"
import { AuthProvider } from './features/auth/auth.context'
import { SongContextProvider } from './features/home/song.context'

const App = () => {
  return (

    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
      
    </AuthProvider>
  )
}

export default App
