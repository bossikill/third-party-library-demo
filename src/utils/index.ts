/**
 * 工具函数封装
 */
import env from '@/config'

// 格式化金额
export const formatMoney = (num?: number | string) => {
  if (!num) return '0.00'
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

// 格式化数字
export const formatNum = (num?: number | string) => {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
  if (date === undefined || date === null) return ''
  let curDate = new Date()
  if (date instanceof Date) curDate = date
  else if (date) curDate = new Date(date)

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
  type OType = {
    [key: string]: number
  }
  const O: OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (const k in O) {
    // const val = O[k].toString()
    fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
    // fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
  }
  return fmt
}

/**
 * 手机号加密
 * @example
 * 17611000011 => 176****0011
 */
export const formateMobile = (mobile?: number) => {
  if (!mobile) return '-'
  const phone = mobile.toString()
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

// 保留两位小数
export function keepDecimal(iptNumber: number, iptPlace: number) {
  if (!(iptNumber >= 0)) {
    return 0
  }
  const place = Math.pow(10, iptPlace)
  return Math.floor(iptNumber * place) / place
}

// 通过文件名,获取图片的真实地址
export function getImagePath(filename: string) {
  return `${env.baseApi}media/avatar/${filename}`
}

// 获取路径中的文件名
export function getFilename(path: string) {
  return path.substring(path.lastIndexOf('/') + 1)
}

/**
 * cookie字符串转对象
 * @param info string cookie字符串
 * @returns object cookie对象
 */
export const transformCookie = (info: string) => {
  const infoList = info.split('|')
  return infoList.reduce((pre: any, cur: any) => {
    const userArr = cur.split(':')
    pre[userArr[0]] = userArr[1]
    return pre
  }, {})
}

// 取消事件冒泡
export function cancelBubble(e: any) {
  e.stopPropagation()
  e.nativeEvent.stopImmediatePropagation()
}

// 下载文件
export function download(url: string) {
  const filename = url.substring(url.lastIndexOf('/') + 1)
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style.display = 'none'
      const url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = filename
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    })
}

// 图片转base64
export function fileToBase64(file: any) {
  const reader = new FileReader()
  return new Promise(resolve => {
    reader.onload = ev => {
      resolve(ev.target?.result)
    }
    reader.readAsDataURL(file)
  })
}
