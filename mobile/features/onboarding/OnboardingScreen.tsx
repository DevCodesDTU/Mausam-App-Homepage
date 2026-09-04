import React, { useState, useMemo, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
  Animated,
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
  const [searchQuery, setSearchQuery] = useState('')
  const colors = themes[theme]

  const onboardFadeAnim = useRef(new Animated.Value(0)).current
  const onboardSlideAnim = useRef(new Animated.Value(14)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(onboardFadeAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(onboardSlideAnim, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return AVAILABLE_ACTIVITIES
    const q = searchQuery.toLowerCase().trim()
    return AVAILABLE_ACTIVITIES.filter(
      (act) =>
        act.name.toLowerCase().includes(q) ||
        act.category.toLowerCase().includes(q) ||
        act.description.toLowerCase().includes(q)
    )
  }, [searchQuery])

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
        <Animated.View style={[styles.container, { opacity: onboardFadeAnim, transform: [{ translateY: onboardSlideAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.stepBadge, { backgroundColor: colors.badgeBg, borderColor: colors.border }]}>
              <Text style={[styles.stepBadgeText, { color: colors.accent }]}>Preferences & Motion</Text>
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Select Your Outdoor Activities
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Choose sports to personalize forecast scoring, wind telemetry, and prime activity hours.
            </Text>
          </View>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search activities (e.g. surf, cycling, trail)..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery('')}
                style={styles.clearBtn}
                hitSlop={8}
              >
                <Text style={[styles.clearBtnText, { color: colors.textMuted }]}>✕</Text>
              </Pressable>
            )}
          </View>

          {/* 2-Cards-Per-Line Grid */}
          <View style={styles.grid}>
            {filteredActivities.length === 0 ? (
              <View style={[styles.emptyBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No activities match "{searchQuery}"
                </Text>
              </View>
            ) : (
              filteredActivities.map((activity: Activity) => {
                const isSelected = selectedIds.includes(activity.id)

                return (
                  <Pressable
                    key={activity.id}
                    onPress={() => toggleActivity(activity.id)}
                    style={[
                      styles.activityCard,
                      { backgroundColor: colors.card, borderColor: colors.border },
                      isSelected && { borderColor: colors.accent, backgroundColor: colors.accentBg },
                    ]}
                  >
                    <View style={styles.cardTopRow}>
                      <View style={[styles.iconBox, { backgroundColor: colors.cardSecondary }]}>
                        <Text style={styles.activityIcon}>{activity.icon}</Text>
                      </View>

                      <View
                        style={[
                          styles.checkCircle,
                          { borderColor: colors.border },
                          isSelected && { backgroundColor: colors.accent, borderColor: colors.accent },
                        ]}
                      >
                        {isSelected && <Text style={[styles.checkMark, { color: '#FFFFFF' }]}>✓</Text>}
                      </View>
                    </View>

                    <View style={styles.activityInfo}>
                      <Text style={[styles.activityName, { color: colors.textPrimary }]}>
                        {activity.name}
                      </Text>
                      <Text
                        style={[styles.activityDesc, { color: colors.textSecondary }]}
                        numberOfLines={2}
                      >
                        {activity.description}
                      </Text>
                    </View>
                  </Pressable>
                )
              })
            )}
          </View>

          {/* Submit Action */}
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
              Confirm Preferences ({selectedIds.length} Selected)
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}
