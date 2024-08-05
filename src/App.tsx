import { AntdApp, AntdGlobal, ConfigProvider, zhCN } from '@/bootstrap/antd'
import '@/bootstrap/dayjs'
import '@/bootstrap/style'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#323138',
          // colorTextBase: '#B0B0B0',
          // colorBgBase: '#0c0b0f',
          // colorLink: '#B0B0B0'
        }
      }}
      locale={zhCN}
    >
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
