export const setAuth = (name: string, value: string) => {
  localStorage.setItem(name, value)
}

export const getAuth = (name: string) => {
  return localStorage.getItem(name)
}

export const removeAuth = (name: string) => {
  localStorage.removeItem(name)
}
