/**
 * 环境配置封装
 */

type ENV = 'dev' | 'prd'

const env = (document.documentElement.dataset.env as ENV) || 'stg'

const config = {
  dev: {
    baseApi: '',
    mock: false,
    mockApi: '',
    static: ''
  },
  prd: {
    baseApi: '',
    mock: false,
    mockApi: '',
    static: ''
  }
}

export default {
  env,
  ...config[env]
}
