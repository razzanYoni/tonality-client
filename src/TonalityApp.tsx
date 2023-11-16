import './App.css'
import React from 'react'
import { RenderRoutes } from "@/routes/RenderRoutes.tsx";
import {routes} from "@/routes/routes.ts";

export const Routes = RenderRoutes(routes)

const TonalityApp = () => {
  return (
    <Routes isAuthorized={true}/>
  )
}
export default TonalityApp
