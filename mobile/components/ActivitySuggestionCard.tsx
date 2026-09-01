import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { ActivitySuggestionResult } from '../lib/activity-engine'
import { styles } from './ActivitySuggestionCard.styles'

interface ActivitySuggestionCardProps {
  primarySuggestion: ActivitySuggestionResult
  allSuggestions?: ActivitySuggestionResult[]
  onOpenActivities?: () => void
}

export function ActivitySuggestionCard({
  primarySuggestion,
  allSuggestions = [],
  onOpenActivities,
}: ActivitySuggestionCardProps) {
  return (
    <View style={styles.container}>
      {/* Top Banner Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerIcon}>⚡</Text>
          <Text style={styles.headerTitle}>Weather Activity Intelligence</Text>
        </View>
        <View style={styles.matchBadge}>
          <Text style={styles.matchBadgeText}>
            {primarySuggestion.suitabilityScore}% Match
          </Text>
        </View>
      </View>

      {/* Main Suggestion Banner */}
      <View style={styles.mainSuggestionBox}>
        <View style={styles.iconCircle}>
          <Text style={styles.activityBigIcon}>{primarySuggestion.activityIcon}</Text>
        </View>

        <View style={styles.textColumn}>
          <Text style={styles.suggestionHeadline}>
            {primarySuggestion.title}
          </Text>
          <Text style={styles.suggestionSub}>
            {primarySuggestion.subtitle}
          </Text>
        </View>
      </View>

      {/* Other Selected Activities Strip */}
      {allSuggestions.length > 1 && (
        <View style={styles.otherActivitiesSection}>
          <Text style={styles.otherTitle}>Your other activities today:</Text>
          <View style={styles.otherPillsRow}>
            {allSuggestions.slice(1, 4).map((item) => (
              <View key={item.activityId} style={styles.miniPill}>
                <Text style={styles.miniIcon}>{item.activityIcon}</Text>
                <Text style={styles.miniName}>{item.activityName}</Text>
                <Text
                  style={[
                    styles.miniScore,
                    item.suitabilityScore >= 70 ? styles.scoreGood : styles.scoreFair,
                  ]}
                >
                  {item.suitabilityScore}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Footer Action */}
      {onOpenActivities && (
        <Pressable onPress={onOpenActivities} style={styles.manageLink}>
          <Text style={styles.manageLinkText}>Customize Activities & Alerts →</Text>
        </Pressable>
      )}
    </View>
  )
}
