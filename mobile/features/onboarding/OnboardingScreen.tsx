import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native'
import { AVAILABLE_ACTIVITIES, Activity } from '../../lib/activity-engine'
import { ThemeMode, themes } from '../../lib/theme'
import { styles } from './OnboardingScreen.styles'

interface OnboardingScreenProps {
  userName: string
  onComplete: (selectedActivityIds: string[]) => void
  theme?: ThemeMode
}

export function OnboardingScreen({
  userName,
  onComplete,
  theme = 'dark',
}: OnboardingScreenProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['surfing', 'cycling'])
  const colors = themes[theme]

  const toggleActivity = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleContinue = () => {
    const finalSelection = selectedIds.length > 0 ? selectedIds : ['surfing', 'cycling']
    onComplete(finalSelection)
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.stepBadge, { backgroundColor: colors.badgeBg, borderColor: colors.border }]}>
              <Text style={[styles.stepBadgeText, { color: colors.accent }]}>Passions & Sports</Text>
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Choose Your Outdoor Activities
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Mausam continuously evaluates wind, swell, UV, and temperatures to suggest peak performance windows.
            </Text>
          </View>

          {/* Activities Grid */}
          <View style={styles.grid}>
            {AVAILABLE_ACTIVITIES.map((activity: Activity) => {
              const isSelected = selectedIds.includes(activity.id)

              return (
                <Pressable
                  key={activity.id}
                  onPress={() => toggleActivity(activity.id)}
                  style={[
                    styles.activityCard,
                    { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                    isSelected && { borderColor: colors.accent, backgroundColor: colors.accentBg },
                  ]}
                >
                  <View style={[styles.iconBox, { backgroundColor: colors.card }]}>
                    <Text style={styles.activityIcon}>{activity.icon}</Text>
                  </View>

                  <View style={styles.activityInfo}>
                    <Text style={[styles.activityName, { color: colors.textPrimary }]}>{activity.name}</Text>
                    <Text style={[styles.activityDesc, { color: colors.textSecondary }]}>{activity.description}</Text>
                  </View>

                  <View
                    style={[
                      styles.checkCircle,
                      { borderColor: colors.border },
                      isSelected && { backgroundColor: colors.accent, borderColor: colors.accent },
                    ]}
                  >
                    {isSelected && <Text style={[styles.checkMark, { color: colors.card }]}>✓</Text>}
                  </View>
                </Pressable>
              )
            })}
          </View>

          {/* Continue Action */}
          <Pressable
            onPress={handleContinue}
            disabled={selectedIds.length === 0}
            style={[
              styles.submitBtn,
              { backgroundColor: colors.accent },
              selectedIds.length === 0 && styles.submitBtnDisabled,
            ]}
          >
            <Text style={styles.submitBtnText}>
              Launch Atmospheric Horizon ({selectedIds.length} chosen) →
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
