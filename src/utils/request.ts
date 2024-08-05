import env from '@/config'
import { Result } from '@/types/service'
import axios, { AxiosError } from 'axios'
import { message } from './AntdGlobal'
import { hideLoading, showLoading } from './loading'

// 创建实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 50000,
  timeoutErrorMessage: '请求超时,请稍后再试',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }

    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }

    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (response.config.responseType === 'blob') return response
    if (data.code === 4001) {
      // 登录失效
      message.error(data.msg)
      location.href = env.baseApi + 'login?callback=' + encodeURIComponent(location.href)
    } else if (data.code && data.code != 200) {
      if (response.config.showError === false) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }

    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

// 全局loading/报错
interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export default {
  get<T>(url: string, params?: object, options: IConfig = { showLoading: false, showError: true }): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, params: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, params, options)
  },
  put<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.put(url, params, options)
  },
  delete<T>(url: string, params: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.delete(url, { data: params, ...options })
  },
  // 下载文件
  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      const name = (response.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    })
  },
  // 上传文件
  uploadFile(url: string, fileList: any[], params?: { name: string; value: string }[]) {
    const formData = new FormData()
    fileList.forEach((file: any) => {
      formData.append(file.name, file?.originFileObj) // 上传二进制流
    })
    params?.forEach(element => {
      formData.append(element.name, element.value)
    })
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
