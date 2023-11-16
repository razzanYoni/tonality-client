import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
} from "react-router-dom";
import TonalityApp from "@/TonalityApp.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <TonalityApp />
    </BrowserRouter>

  </React.StrictMode>,
)
