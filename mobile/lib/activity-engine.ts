import activityRulesData from '../constants/activity-rules.json'
import activitiesData from '../constants/activities.json'

export interface Activity {
  id: string
  name: string
  icon: string
  category: string
  description: string
}

export interface ActivityGroup {
  id: string
  name: string
  icon: string
  description: string
  activities: Activity[]
}

export interface ActivityRule {
  activityId: string
  conditions: string[]
  minTemp: number
  maxTemp: number
  maxPrecipitation: number
  minWind?: number
  maxWind?: number
  title: string
  subtitle: string
  badge: string
  sentiment: 'positive' | 'cozy' | 'neutral' | 'warning'
}

export interface WeatherConditionSummary {
  temp: number
  condition: string
  precipitation: number // 0-100%
  windSpeed: number // km/h
  humidity: number
}

export interface ActivitySuggestionResult {
  activityId: string
  activityName: string
  activityIcon: string
  title: string
  subtitle: string
  badge: string
  sentiment: 'positive' | 'cozy' | 'neutral' | 'warning'
  suitabilityScore: number // 0-100%
  isRecommended: boolean
}

export const ACTIVITY_GROUPS: ActivityGroup[] = (activitiesData?.groups || []) as ActivityGroup[]

// Flattened list of all activities across groups for backwards compatibility
export const AVAILABLE_ACTIVITIES: Activity[] =
  ACTIVITY_GROUPS.length > 0
    ? ACTIVITY_GROUPS.flatMap((g) => g.activities)
    : activityRulesData.activities

export const ACTIVITY_RULES: ActivityRule[] =
  ((activitiesData as any)?.rules || activityRulesData.rules) as ActivityRule[]

export const FALLBACK_SUGGESTIONS = activityRulesData.fallbacks

/**
 * Calculates suitability and generates smart activity suggestions
 * based on user's chosen activities and current weather telemetry.
 */
export function getSmartActivitySuggestion(
  userActivityIds: string[],
  weather: WeatherConditionSummary
): {
  primary: ActivitySuggestionResult
  allSuggestions: ActivitySuggestionResult[]
} {
  const activeIds =
    userActivityIds.length > 0
      ? userActivityIds
      : ['surfing', 'cycling', 'running', 'hiking', 'yoga']

  const calculatedSuggestions: ActivitySuggestionResult[] = []

  for (const actId of activeIds) {
    const activityMeta = AVAILABLE_ACTIVITIES.find((a) => a.id === actId)
    if (!activityMeta) continue

    const matchingRule = ACTIVITY_RULES.find((r) => r.activityId === actId)
    if (!matchingRule) continue

    // Calculate condition matching
    const conditionMatches = matchingRule.conditions.some(
      (c) =>
        weather.condition.toLowerCase().includes(c.toLowerCase()) ||
        c.toLowerCase().includes(weather.condition.toLowerCase())
    )

    // Calculate temperature match
    const tempMatches =
      weather.temp >= matchingRule.minTemp && weather.temp <= matchingRule.maxTemp

    // Calculate precipitation match
    const precipMatches = weather.precipitation <= matchingRule.maxPrecipitation

    // Calculate wind match
    const minWind = matchingRule.minWind ?? 0
    const maxWind = matchingRule.maxWind ?? 999
    const windMatches = weather.windSpeed >= minWind && weather.windSpeed <= maxWind

    // Score calculation
    let score = 50
    if (conditionMatches) score += 25
    if (tempMatches) score += 15
    if (precipMatches) score += 10
    if (windMatches) score += 10
    if (weather.precipitation > 40 && matchingRule.activityId !== 'yoga') score -= 30

    score = Math.min(100, Math.max(10, score))
    const isRecommended = score >= 70

    calculatedSuggestions.push({
      activityId: activityMeta.id,
      activityName: activityMeta.name,
      activityIcon: activityMeta.icon,
      title: matchingRule.title,
      subtitle: matchingRule.subtitle,
      badge: matchingRule.badge,
      sentiment: isRecommended ? matchingRule.sentiment : 'neutral',
      suitabilityScore: score,
      isRecommended,
    })
  }

  // Sort by highest suitability score
  calculatedSuggestions.sort((a, b) => b.suitabilityScore - a.suitabilityScore)

  const topMatch = calculatedSuggestions[0]

  if (topMatch && topMatch.suitabilityScore >= 60) {
    return {
      primary: topMatch,
      allSuggestions: calculatedSuggestions,
    }
  }

  // Fallback if bad weather
  const isRain =
    weather.condition.toLowerCase().includes('rain') || weather.precipitation >= 50
  const fallbackInfo = isRain ? FALLBACK_SUGGESTIONS.rainy : FALLBACK_SUGGESTIONS.default

  const primaryFallback: ActivitySuggestionResult = {
    activityId: 'general',
    activityName: 'Outdoor Planning',
    activityIcon: isRain ? '🧘' : '🌤️',
    title: fallbackInfo.title,
    subtitle: fallbackInfo.subtitle,
    badge: fallbackInfo.badge,
    sentiment: fallbackInfo.sentiment as any,
    suitabilityScore: isRain ? 85 : 75,
    isRecommended: true,
  }

  return {
    primary: primaryFallback,
    allSuggestions: calculatedSuggestions.length > 0 ? calculatedSuggestions : [primaryFallback],
  }
}

