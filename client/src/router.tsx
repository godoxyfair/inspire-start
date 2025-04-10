import { createBrowserRouter, Navigate } from 'react-router'

import Layout from './components/Layout/Layout'
import Index from './pages/Index'
import Notfound from './pages/Notfound'
import { TaskPage } from './pages/taskPage/TaskPage'
import { GuestPage } from './pages/guestPage/GuestPage'
import { ProtectedRouteWrapper } from './components/Layout/protected/ProtectedRouteWrapper'
import { AnonymousRouteWrapper } from './components/Layout/anonimous/AnonimouRouteWrapper'

const router = createBrowserRouter([
  {
    path: '/task',
    element: <ProtectedRouteWrapper screen={<TaskPage />} />,
  },
  {
    path: '/main',
    element: <AnonymousRouteWrapper screen={<GuestPage />} />,
  },
  {
    path: '/',
    element: <Navigate to={`/main`} />,
  },
  {
    path: '*',
    element: (
      <Layout>
        <Notfound />
      </Layout>
    ),
  },
])

export default router
