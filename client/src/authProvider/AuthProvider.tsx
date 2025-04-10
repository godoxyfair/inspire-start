import { authSliceActions } from '@/redux/authSlice'
import { PropsWithChildren, Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

export const AuthProvider: React.FC<PropsWithChildren> = ({
  children,
  ...rest
}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    const res = await fetch('http://localhost:3001/auth/userInfo', {
      credentials: 'include', //отправятся cookie с сессией
    })

    if (res.ok) {
      const user = await res.json()
      dispatch(authSliceActions.setUser(user))
      // localStorage.setItem('isAuth', 'isAuth')
      setLoading(false)
    } else {
      dispatch(authSliceActions.logoutUser())
      // localStorage.removeItem('isAuth')
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return <>{children}</>
}
