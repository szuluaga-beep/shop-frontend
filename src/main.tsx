import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import './styles/index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>

      <HeroUIProvider>
        <main>

          <App />
        </main>
      </HeroUIProvider>
    </Provider>
  </StrictMode>,
)
