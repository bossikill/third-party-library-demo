// 接口返回数据
export interface Result<T = any> {
  code: number
  data: T
  msg?: string
}

// 分页返回数据
export interface PageResult<T = any> {
  res: T[]
  count: number | 0
}

// 分页请求参数
export interface PageParams {
  page?: number
  size?: number
}
