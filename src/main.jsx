import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MovieProvider } from './contexts/MovieContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <App />
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>
)
