import { createBrowserRouter } from 'react-router'

import Layout from './components/Layout/Layout'
import Index from './pages/Index'
import Notfound from './pages/Notfound'
import { TaskPage } from './pages/taskPage/TaskPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <TaskPage />
      </Layout>
    ),
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
