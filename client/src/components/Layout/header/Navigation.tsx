import { useLogOutMutation } from '@/api/authApi'
import { authSliceActions, authSliceReducer } from '@/redux/authSlice'
import { useAppSelector } from '@/redux/hooks/hooks'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const Navigation: React.FC = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth)
  const [logOut, { isLoading }] = useLogOutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      await logOut().unwrap()
      dispatch(authSliceActions.logoutUser())
      navigate('/main')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav>
      {isAuth ? (
        <ul className="flex gap-2 items-center">
          <li>
            <a
              className="btn-custom variant-tab"
              href="/task"
              title="Your Board"
            >
              Tasks
            </a>
          </li>
          <li>
            <a className="btn-custom variant-tab" href="" title="Your Board">
              Statistics
            </a>
          </li>
          <li>
            <a className="btn-custom variant-tab" href="" title="Your Board">
              Resources
            </a>
          </li>
          <li>
            <a className="btn-custom variant-tab" href="" title="Your Board">
              Links
            </a>
          </li>
          <li>
            <button
              className="btn-custom variant-tab"
              onClick={handleLogOut}
              title="Log Out"
            >
              Log Out
            </button>
          </li>
          <div>{user.name}</div>
        </ul>
      ) : (
        <ul>
          <li>
            <a
              className="btn-custom variant-tab"
              href="http://localhost:3001/auth/google"
              title="Your Board"
            >
              Sign In with Google
            </a>
          </li>
        </ul>
      )}
    </nav>
  )
}
