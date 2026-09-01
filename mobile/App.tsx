import React, { useState } from 'react'
import { View, StatusBar } from 'react-native'
import { AuthScreen } from './features/auth/AuthScreen'
import { OnboardingScreen } from './features/onboarding/OnboardingScreen'
import { HomeScreen } from './features/weather/HomeScreen'
import { AlertsScreen } from './features/alerts/AlertsScreen'
import { ProfileScreen } from './features/profile/ProfileScreen'
import { BottomNavBar, TabScreen } from './components/BottomNavBar'
import { styles } from './App.styles'

type AppPhase = 'auth' | 'onboarding' | 'main'

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('auth')
  const [currentTab, setCurrentTab] = useState<TabScreen>('home')
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: 'Alex River',
    email: 'alex.river@example.com',
  })
  // Default selected activities including Surfing & Cycling from prompt
  const [userActivities, setUserActivities] = useState<string[]>([
    'surfing',
    'cycling',
  ])
  const [unit, setUnit] = useState<'C' | 'F'>('C')

  // Auth Success Handler
  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData)
    setPhase('onboarding')
  }

  // Onboarding Complete Handler
  const handleOnboardingComplete = (selectedActivities: string[]) => {
    setUserActivities(selectedActivities)
    setPhase('main')
    setCurrentTab('home')
  }

  // Toggle Temperature Unit
  const handleToggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'))
  }

  // Sign out
  const handleSignOut = () => {
    setPhase('auth')
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />

      {/* Decorative Ambient Glass Glowing Orbs */}
      <View style={styles.ambientOrb1} />
      <View style={styles.ambientOrb2} />
      <View style={styles.ambientOrb3} />

      {/* App Stage Machine */}
      {phase === 'auth' && (
        <AuthScreen onSuccess={handleAuthSuccess} />
      )}

      {phase === 'onboarding' && (
        <OnboardingScreen
          userName={user.name}
          onComplete={handleOnboardingComplete}
        />
      )}

      {phase === 'main' && (
        <View style={styles.mainContainer}>
          {currentTab === 'home' && (
            <HomeScreen
              userActivities={userActivities}
              unit={unit}
              onOpenProfile={() => setCurrentTab('profile')}
            />
          )}

          {currentTab === 'alerts' && (
            <AlertsScreen
              userActivities={userActivities}
              unit={unit}
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
            />
          )}

          {/* Floating Icon-Only Bottom Bar on all main screens */}
          <BottomNavBar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            hasAlerts={true}
          />
        </View>
      )}
    </View>
  )
}
