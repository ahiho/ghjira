import axios, {AxiosInstance} from 'axios'

const axiosClient = (baseURL: string, token: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`
    }
  })

  return axiosInstance
}

export default axiosClient
