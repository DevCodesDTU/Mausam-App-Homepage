import React from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native'
import { AVAILABLE_ACTIVITIES, Activity } from '../../lib/activity-engine'
import healthData from '../../constants/health_conditions_sensitivities.json'
import { ThemeMode, themes } from '../../lib/theme'
import { styles } from './ProfileScreen.styles'

export interface HealthCondition {
  id: string
  name: string
  icon: string
  category: string
  description: string
  weatherTriggers: string
  severity?: string
}

const ALL_HEALTH_CONDITIONS: HealthCondition[] = (healthData?.conditions || []) as HealthCondition[]

interface ProfileScreenProps {
  userName?: string
  userEmail?: string
  userActivities?: string[]
  userHealthConditions?: string[]
  unit?: 'C' | 'F'
  onToggleUnit?: () => void
  onUpdateActivities?: (activities: string[]) => void
  onUpdateHealthConditions?: (conditions: string[]) => void
  onEditActivities?: () => void
  onEditHealthConditions?: () => void
  onResetToOnboarding?: () => void
  onSignOut?: () => void
  theme?: ThemeMode
  onToggleTheme?: () => void
}

export function ProfileScreen({
  userName = 'Alex River',
  userEmail = 'alex.river@example.com',
  userActivities = ['swimming', 'surfboarding', 'cycling'],
  userHealthConditions = ['none'],
  unit = 'C',
  onToggleUnit = () => {},
  onEditActivities = () => {},
  onEditHealthConditions = () => {},
  onResetToOnboarding = () => {},
  onSignOut = () => {},
  theme = 'dark',
  onToggleTheme,
}: ProfileScreenProps) {
  const colors = themes[theme]

  const safeActivities = Array.isArray(userActivities) && userActivities.length > 0
    ? userActivities
    : ['swimming', 'surfboarding', 'cycling']

  const safeHealthConditions = Array.isArray(userHealthConditions) && userHealthConditions.length > 0
    ? userHealthConditions
    : ['none']

  // Resolve user activity objects from library
  const activeActivityList: Activity[] = safeActivities.map((id) => {
    const found = (AVAILABLE_ACTIVITIES || []).find((a) => a.id === id)
    return (
      found || {
        id,
        name: id.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        icon: '🎯',
        category: 'Sports',
        description: '',
      }
    )
  })

  // Resolve user health conditions
  const isOptimalHealth =
    safeHealthConditions.length === 0 ||
    safeHealthConditions.includes('none')

  const activeHealthList: HealthCondition[] = isOptimalHealth
    ? []
    : ALL_HEALTH_CONDITIONS.filter((c) => safeHealthConditions.includes(c.id))

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Top Bar with Title and Theme Toggle */}
          <View style={styles.topHeaderBar}>
            <View>
              <Text style={[styles.screenHeaderTitle, { color: colors.textPrimary }]}>Profile</Text>
              <Text style={[styles.screenHeaderSubtitle, { color: colors.textMuted }]}>Account & Environmental Passions</Text>
            </View>

            {onToggleTheme && (
              <Pressable
                onPress={onToggleTheme}
                style={[styles.themeToggleBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                hitSlop={8}
              >
                <Text style={{ fontSize: 16 }}>{theme === 'dark' ? '☀️' : '🌙'}</Text>
              </Pressable>
            )}
          </View>

          {/* 1. Hero Card */}
          <View style={[styles.heroCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.heroHeaderRow}>
              <View style={styles.avatarContainer}>
                <View
                  style={[
                    styles.avatarCircle,
                    {
                      backgroundColor: colors.cardSecondary,
                      borderColor: colors.accent,
                    },
                  ]}
                >
                  <Text style={[styles.avatarLetter, { color: colors.accent }]}>
                    {(userName?.charAt(0) || 'M').toUpperCase()}
                  </Text>
                </View>
                <View
                  style={[
                    styles.avatarStatusBadge,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <Text style={styles.avatarStatusIcon}>🌤️</Text>
                </View>
              </View>

              <View style={styles.heroTextCol}>
                <Text style={[styles.profileName, { color: colors.textPrimary }]} numberOfLines={1}>
                  {userName}
                </Text>
                <Text style={[styles.profileEmail, { color: colors.textSecondary }]} numberOfLines={1}>
                  {userEmail}
                </Text>
                <View
                  style={[
                    styles.memberBadge,
                    { backgroundColor: colors.badgeBg, borderColor: colors.border },
                  ]}
                >
                  <Text style={[styles.memberBadgeText, { color: colors.accent }]}>
                    Mausam Explorer Member
                  </Text>
                </View>
              </View>
            </View>

            {/* Telemetry Overview Stats */}
            <View style={[styles.statsBar, { borderTopColor: colors.border }]}>
              {/* Stat 1: Activities */}
              <Pressable
                onPress={onEditActivities}
                style={[
                  styles.statCard,
                  { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                  {safeActivities.length}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  Sports
                </Text>
              </Pressable>

              {/* Stat 2: Health Sensitivities */}
              <Pressable
                onPress={onEditHealthConditions}
                style={[
                  styles.statCard,
                  { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.statValue,
                    { color: isOptimalHealth ? colors.success : colors.warning },
                  ]}
                >
                  {isOptimalHealth ? 'Optimal' : `${activeHealthList.length} Active`}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  Health
                </Text>
              </Pressable>

              {/* Stat 3: Unit */}
              <Pressable
                onPress={onToggleUnit}
                style={[
                  styles.statCard,
                  { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.statValue, { color: colors.accent }]}>
                  °{unit}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  {unit === 'C' ? 'Celsius' : 'Fahrenheit'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* 2. Active Passions & Sports Section */}
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleWrap}>
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                  Outdoor Passions
                </Text>
                <View
                  style={[
                    styles.countPill,
                    { backgroundColor: colors.accentBg, borderColor: colors.accent },
                  ]}
                >
                  <Text style={[styles.countPillText, { color: colors.accent }]}>
                    {safeActivities.length} Active
                  </Text>
                </View>
              </View>

              {/* Edit Activities Button -> Redirects to Onboarding Activities Page */}
              <Pressable
                onPress={onEditActivities}
                style={[
                  styles.editButton,
                  { backgroundColor: colors.cardSecondary, borderColor: colors.accent },
                ]}
                hitSlop={8}
              >
                <Text style={{ fontSize: 13 }}>✏️</Text>
                <Text style={[styles.editButtonText, { color: colors.accent }]}>
                  Edit Activities
                </Text>
              </Pressable>
            </View>

            {/* List of Active Activity Chips */}
            <View style={styles.chipGrid}>
              {activeActivityList.map((act) => (
                <Pressable
                  key={act.id}
                  onPress={onEditActivities}
                  style={[
                    styles.activityChip,
                    {
                      backgroundColor: colors.cardSecondary,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={styles.activityChipIcon}>{act.icon}</Text>
                  <Text style={[styles.activityChipText, { color: colors.textPrimary }]}>
                    {act.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* 3. Environmental Health & Sensitivities Section */}
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleWrap}>
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                  Health Safeguards
                </Text>
                <View
                  style={[
                    styles.countPill,
                    {
                      backgroundColor: isOptimalHealth ? colors.cardSecondary : colors.warningBg,
                      borderColor: isOptimalHealth ? colors.border : colors.warningBorder,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.countPillText,
                      { color: isOptimalHealth ? colors.textMuted : colors.warning },
                    ]}
                  >
                    {isOptimalHealth ? 'No Conditions' : `${activeHealthList.length} Tracked`}
                  </Text>
                </View>
              </View>

              {/* Edit Health Conditions Button -> Redirects to Health Conditions Page */}
              <Pressable
                onPress={onEditHealthConditions}
                style={[
                  styles.editButton,
                  { backgroundColor: colors.cardSecondary, borderColor: colors.accent },
                ]}
                hitSlop={8}
              >
                <Text style={{ fontSize: 13 }}>✏️</Text>
                <Text style={[styles.editButtonText, { color: colors.accent }]}>
                  Edit Health
                </Text>
              </Pressable>
            </View>

            {/* Active Health Conditions List */}
            {isOptimalHealth ? (
              <Pressable
                onPress={onEditHealthConditions}
                style={[
                  styles.healthCard,
                  { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                ]}
              >
                <View
                  style={[
                    styles.healthCardIconBox,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <Text style={styles.healthCardIcon}>✨</Text>
                </View>
                <View style={styles.healthCardInfo}>
                  <Text style={[styles.healthCardTitle, { color: colors.textPrimary }]}>
                    Optimal Health Profile
                  </Text>
                  <Text style={[styles.healthCardSub, { color: colors.textSecondary }]}>
                    No environmental allergies or respiratory sensitivities flagged. Tap to customize.
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: colors.textMuted }}>→</Text>
              </Pressable>
            ) : (
              <View style={styles.healthList}>
                {activeHealthList.map((cond) => (
                  <Pressable
                    key={cond.id}
                    onPress={onEditHealthConditions}
                    style={[
                      styles.healthCard,
                      { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                    ]}
                  >
                    <View
                      style={[
                        styles.healthCardIconBox,
                        { backgroundColor: colors.card, borderColor: colors.border },
                      ]}
                    >
                      <Text style={styles.healthCardIcon}>{cond.icon}</Text>
                    </View>
                    <View style={styles.healthCardInfo}>
                      <Text style={[styles.healthCardTitle, { color: colors.textPrimary }]}>
                        {cond.name}
                      </Text>
                      <Text style={[styles.healthCardSub, { color: colors.textSecondary }]} numberOfLines={1}>
                        {cond.description}
                      </Text>
                      {cond.weatherTriggers && cond.weatherTriggers !== 'None' && (
                        <View
                          style={[
                            styles.healthTriggerBadge,
                            { backgroundColor: colors.card },
                          ]}
                        >
                          <Text style={{ fontSize: 10 }}>⚠️</Text>
                          <Text style={[styles.healthTriggerText, { color: colors.textMuted }]}>
                            {cond.weatherTriggers}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ fontSize: 14, color: colors.textMuted }}>→</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Account Actions */}
          <View style={[styles.accountActionsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Pressable
              onPress={onResetToOnboarding}
              style={[styles.actionItem, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}
            >
              <View style={styles.actionItemLeft}>
                <Text style={styles.actionIcon}>🔄</Text>
                <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>
                  Reconfigure All Setup
                </Text>
              </View>
              <Text style={[styles.actionChevron, { color: colors.textMuted }]}>→</Text>
            </Pressable>

            <Pressable
              onPress={onSignOut}
              style={[styles.signOutBtn, { backgroundColor: colors.dangerBg, borderColor: colors.dangerBorder }]}
            >
              <Text style={[styles.signOutText, { color: colors.danger }]}>
                Sign Out of Mausam
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
