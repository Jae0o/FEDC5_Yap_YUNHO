import axios from "axios"
import { API_ERROR_MESSAGE } from "../constants/errorMessage"

const { VITE_API_BASE_URL } = import.meta.env

const API = axios.create({
  baseURL: VITE_API_BASE_URL,
  // 요청이 `timeout`보다 오래 걸리면 요청이 중단됩니다.
  timeout: 2000,
})
const typeCheck = Object.prototype.toString

export const GET_API = async (path: string) => {
  try {
    const res = await API.get(path)

    return res
  } catch (e) {
    console.error(e)
  }
}

export const POST_API = async (path: string, data: object) => {
  try {
    if (typeCheck.call(data) !== "[object Object]") {
      return console.error(API_ERROR_MESSAGE.CHECK_IS_OBJECT)
    }

    const res = await API.post(path, data)
    return res
  } catch (e) {
    console.error(e)
  }
}
