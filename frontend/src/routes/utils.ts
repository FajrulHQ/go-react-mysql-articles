export const encode_ = (value: string) => {
  return crypto.randomUUID() + '-' + btoa(value)
}

export const decode_ = (enc: string) => {
  try {
    return atob(enc.split('-').at(-1) || '')
  } catch {
    return ''
  }
}