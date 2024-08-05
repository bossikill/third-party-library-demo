import { MenuItem } from '@/config/menu'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function View() {
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([])

  const navigate = useNavigate()

  const handleClickMenu = ({ key }: { key: string }) => {
    navigate(key)
  }

  useEffect(() => {
    const openKeys = []
    MenuItem.map(ele => {
      openKeys.push(ele.key)
    })
    setDefaultOpenKeys(openKeys)
  }, [])

  return (
    <div className='view-wrapper'>
      {defaultOpenKeys.length > 0 ? (
        <Menu
          // style={{ width: 256 }}
          theme='dark'
          items={MenuItem}
          onClick={handleClickMenu}
          mode='inline'
          defaultOpenKeys={defaultOpenKeys}
        />
      ) : null}
    </div>
  )
}
