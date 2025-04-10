import { useAppSelector } from '@/redux/hooks/hooks'
import { FunctionComponent, ReactNode } from 'react'
import Layout from '../Layout'
import { Navigate } from 'react-router'
type Props = {
  screen: ReactNode
}
export const ProtectedRouteWrapper: FunctionComponent<Props> = (props) => {
  const { screen } = props
  const { isAuth, isLoaded } = useAppSelector((state) => state.auth)

  if (!isLoaded) return null

  return isAuth ? <Layout>{screen}</Layout> : <Navigate to={'/main'} />
}

// const location = useLocation()

// const saveHistoryPath = (): void =>
//   authService.setLastAuthorizedPath(location.pathname ?? '')

// if (!isAuth) {
//   // saveHistoryPath()

//   return <SignOutScreen />
// }
