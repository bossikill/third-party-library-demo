// eslint-disable-next-line
import axios from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}
