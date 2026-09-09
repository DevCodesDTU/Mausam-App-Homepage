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
import healthData from '../../constants/health_conditions_sensitivities.json'
import { ThemeMode, themes } from '../../lib/theme'
import { styles } from './HealthConditionsScreen.styles'

export interface HealthCondition {
  id: string
  name: string
  icon: string
  category: string
  description: string
  weatherTriggers: string
  severity?: string
}

interface HealthConditionsScreenProps {
  userName: string
  initialConditions?: string[]
  onComplete: (selectedConditions: string[]) => void
  onBack: () => void
  theme?: ThemeMode
  isEditing?: boolean
}

export const HEALTH_CONDITIONS: HealthCondition[] = healthData.conditions as HealthCondition[]

export function HealthConditionsScreen({
  userName,
  initialConditions = ['none'],
  onComplete,
  onBack,
  theme = 'dark',
  isEditing = false,
}: HealthConditionsScreenProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialConditions)
  const [searchQuery, setSearchQuery] = useState('')
  const colors = themes[theme]

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(14)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const filteredConditions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return HEALTH_CONDITIONS

    return HEALTH_CONDITIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.weatherTriggers.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const toggleCondition = (id: string) => {
    if (id === 'none') {
      setSelectedIds(['none'])
      return
    }

    setSelectedIds((prev) => {
      const withoutNone = prev.filter((item) => item !== 'none')
      if (withoutNone.includes(id)) {
        const remaining = withoutNone.filter((item) => item !== id)
        return remaining.length === 0 ? ['none'] : remaining
      } else {
        return [...withoutNone, id]
      }
    })
  }

  const handleFinish = () => {
    const finalConditions = selectedIds.length > 0 ? selectedIds : ['none']
    onComplete(finalConditions)
  }

  const selectedCount = selectedIds.includes('none') ? 0 : selectedIds.length

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View style={[styles.stepBadge, { backgroundColor: colors.badgeBg, borderColor: colors.border, marginBottom: 0 }]}>
                <Text style={[styles.stepBadgeText, { color: colors.accent }]}>
                  {isEditing ? 'Settings • Health Profile' : 'Step 2 of 2 • Health Safeguards'}
                </Text>
              </View>

              {isEditing && (
                <Pressable
                  onPress={onBack}
                  hitSlop={8}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 12,
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textSecondary }}>
                    ✕ Cancel
                  </Text>
                </Pressable>
              )}
            </View>

            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {isEditing ? 'Edit Health & Sensitivities' : 'Environmental Health & Sensitivities'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {isEditing
                ? 'Update your environmental sensitivities to tailor air quality and severe weather warnings.'
                : 'Mausam calculates custom biometric warnings for high ozone, sudden barometric drops, PM2.5, and thermal stress.'}
            </Text>
          </View>

          {/* Privacy Guarantee Banner */}
          <View style={[styles.noticeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.noticeIcon}>🔒</Text>
            <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
              <Text style={{ fontWeight: '800', color: colors.textPrimary }}>On-Device Privacy: </Text>
              Your health preferences remain encrypted on your device and are never sold or synced to marketing brokers.
            </Text>
          </View>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search conditions (e.g. asthma, allergies, heat, migraine)..."
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

          {/* Conditions List */}
          <View style={styles.conditionsList}>
            {filteredConditions.length === 0 ? (
              <View style={[styles.emptyBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No health conditions found matching "{searchQuery}"
                </Text>
              </View>
            ) : (
              filteredConditions.map((condition) => {
                const isSelected = selectedIds.includes(condition.id)

                return (
                  <Pressable
                    key={condition.id}
                    onPress={() => toggleCondition(condition.id)}
                    style={[
                      styles.conditionCard,
                      { backgroundColor: colors.card, borderColor: colors.border },
                      isSelected && { borderColor: colors.accent, backgroundColor: colors.accentBg },
                    ]}
                  >
                    <View style={styles.cardMainRow}>
                      <View style={styles.cardLeft}>
                        <View
                          style={[
                            styles.iconBox,
                            {
                              backgroundColor: isSelected ? colors.card : colors.cardSecondary,
                            },
                          ]}
                        >
                          <Text style={styles.conditionIcon}>{condition.icon}</Text>
                        </View>

                        <View style={styles.conditionInfo}>
                          <View style={styles.nameRow}>
                            <Text
                              style={[
                                styles.conditionName,
                                { color: colors.textPrimary },
                                isSelected && { fontWeight: '900' },
                              ]}
                            >
                              {condition.name}
                            </Text>
                            <View
                              style={[
                                styles.categoryPill,
                                {
                                  backgroundColor: colors.cardSecondary,
                                  borderColor: colors.border,
                                },
                              ]}
                            >
                              <Text style={[styles.categoryText, { color: colors.accent }]}>
                                {condition.category}
                              </Text>
                            </View>
                          </View>

                          <Text
                            style={[styles.conditionDesc, { color: colors.textSecondary }]}
                          >
                            {condition.description}
                          </Text>

                          {condition.weatherTriggers !== 'None' && (
                            <View
                              style={[
                                styles.triggerBadge,
                                { backgroundColor: colors.cardSecondary },
                              ]}
                            >
                              <Text style={styles.triggerIcon}>⚠️</Text>
                              <Text style={[styles.triggerText, { color: colors.textMuted }]}>
                                {condition.weatherTriggers}
                              </Text>
                            </View>
                          )}
                        </View>
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
                  </Pressable>
                )
              })
            )}
          </View>

          {/* Actions */}
          <View style={styles.actionArea}>
            <Pressable
              onPress={handleFinish}
              style={[styles.submitBtn, { backgroundColor: colors.accent }]}
            >
              <Text style={styles.submitBtnText}>
                {isEditing
                  ? `Save Health Profile (${selectedCount > 0 ? `${selectedCount} Active` : 'Optimal Health'}) ✓`
                  : selectedCount > 0
                  ? `Complete Setup (${selectedCount} Sensitivity Saved) →`
                  : 'Complete Setup & Launch Mausam →'}
              </Text>
            </Pressable>

            <Pressable
              onPress={onBack}
              style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
              hitSlop={8}
            >
              <Text style={[styles.backBtnText, { color: colors.textSecondary }]}>
                {isEditing ? '← Cancel & Return to Profile' : '← Back to Activity Selection'}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

