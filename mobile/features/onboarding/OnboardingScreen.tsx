import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native'
import { GlassCard } from '../../components/GlassCard'
import { AVAILABLE_ACTIVITIES, Activity } from '../../lib/activity-engine'
import { styles } from './OnboardingScreen.styles'

interface OnboardingScreenProps {
  userName: string
  onComplete: (selectedActivityIds: string[]) => void
}

export function OnboardingScreen({ userName, onComplete }: OnboardingScreenProps) {
  // Pre-select Surfing and Cycling by default as requested in prompt!
  const [selectedIds, setSelectedIds] = useState<string[]>(['surfing', 'cycling'])

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 2 of 2 • Preferences</Text>
            </View>
            <Text style={styles.title}>
              What activities do you love, {userName.split(' ')[0]}?
            </Text>
            <Text style={styles.subtitle}>
              Mausam uses live weather & wind conditions to suggest the best times for your favorite outdoor passions.
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
                    isSelected ? styles.cardSelected : styles.cardUnselected,
                  ]}
                >
                  <View style={styles.iconCircle}>
                    <Text style={styles.activityIcon}>{activity.icon}</Text>
                  </View>
                  <Text
                    style={[
                      styles.activityName,
                      isSelected ? styles.textSelected : styles.textUnselected,
                    ]}
                  >
                    {activity.name}
                  </Text>
                  <Text
                    style={[
                      styles.activityCategory,
                      isSelected ? styles.categorySelected : styles.categoryUnselected,
                    ]}
                    numberOfLines={1}
                  >
                    {activity.category}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </Pressable>
              )
            })}
          </View>

          {/* Selection counter & Continue Action */}
          <View style={styles.footer}>
            <Text style={styles.counterText}>
              {selectedIds.length} {selectedIds.length === 1 ? 'activity' : 'activities'} selected
            </Text>

            <Pressable
              onPress={handleContinue}
              style={({ pressed }) => [
                styles.continueBtn,
                pressed && styles.btnPressed,
              ]}
            >
              <Text style={styles.continueBtnText}>
                See Weather & Suggestions →
              </Text>
            </Pressable>
          </View>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  )
}
