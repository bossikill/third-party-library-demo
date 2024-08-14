const MenuItem = [
  {
    key: 'dnd-kit',
    label: 'dnd-kit',
    children: [
      { label: '拖入拖出', key: '/dnd-kit/dnd-kit-home' },
      { label: '拖入', key: '/dnd-kit/quick-start' },
      { label: '多容器拖入拖出', key: '/dnd-kit/multi-container' },
      { label: '排序', key: '/dnd-kit/sort' }
    ]
  },
  {
    key: 'zustand',
    label: 'zustand',
    children: [{ label: '重复渲染的问题', key: '/zustand/render-issue' }]
  },
  {
    key: '其他',
    label: '其他',
    children: [
      { label: 'react拖拽排序', key: '/other/react-dnd-sort' },
      { label: 'demo', key: '/demo' }
    ]
  }
]

export { MenuItem }
