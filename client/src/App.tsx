import React from 'react'
import { RouterProvider } from 'react-router'

import ErrorBoundary from './components/ErrorBoundary'
import router from './router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { AuthProvider } from './authProvider/AuthProvider'

const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
)
App.displayName = 'App'
export default App
