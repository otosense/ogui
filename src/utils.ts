export function getDarkModeValue (): boolean {
  return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function detectDarkModeChange (setDarkMode: (arg0: boolean) => void): void {
  const modeMe = (e: any): void => {
    setDarkMode(!!e.matches)
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeMe)
}
