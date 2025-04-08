import React from 'react'
import { RouterProvider } from 'react-router'

import ErrorBoundary from './components/ErrorBoundary'
import router from './router'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
)
App.displayName = 'App'
export default App
