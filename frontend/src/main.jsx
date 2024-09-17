import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import OtpVer from './components/OtpVer.jsx'
import DepositForm from './components/DepositForm.jsx'
import Welcome from './components/Wlcome.jsx'


let router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/deposit' element={<DepositForm/>}/>
      <Route path='/opt' element={<OtpVer/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
