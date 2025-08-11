'use client'

const useJSON = (data: any) => {
  if (toString.call(data) === '[object Object]' || toString.call(data) === '[object Array]') {
    return true
  } else {
    return false
  }
}

export const getLocalStorage = (name: string) => {
  return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name) || '') : ''
}

export const setLocalStorage = (name: string, data: any) => {
  return useJSON(data)
    ? localStorage.setItem(name, JSON.stringify(data))
    : localStorage.setItem(name, data)
}
