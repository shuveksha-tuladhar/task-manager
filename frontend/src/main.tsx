import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Toast from './components/Toast/Toast.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <div className="flex flex-col h-full">
   <Header/>
    <Toast />
    <App />
    <Footer/>
   </div>
   
  </StrictMode>,
)
