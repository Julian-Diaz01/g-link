import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

const get = <T = never>(
  url: string,
  params?: never,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const getConfig = { ...config, params }
  return axiosInstance.get<T>(url, getConfig)
}

export const request = {
  get,
}
