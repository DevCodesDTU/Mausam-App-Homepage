import React from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native'
import { AVAILABLE_ACTIVITIES } from '../../lib/activity-engine'
import { ThemeMode, themes } from '../../lib/theme'
import { styles } from './ProfileScreen.styles'

interface ProfileScreenProps {
  userName: string
  userEmail: string
  userActivities: string[]
  unit: 'C' | 'F'
  onToggleUnit: () => void
  onUpdateActivities: (activities: string[]) => void
  onResetToOnboarding: () => void
  onSignOut: () => void
  theme?: ThemeMode
  onToggleTheme?: () => void
}

export function ProfileScreen({
  userName,
  userEmail,
  userActivities,
  unit,
  onToggleUnit,
  onUpdateActivities,
  onResetToOnboarding,
  onSignOut,
  theme = 'dark',
  onToggleTheme,
}: ProfileScreenProps) {
  const colors = themes[theme]

  const toggleActivity = (id: string) => {
    if (userActivities.includes(id)) {
      if (userActivities.length > 1) {
        onUpdateActivities(userActivities.filter((item) => item !== id))
      }
    } else {
      onUpdateActivities([...userActivities, id])
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mainCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* User Profile Info */}
          <View style={styles.profileHeader}>
            <View style={[styles.avatarCircle, { borderColor: colors.accent, backgroundColor: colors.cardSecondary }]}>
              <Text style={[styles.avatarLetter, { color: colors.accent }]}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.profileName, { color: colors.textPrimary }]}>{userName}</Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{userEmail}</Text>
          </View>

          {/* Appearance / Theme Toggle */}
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Visual Appearance</Text>
          <View style={[styles.unitSwitcher, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
            <Pressable
              onPress={() => theme !== 'dark' && onToggleTheme && onToggleTheme()}
              style={[
                styles.unitBtn,
                theme === 'dark' && { backgroundColor: colors.card, borderColor: colors.accent, borderWidth: 1 },
              ]}
            >
              <Text
                style={[
                  styles.unitBtnText,
                  { color: colors.textMuted },
                  theme === 'dark' && { color: colors.accent, fontWeight: '800' },
                ]}
              >
                Dark (Midnight) 🌙
              </Text>
            </Pressable>

            <Pressable
              onPress={() => theme !== 'light' && onToggleTheme && onToggleTheme()}
              style={[
                styles.unitBtn,
                theme === 'light' && { backgroundColor: colors.card, borderColor: colors.accent, borderWidth: 1 },
              ]}
            >
              <Text
                style={[
                  styles.unitBtnText,
                  { color: colors.textMuted },
                  theme === 'light' && { color: colors.accent, fontWeight: '800' },
                ]}
              >
                Light (Daylight) ☀️
              </Text>
            </Pressable>
          </View>

          {/* Temperature Unit Preference */}
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Temperature Metric</Text>
          <View style={[styles.unitSwitcher, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
            <Pressable
              onPress={() => unit !== 'C' && onToggleUnit()}
              style={[
                styles.unitBtn,
                unit === 'C' && { backgroundColor: colors.card, borderColor: colors.accent, borderWidth: 1 },
              ]}
            >
              <Text
                style={[
                  styles.unitBtnText,
                  { color: colors.textMuted },
                  unit === 'C' && { color: colors.accent, fontWeight: '800' },
                ]}
              >
                Celsius (°C)
              </Text>
            </Pressable>

            <Pressable
              onPress={() => unit !== 'F' && onToggleUnit()}
              style={[
                styles.unitBtn,
                unit === 'F' && { backgroundColor: colors.card, borderColor: colors.accent, borderWidth: 1 },
              ]}
            >
              <Text
                style={[
                  styles.unitBtnText,
                  { color: colors.textMuted },
                  unit === 'F' && { color: colors.accent, fontWeight: '800' },
                ]}
              >
                Fahrenheit (°F)
              </Text>
            </Pressable>
          </View>

          {/* User Activities Toggle */}
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Active Passions & Sports</Text>
          <View style={styles.activitiesGrid}>
            {AVAILABLE_ACTIVITIES.map((act) => {
              const isActive = userActivities.includes(act.id)
              return (
                <Pressable
                  key={act.id}
                  onPress={() => toggleActivity(act.id)}
                  style={[
                    styles.activityTag,
                    { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                    isActive && { backgroundColor: colors.accentBg, borderColor: colors.accent },
                  ]}
                >
                  <Text style={styles.activityTagIcon}>{act.icon}</Text>
                  <Text
                    style={[
                      styles.activityTagName,
                      { color: colors.textSecondary },
                      isActive && { color: colors.textPrimary, fontWeight: '800' },
                    ]}
                  >
                    {act.name}
                  </Text>
                </Pressable>
              )
            })}
          </View>

          {/* Quick Actions */}
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Preferences & Account</Text>
          <Pressable
            onPress={onResetToOnboarding}
            style={[styles.actionItem, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}
          >
            <View style={styles.actionItemLeft}>
              <Text style={styles.actionIcon}>🎯</Text>
              <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Change Onboarding Activities</Text>
            </View>
            <Text style={[styles.actionChevron, { color: colors.textMuted }]}>→</Text>
          </Pressable>

          <Pressable
            onPress={onSignOut}
            style={[styles.signOutBtn, { backgroundColor: colors.dangerBg, borderColor: colors.dangerBorder }]}
          >
            <Text style={[styles.signOutText, { color: colors.danger }]}>Sign Out of Mausam</Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}
