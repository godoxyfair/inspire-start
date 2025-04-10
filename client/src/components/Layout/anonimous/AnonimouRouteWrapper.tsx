import { useAppSelector } from '@/redux/hooks/hooks'
import { FunctionComponent, ReactNode } from 'react'
import { Navigate } from 'react-router'
import Layout from '../Layout'
type Props = {
  screen: ReactNode
}
export const AnonymousRouteWrapper: FunctionComponent<Props> = (props) => {
  const { isAuth, isLoaded } = useAppSelector((state) => state.auth)

  if (!isLoaded) return null // или спиннер

  // const to = authService.lastAuthorizedPath || ROUTE_PATHS.HOME

  return isAuth ? <Navigate to={'/task'} /> : <Layout>{props.screen}</Layout>
}
