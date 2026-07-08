import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/fonts.css'
import './styles/globals.css'
import './styles/components.css'
import './components/graphics/graphics.css'
import './components/demos/demos.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
