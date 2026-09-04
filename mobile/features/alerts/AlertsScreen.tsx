import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import { AVAILABLE_ACTIVITIES } from '../../lib/activity-engine'
import { triggerLiveWeatherPush } from '../../lib/services/notification-service'
import { ThemeMode, themes } from '../../lib/theme'
import { styles } from './AlertsScreen.styles'

interface AlertsScreenProps {
  userActivities: string[]
  unit: 'C' | 'F'
  theme?: ThemeMode
}

export function AlertsScreen({
  userActivities,
  unit,
  theme = 'dark',
}: AlertsScreenProps) {
  const [isSendingPush, setIsSendingPush] = useState(false)
  const [pushStatus, setPushStatus] = useState<string | null>(null)

  const colors = themes[theme]

  const activeActivities = AVAILABLE_ACTIVITIES.filter((a) =>
    userActivities.includes(a.id)
  )

  const handleTriggerPush = async () => {
    setIsSendingPush(true)
    setPushStatus(null)
    try {
      await triggerLiveWeatherPush(
        '🏄 Prime Surfing Window Active!',
        'Clean offshore wind (12 km/h) and moderate temperature. Ideal wave conditions right now!',
        'optimal'
      )
      setPushStatus('✓ Activity Window Notification Dispatched!')
      setTimeout(() => setPushStatus(null), 4000)
    } finally {
      setIsSendingPush(false)
    }
  }

  const handleTriggerEmergency = async () => {
    setIsSendingPush(true)
    setPushStatus(null)
    try {
      await triggerLiveWeatherPush(
        '🚨 URGENT TSUNAMI WARNING & EVACUATION',
        'Tsunami waves detected along coastal zones. Move inland to high ground immediately!',
        'emergency'
      )
      setPushStatus('🚨 Emergency Broadcast Dispatched!')
      setTimeout(() => setPushStatus(null), 4000)
    } finally {
      setIsSendingPush(false)
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mainCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.badge, { backgroundColor: colors.badgeBg, borderColor: colors.border }]}>
              <Text style={[styles.badgeText, { color: colors.accent }]}>Live Radar & Push Alerts</Text>
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Activity Windows & Alerts</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Optimized hourly forecast windows calculated for your chosen passions.
            </Text>
          </View>

          {/* Severe Advisory Banner */}
          <View style={[styles.alertBanner, { backgroundColor: colors.dangerBg, borderColor: colors.dangerBorder }]}>
            <Text style={styles.alertBannerIcon}>⚡</Text>
            <View style={styles.alertBannerContent}>
              <Text style={[styles.alertBannerTitle, { color: colors.danger }]}>
                Offshore Wind Peak at 2:00 PM
              </Text>
              <Text style={[styles.alertBannerDesc, { color: colors.textSecondary }]}>
                Wind gusts up to 24 km/h. Ideal for surfing & sailing; use caution if cycling along coastal ridges.
              </Text>
            </View>
          </View>

          {/* Trigger Push Alert Actions */}
          <View style={{ gap: 8, marginBottom: 18 }}>
            <Pressable
              onPress={handleTriggerPush}
              disabled={isSendingPush}
              style={[styles.pushTriggerBtn, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}
            >
              {isSendingPush ? (
                <ActivityIndicator size="small" color={colors.accent} />
              ) : (
                <>
                  <Text style={styles.pushTriggerIcon}>🔔</Text>
                  <Text style={[styles.pushTriggerText, { color: colors.textPrimary }]}>
                    {pushStatus || 'Test Activity Push Alert'}
                  </Text>
                </>
              )}
            </Pressable>

            <Pressable
              onPress={handleTriggerEmergency}
              disabled={isSendingPush}
              style={[styles.pushTriggerBtn, { backgroundColor: colors.danger }]}
            >
              <Text style={styles.pushTriggerIcon}>🚨</Text>
              <Text style={[styles.pushTriggerText, { color: '#FFFFFF' }]}>
                Test Emergency Tsunami Warning
              </Text>
            </Pressable>
          </View>

          {/* Activity Hourly Windows */}
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Optimal Activity Slots Today</Text>

          {activeActivities.map((act) => (
            <View
              key={act.id}
              style={[styles.activityWindowCard, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}
            >
              <View style={styles.actTopRow}>
                <View style={styles.actNameGroup}>
                  <Text style={styles.actIcon}>{act.icon}</Text>
                  <View>
                    <Text style={[styles.actName, { color: colors.textPrimary }]}>{act.name}</Text>
                    <Text style={[styles.actCategory, { color: colors.textMuted }]}>{act.category}</Text>
                  </View>
                </View>
                <View style={[styles.conditionTag, { backgroundColor: colors.successBg }]}>
                  <Text style={[styles.conditionTagText, { color: colors.success }]}>Prime 94%</Text>
                </View>
              </View>

              <View style={[styles.slotRow, { backgroundColor: colors.card }]}>
                <View style={styles.slotItem}>
                  <Text style={[styles.slotLabel, { color: colors.textMuted }]}>Best Window</Text>
                  <Text style={[styles.slotTime, { color: colors.accent }]}>08:30 AM - 11:45 AM</Text>
                </View>
                <View style={[styles.slotDivider, { backgroundColor: colors.border }]} />
                <View style={styles.slotItem}>
                  <Text style={[styles.slotLabel, { color: colors.textMuted }]}>Forecast Metric</Text>
                  <Text style={[styles.slotMetric, { color: colors.textPrimary }]}>22°C • 12 km/h</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Atmospheric Safety Gauges */}
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Environmental Indices</Text>

          <View style={styles.gaugesRow}>
            <View style={[styles.gaugeBox, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
              <Text style={styles.gaugeIcon}>☀️</Text>
              <Text style={[styles.gaugeVal, { color: colors.textPrimary }]}>UV 4 (Mod)</Text>
              <Text style={[styles.gaugeSub, { color: colors.textMuted }]}>SPF 30 advised</Text>
            </View>
            <View style={[styles.gaugeBox, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
              <Text style={styles.gaugeIcon}>🌿</Text>
              <Text style={[styles.gaugeVal, { color: colors.textPrimary }]}>AQI 32 (Clean)</Text>
              <Text style={[styles.gaugeSub, { color: colors.textMuted }]}>Pristine air</Text>
            </View>
            <View style={[styles.gaugeBox, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
              <Text style={styles.gaugeIcon}>🌊</Text>
              <Text style={[styles.gaugeVal, { color: colors.textPrimary }]}>Swell 1.8m</Text>
              <Text style={[styles.gaugeSub, { color: colors.textMuted }]}>12s period</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}
