import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AnimationProvider } from './context/AnimationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnimationProvider>
      <App />
    </AnimationProvider>
  </StrictMode>,
)
