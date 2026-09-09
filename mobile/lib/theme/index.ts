export type ThemeMode = 'dark' | 'light'

export interface ThemeColors {
  background: string
  card: string
  cardSecondary: string
  border: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  accent: string
  accentBg: string
  badgeBg: string
  danger: string
  dangerBg: string
  dangerBorder: string
  success: string
  successBg: string
  warning: string
  warningBg: string
  warningBorder: string
  navBg: string
  navBorder: string
  navActiveTab: string
  statusBar: 'light-content' | 'dark-content'
}

export const themes: Record<ThemeMode, ThemeColors> = {
  dark: {
    background: '#080B11',
    card: '#0F1524',
    cardSecondary: '#131A2C',
    border: 'rgba(255, 255, 255, 0.07)',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#38BDF8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    badgeBg: 'rgba(56, 189, 248, 0.12)',
    danger: '#EF4444',
    dangerBg: '#1E1215',
    dangerBorder: '#EF4444',
    success: '#10B981',
    successBg: 'rgba(16, 185, 129, 0.15)',
    warning: '#F59E0B',
    warningBg: '#1E1810',
    warningBorder: 'rgba(245, 158, 11, 0.4)',
    navBg: '#0E1424',
    navBorder: 'rgba(255, 255, 255, 0.08)',
    navActiveTab: '#16223B',
    statusBar: 'light-content',
  },
  light: {
    background: '#F1F5F9', // Crisp daylight sky
    card: '#FFFFFF',
    cardSecondary: '#F8FAFC',
    border: 'rgba(0, 0, 0, 0.08)',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    accent: '#0284C7',
    accentBg: 'rgba(2, 132, 199, 0.10)',
    badgeBg: 'rgba(2, 132, 199, 0.10)',
    danger: '#DC2626',
    dangerBg: '#FEF2F2',
    dangerBorder: '#FCA5A5',
    success: '#059669',
    successBg: 'rgba(16, 185, 129, 0.12)',
    warning: '#D97706',
    warningBg: '#FFFBEB',
    warningBorder: '#FCD34D',
    navBg: '#FFFFFF',
    navBorder: 'rgba(0, 0, 0, 0.08)',
    navActiveTab: '#E0F2FE',
    statusBar: 'dark-content',
  },
}

