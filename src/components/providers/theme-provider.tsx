'use client'
import { ThemeProvider, type ThemeProviderProps } from 'next-themes'

export const NextThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <ThemeProvider
      attribute={'class'}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </ThemeProvider>
  )
}
