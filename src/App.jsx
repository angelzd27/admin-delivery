import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'hell',
        element: <Hell />
      }
    ]
  }
])

function App() {
  return (
    <>
    </>
  )
}

export default App
