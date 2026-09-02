import React from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native'
import { GlassCard } from '../../components/GlassCard'
import { AVAILABLE_ACTIVITIES, Activity } from '../../lib/activity-engine'
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
}: ProfileScreenProps) {
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.mainCard}>
          {/* User Profile Info */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
          </View>

          {/* Settings Group: Temperature Unit */}
          <View style={styles.settingCard}>
            <View style={styles.settingTextCol}>
              <Text style={styles.settingTitle}>Temperature Unit</Text>
              <Text style={styles.settingSub}>Select Celsius or Fahrenheit</Text>
            </View>

            <Pressable onPress={onToggleUnit} style={styles.unitTogglePill}>
              <View style={[styles.unitHalf, unit === 'C' && styles.unitHalfActive]}>
                <Text style={[styles.unitText, unit === 'C' && styles.unitTextActive]}>
                  °C
                </Text>
              </View>
              <View style={[styles.unitHalf, unit === 'F' && styles.unitHalfActive]}>
                <Text style={[styles.unitText, unit === 'F' && styles.unitTextActive]}>
                  °F
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Activities Manager */}
          <View style={styles.activitiesHeaderRow}>
            <Text style={styles.sectionTitle}>My Outdoor Passions</Text>
            <Text style={styles.sectionCount}>
              {userActivities.length} active
            </Text>
          </View>
          <Text style={styles.sectionSub}>
            Tap to enable or disable activity recommendations on your weather feed:
          </Text>

          <View style={styles.activitiesGrid}>
            {AVAILABLE_ACTIVITIES.map((act: Activity) => {
              const isSelected = userActivities.includes(act.id)

              return (
                <Pressable
                  key={act.id}
                  onPress={() => toggleActivity(act.id)}
                  style={[
                    styles.activityTogglePill,
                    isSelected ? styles.pillSelected : styles.pillUnselected,
                  ]}
                >
                  <Text style={styles.actIcon}>{act.icon}</Text>
                  <Text
                    style={[
                      styles.actName,
                      isSelected ? styles.actNameSelected : styles.actNameUnselected,
                    ]}
                  >
                    {act.name}
                  </Text>
                  {isSelected && <Text style={styles.pillCheck}>✓</Text>}
                </Pressable>
              )
            })}
          </View>

          {/* Action Links */}
          <View style={styles.actionsList}>
            <Pressable
              onPress={onResetToOnboarding}
              style={styles.actionBtnSecondary}
            >
              <Text style={styles.actionSecondaryText}>
                🔄 Restart Activity Onboarding
              </Text>
            </Pressable>

            <Pressable onPress={onSignOut} style={styles.signOutBtn}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
          </View>
        </GlassCard>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}
