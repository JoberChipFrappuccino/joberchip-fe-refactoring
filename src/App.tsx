import { Outlet } from 'react-router-dom'
import QueryContext from './contexts/QueryContext'

export default function App() {
  return (
    <QueryContext>
      <Outlet />
    </QueryContext>
  )
}
