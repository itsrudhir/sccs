import './assets/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewComponentInterface from './components/single-component-interface/NewComponentInterface'
import DeleteComponentInterface from './components/single-component-interface/DeleteComponentInterface'
import ComponentInterface from './components/single-component-interface/ComponentInterface'
import EditComponentInterface from './components/single-component-interface/EditComponentInterface'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/components/:componentId',
    element: <ComponentInterface />
  },
  {
    path: '/components/:componentId/delete-component',
    element: <DeleteComponentInterface />
  },
  {
    path: '/components/:componentId/edit-component',
    element: <EditComponentInterface />
  },
  {
    path: '/components/new-component',
    element: <NewComponentInterface />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
