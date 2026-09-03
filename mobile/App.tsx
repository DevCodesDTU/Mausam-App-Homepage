import React, { useState } from 'react'
import { View, StatusBar } from 'react-native'
import { AuthScreen } from './features/auth/AuthScreen'
import { OnboardingScreen } from './features/onboarding/OnboardingScreen'
import { HomeScreen } from './features/weather/HomeScreen'
import { AlertsScreen } from './features/alerts/AlertsScreen'
import { ProfileScreen } from './features/profile/ProfileScreen'
import { BottomNavBar, TabScreen } from './components/BottomNavBar'
import { ThemeMode, themes } from './lib/theme'
import { styles } from './App.styles'

type AppPhase = 'auth' | 'onboarding' | 'main'

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('auth')
  const [currentTab, setCurrentTab] = useState<TabScreen>('home')
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: 'Alex River',
    email: 'alex.river@example.com',
  })
  const [userActivities, setUserActivities] = useState<string[]>([
    'surfing',
    'cycling',
  ])
  const [unit, setUnit] = useState<'C' | 'F'>('C')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData)
    setPhase('onboarding')
  }

  const handleOnboardingComplete = (selectedActivities: string[]) => {
    setUserActivities(selectedActivities)
    setPhase('main')
    setCurrentTab('home')
  }

  const handleToggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'))
  }

  const handleSignOut = () => {
    setPhase('auth')
  }

  const colors = themes[theme]

  return (
    <View style={[styles.appContainer, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.statusBar}
        backgroundColor={colors.background}
      />

      {/* App Stage Machine */}
      {phase === 'auth' && (
        <AuthScreen
          onSuccess={handleAuthSuccess}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {phase === 'onboarding' && (
        <OnboardingScreen
          userName={user.name}
          onComplete={handleOnboardingComplete}
          theme={theme}
        />
      )}

      {phase === 'main' && (
        <View style={styles.mainContainer}>
          {currentTab === 'home' && (
            <HomeScreen
              userActivities={userActivities}
              unit={unit}
              onOpenProfile={() => setCurrentTab('profile')}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          )}

          {currentTab === 'alerts' && (
            <AlertsScreen
              userActivities={userActivities}
              unit={unit}
              theme={theme}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              userName={user.name}
              userEmail={user.email}
              userActivities={userActivities}
              unit={unit}
              onToggleUnit={handleToggleUnit}
              onUpdateActivities={setUserActivities}
              onResetToOnboarding={() => setPhase('onboarding')}
              onSignOut={handleSignOut}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          )}

          {/* Floating Icon-Only Bottom Bar */}
          <BottomNavBar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            hasAlerts={true}
            theme={theme}
          />
        </View>
      )}
    </View>
  )
}
