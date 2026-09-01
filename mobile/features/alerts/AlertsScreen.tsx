import React from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { GlassCard } from '../../components/GlassCard'
import { AVAILABLE_ACTIVITIES } from '../../lib/activity-engine'
import { styles } from './AlertsScreen.styles'

interface AlertsScreenProps {
  userActivities: string[]
  unit: 'C' | 'F'
}

export function AlertsScreen({ userActivities, unit }: AlertsScreenProps) {
  const activeActivities = AVAILABLE_ACTIVITIES.filter((a) =>
    userActivities.includes(a.id)
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.mainCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Live Radar & Timing</Text>
            </View>
            <Text style={styles.title}>Activity Windows & Alerts</Text>
            <Text style={styles.subtitle}>
              Optimized hourly forecast windows calculated for your chosen passions.
            </Text>
          </View>

          {/* Severe / Important Advisory Banner */}
          <View style={styles.alertBanner}>
            <Text style={styles.alertBannerIcon}>⚡</Text>
            <View style={styles.alertBannerContent}>
              <Text style={styles.alertBannerTitle}>
                Offshore Wind Peak at 2:00 PM
              </Text>
              <Text style={styles.alertBannerDesc}>
                Wind gusts up to 24 km/h. Ideal for surfing & sailing; use caution if cycling along coastal ridges.
              </Text>
            </View>
          </View>

          {/* Activity Hourly Windows */}
          <Text style={styles.sectionHeader}>Optimal Activity Slots Today</Text>

          {activeActivities.map((act) => (
            <View key={act.id} style={styles.activityWindowCard}>
              <View style={styles.actTopRow}>
                <View style={styles.actNameGroup}>
                  <Text style={styles.actIcon}>{act.icon}</Text>
                  <View>
                    <Text style={styles.actName}>{act.name}</Text>
                    <Text style={styles.actCategory}>{act.category}</Text>
                  </View>
                </View>
                <View style={styles.conditionTag}>
                  <Text style={styles.conditionTagText}>Prime 94%</Text>
                </View>
              </View>

              <View style={styles.slotRow}>
                <View style={styles.slotItem}>
                  <Text style={styles.slotLabel}>Best Window</Text>
                  <Text style={styles.slotTime}>08:30 AM - 11:45 AM</Text>
                </View>
                <View style={styles.slotDivider} />
                <View style={styles.slotItem}>
                  <Text style={styles.slotLabel}>Forecast Metric</Text>
                  <Text style={styles.slotMetric}>22°C • 12 km/h</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Atmospheric Safety Gauges */}
          <Text style={styles.sectionHeader}>Environmental Indices</Text>

          <View style={styles.gaugesRow}>
            <View style={styles.gaugeBox}>
              <Text style={styles.gaugeIcon}>☀️</Text>
              <Text style={styles.gaugeVal}>UV 4 (Mod)</Text>
              <Text style={styles.gaugeSub}>SPF 30 advised</Text>
            </View>
            <View style={styles.gaugeBox}>
              <Text style={styles.gaugeIcon}>🌿</Text>
              <Text style={styles.gaugeVal}>AQI 32 (Clean)</Text>
              <Text style={styles.gaugeSub}>Pristine air</Text>
            </View>
            <View style={styles.gaugeBox}>
              <Text style={styles.gaugeIcon}>🌊</Text>
              <Text style={styles.gaugeVal}>Swell 1.8m</Text>
              <Text style={styles.gaugeSub}>12s period</Text>
            </View>
          </View>
        </GlassCard>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}
