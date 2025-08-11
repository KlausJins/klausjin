'use client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUseJSON = (data: any) => {
  if (toString.call(data) === '[object Object]' || toString.call(data) === '[object Array]') {
    return true
  } else {
    return false
  }
}

export const getLocalStorage = (name: string) => {
  return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name) || '') : ''
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLocalStorage = (name: string, data: any) => {
  return isUseJSON(data)
    ? localStorage.setItem(name, JSON.stringify(data))
    : localStorage.setItem(name, data)
}
