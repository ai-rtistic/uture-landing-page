import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignSystem } from './DesignSystem'
import '../styles/globals.css'
import '../styles/components.css'
import '../components/graphics/graphics.css'
import './ds.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignSystem />
  </StrictMode>,
)
