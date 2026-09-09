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
import { ACTIVITY_GROUPS, ActivityGroup, Activity } from '../../lib/activity-engine'
import { ThemeMode, themes } from '../../lib/theme'
import { styles } from './OnboardingScreen.styles'

interface OnboardingScreenProps {
  userName: string
  initialActivities?: string[]
  onComplete: (selectedActivityIds: string[]) => void
  theme?: ThemeMode
  onBack?: () => void
  isEditing?: boolean
}

export function OnboardingScreen({
  userName,
  initialActivities = ['swimming', 'surfboarding', 'cycling'],
  onComplete,
  theme = 'dark',
  onBack,
  isEditing = false,
}: OnboardingScreenProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialActivities)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroupIds, setExpandedGroupIds] = useState<string[]>(['sea_sports', 'cardio_endurance'])
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

  // Filter groups and activities by search query
  const filteredGroups = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return ACTIVITY_GROUPS

    return ACTIVITY_GROUPS.map((group) => {
      const groupMatches =
        group.name.toLowerCase().includes(q) ||
        group.description.toLowerCase().includes(q)

      const matchingActivities = group.activities.filter(
        (act) =>
          act.name.toLowerCase().includes(q) ||
          act.description.toLowerCase().includes(q) ||
          act.category.toLowerCase().includes(q)
      )

      if (groupMatches) {
        return group
      }

      if (matchingActivities.length > 0) {
        return {
          ...group,
          activities: matchingActivities,
        }
      }

      return null
    }).filter(Boolean) as ActivityGroup[]
  }, [searchQuery])

  // Auto-expand groups when user is searching
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setExpandedGroupIds(filteredGroups.map((g) => g.id))
    }
  }, [searchQuery, filteredGroups])

  const toggleGroupExpand = (groupId: string) => {
    setExpandedGroupIds((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }

  const toggleActivity = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleSelectAllInGroup = (group: ActivityGroup) => {
    const groupActIds = group.activities.map((a) => a.id)
    const allSelected = groupActIds.every((id) => selectedIds.includes(id))

    if (allSelected) {
      const groupSet = new Set(groupActIds)
      setSelectedIds((prev) => prev.filter((id) => !groupSet.has(id)))
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...groupActIds])))
    }
  }

  const handleContinue = () => {
    const finalSelection = selectedIds.length > 0 ? selectedIds : ['swimming', 'surfboarding', 'cycling']
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View style={[styles.stepBadge, { backgroundColor: colors.badgeBg, borderColor: colors.border, marginBottom: 0 }]}>
                <Text style={[styles.stepBadgeText, { color: colors.accent }]}>
                  {isEditing ? 'Settings • Edit Activities' : 'Step 1 of 2 • Activities & Sports'}
                </Text>
              </View>

              {isEditing && onBack && (
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
              {isEditing ? 'Update Your Passions' : 'Choose Your Outdoor Passions'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {isEditing
                ? 'Select or deselect activities to tailor your weather forecast recommendations.'
                : 'Grouped by terrain and climate. Tap a category to view and select individual activities.'}
            </Text>
          </View>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search sports (e.g. scuba, surf, cycling, yoga)..."
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

          {/* Groups List (Dropdown Accordion) */}
          <View style={styles.groupsList}>
            {filteredGroups.length === 0 ? (
              <View style={[styles.emptyBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No activities found matching "{searchQuery}"
                </Text>
              </View>
            ) : (
              filteredGroups.map((group) => {
                const isExpanded = expandedGroupIds.includes(group.id)
                const selectedInGroup = group.activities.filter((a) => selectedIds.includes(a.id)).length
                const allSelected = group.activities.length > 0 && selectedInGroup === group.activities.length

                return (
                  <View
                    key={group.id}
                    style={[
                      styles.groupCard,
                      {
                        backgroundColor: colors.card,
                        borderColor: selectedInGroup > 0 ? colors.accent : colors.border,
                      },
                    ]}
                  >
                    {/* Accordion Group Header */}
                    <Pressable
                      onPress={() => toggleGroupExpand(group.id)}
                      style={styles.groupHeader}
                      hitSlop={6}
                    >
                      <View style={styles.groupHeaderLeft}>
                        <View
                          style={[
                            styles.groupIconWrap,
                            {
                              backgroundColor: selectedInGroup > 0 ? colors.accentBg : colors.cardSecondary,
                            },
                          ]}
                        >
                          <Text style={styles.groupIcon}>{group.icon}</Text>
                        </View>

                        <View style={styles.groupHeaderText}>
                          <View style={styles.groupTitleRow}>
                            <Text style={[styles.groupTitle, { color: colors.textPrimary }]}>
                              {group.name}
                            </Text>
                          </View>
                          <Text
                            style={[styles.groupSubtitle, { color: colors.textSecondary }]}
                            numberOfLines={1}
                          >
                            {group.description}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.groupHeaderRight}>
                        {selectedInGroup > 0 && (
                          <View
                            style={[
                              styles.groupCountBadge,
                              { backgroundColor: colors.accentBg, borderColor: colors.accent },
                            ]}
                          >
                            <Text style={[styles.groupCountText, { color: colors.accent }]}>
                              {selectedInGroup}/{group.activities.length}
                            </Text>
                          </View>
                        )}
                        <Text style={[styles.chevronIcon, { color: colors.textMuted }]}>
                          {isExpanded ? '▲' : '▼'}
                        </Text>
                      </View>
                    </Pressable>

                    {/* Accordion Dropdown Content */}
                    {isExpanded && (
                      <View style={[styles.groupContent, { borderTopColor: colors.border }]}>
                        {/* Quick Selection Toolbar */}
                        <View style={styles.groupQuickBar}>
                          <Text style={[styles.groupQuickLabel, { color: colors.textMuted }]}>
                            {group.activities.length} Available Sports
                          </Text>
                          <Pressable
                            onPress={() => toggleSelectAllInGroup(group)}
                            hitSlop={8}
                          >
                            <Text style={[styles.groupQuickActionText, { color: colors.accent }]}>
                              {allSelected ? 'Clear All' : 'Select All'}
                            </Text>
                          </Pressable>
                        </View>

                        {/* 2 Sub-Activities per Row Inside Dropdown */}
                        <View style={styles.grid}>
                          {Array.from({ length: Math.ceil(group.activities.length / 2) }, (_, i) =>
                            group.activities.slice(i * 2, i * 2 + 2)
                          ).map((pair, rowIndex) => (
                            <View key={`row-${rowIndex}`} style={styles.pairRow}>
                              {pair.map((activity: Activity) => {
                                const isSelected = selectedIds.includes(activity.id)

                                return (
                                  <Pressable
                                    key={activity.id}
                                    onPress={() => toggleActivity(activity.id)}
                                    style={[
                                      styles.activityCard,
                                      {
                                        backgroundColor: colors.cardSecondary,
                                        borderColor: isSelected ? colors.accent : colors.border,
                                      },
                                      isSelected && { backgroundColor: colors.accentBg },
                                    ]}
                                  >
                                    <View style={styles.cardTopRow}>
                                      <View
                                        style={[
                                          styles.iconBox,
                                          {
                                            backgroundColor: isSelected ? colors.card : colors.cardSecondary,
                                          },
                                        ]}
                                      >
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
                                      <Text
                                        style={[
                                          styles.activityName,
                                          { color: colors.textPrimary },
                                          isSelected && { fontWeight: '900' },
                                        ]}
                                        numberOfLines={1}
                                      >
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
                              })}
                              {pair.length === 1 && <View style={styles.activityCardPlaceholder} />}
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                )
              })
            )}
          </View>

          {/* Submit Action: Proceed to Health Screen or Save & Return */}
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
              {isEditing
                ? `Save Activities (${selectedIds.length} Selected) ✓`
                : `Proceed to Health Profile (${selectedIds.length} Selected) →`}
            </Text>
          </Pressable>

          {isEditing && onBack && (
            <Pressable
              onPress={onBack}
              style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Text style={[styles.backBtnText, { color: colors.textSecondary }]}>
                ← Cancel Without Saving
              </Text>
            </Pressable>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

