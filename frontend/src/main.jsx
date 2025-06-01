import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { BrowserRouter } from 'react-router-dom'
import { isAuthticUser } from './features/auth/authSlice.js'
import { AuthProvider } from './context/AuthContext.jsx'



store.dispatch(isAuthticUser())



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
   <AuthProvider>
     <BrowserRouter>
    <App/>
    </BrowserRouter>
   </AuthProvider>

  </Provider>
)
