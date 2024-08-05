// DatePicker 在 ConfigProvider 设置为 zh_CN 后面板显示仍然有英文(https://github.com/ant-design/ant-design/issues/42170)
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
