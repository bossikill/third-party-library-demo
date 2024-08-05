import { MenuItem } from '@/config/menu'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Index from '@/views/index'
import React from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { lazyLoad } from './LazyLoad'

export const router = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/demo',
    element: lazyLoad(React.lazy(() => import('@/views/demo')))
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/403',
    element: <Error403 />
  },
  {
    path: '/404',
    element: <Error404 />
  }
]

// https://cn.vitejs.dev/guide/features#glob-import
const modules: any = import.meta.glob('@/views/**')

MenuItem.map(element => {
  element.children.map(ele => {
    router.push({
      path: ele.key,
      element: lazyLoad(React.lazy(modules[`/src/views${ele.key}/index.tsx`]))
    })
  })
})

export default createBrowserRouter(router)
