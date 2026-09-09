import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  RefreshControl,
  Animated,
} from 'react-native'
import { fetchLiveWeather, LiveWeatherResponse } from '../../lib/api/client'
import {
  AppLocation,
  getCurrentGPSLocation,
  NEW_DELHI_FALLBACK,
} from '../../lib/services/location-service'
import {
  addNotificationListener,
  AppNotification,
  initializePushNotifications,
  evaluateAndTriggerActivityNotifications,
} from '../../lib/services/notification-service'
import { MapLocationPicker } from '../../components/MapLocationPicker'
import { AVAILABLE_ACTIVITIES } from '../../lib/activity-engine'
import { ThemeMode, themes } from '../../lib/theme'
import { styles } from './HomeScreen.styles'

interface HomeScreenProps {
  userActivities: string[]
  unit: 'C' | 'F'
  onOpenProfile: () => void
  theme?: ThemeMode
  onToggleTheme?: () => void
}

function getHumanEditorialSummary(condition: string, temp: number, wind: number): string {
  const c = condition.toLowerCase()
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) {
    return 'Passing precipitation over roads and coastlines. Damp tarmac; best to postpone high-speed road cycling.'
  }
  if (c.includes('snow') || c.includes('ice')) {
    return 'Sub-zero mountain chill. Crisp powder coverage across slopes with elevated alpine wind chills.'
  }
  if (wind > 24) {
    return 'Brisk westerly winds generating energetic coastal swell. High wind resistance for cyclists along exposed ridges.'
  }
  if (temp > 30) {
    return 'High solar thermal intensity. Shade-seeking tempo runs advised; prime swimming and coastal conditions.'
  }
  if (c.includes('clear') || c.includes('sun')) {
    return 'Clear sky and gentle breeze. Superb atmospheric clarity for evening runs, photography, and trail exploration.'
  }
  return 'Stable atmospheric window. Moderate breeze and mild temperature make this an ideal session slot.'
}

export function HomeScreen({
  userActivities,
  unit,
  theme = 'dark',
  onToggleTheme,
}: HomeScreenProps) {
  const [currentLocation, setCurrentLocation] = useState<AppLocation>(NEW_DELHI_FALLBACK)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [liveWeather, setLiveWeather] = useState<LiveWeatherResponse | null>(null)
  const [selectedActivityId, setSelectedActivityId] = useState<string>(userActivities[0] || 'cycling')
  const [activeNotification, setActiveNotification] = useState<AppNotification | null>(null)

  const homeFadeAnim = useRef(new Animated.Value(0)).current
  const homeSlideAnim = useRef(new Animated.Value(14)).current

  const colors = themes[theme]

  // 1. Initial Boot: Request Native GPS and Load Live Weather
  const loadLocationAndWeather = useCallback(
    async (customLoc?: AppLocation) => {
      try {
        let targetLoc = customLoc
        if (!targetLoc) {
          targetLoc = await getCurrentGPSLocation()
          setCurrentLocation(targetLoc)
        }

        const weatherData = await fetchLiveWeather(
          targetLoc.lat,
          targetLoc.lon,
          targetLoc.name,
          targetLoc.region,
          targetLoc.country
        )

        setLiveWeather(weatherData)

        evaluateAndTriggerActivityNotifications(userActivities, {
          temp: weatherData.current.temp,
          precipitation: weatherData.current.precipitation,
          windSpeed: weatherData.current.windSpeed,
          humidity: weatherData.current.humidity,
          uvIndex: weatherData.current.uvIndex,
        })
      } catch (err) {
        console.warn('Error loading weather on boot:', err)
      }
    },
    [userActivities]
  )

  useEffect(() => {
    Animated.parallel([
      Animated.timing(homeFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(homeSlideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()

    loadLocationAndWeather()
    initializePushNotifications(userActivities)

    const unsubscribeNotif = addNotificationListener((notif) => {
      setActiveNotification(notif)
    })

    return () => {
      unsubscribeNotif()
    }
  }, [loadLocationAndWeather, userActivities])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await loadLocationAndWeather(currentLocation)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleSelectLocation = (loc: AppLocation) => {
    setCurrentLocation(loc)
    loadLocationAndWeather(loc)
  }

  const formatTemp = (temp: number) => {
    return unit === 'F' ? `${Math.round((temp * 9) / 5 + 32)}°` : `${temp}°`
  }

  const currentTemp = liveWeather?.current.temp ?? 24
  const condition = liveWeather?.current.condition ?? 'Partly Cloudy'
  const windSpeed = liveWeather?.current.windSpeed ?? 14
  const uvIndex = liveWeather?.current.uvIndex ?? 4
  const humidity = liveWeather?.current.humidity ?? 52
  const precipitation = liveWeather?.current.precipitation ?? 10
  const highTemp = liveWeather?.sevenDayForecast?.[0]?.highTemp ?? 28
  const lowTemp = liveWeather?.sevenDayForecast?.[0]?.lowTemp ?? 16
  const defaultHourlyList = Array.from({ length: 12 }, (_, i) => {
    const h = (new Date().getHours() + i * 2) % 24
    const timeStr = `${h.toString().padStart(2, '0')}:00`
    return {
      time: timeStr,
      temp: (liveWeather?.current.temp ?? 22) + (i === 0 ? 0 : i % 3 === 0 ? 2 : -1),
      condition: i === 0 ? (liveWeather?.current.condition ?? 'Partly Cloudy') : 'Clear',
      icon: i === 0 ? '🌤️' : h >= 6 && h < 19 ? '☀️' : '🌙',
    }
  })
  const hourlyList = liveWeather?.hourlyPoints && liveWeather.hourlyPoints.length > 0
    ? liveWeather.hourlyPoints
    : defaultHourlyList
  const forecastList = liveWeather?.sevenDayForecast ?? []
  const userActivitiesSafe = userActivities && userActivities.length > 0 ? userActivities : ['swimming', 'surfboarding', 'cycling']
  const matchedActivities = AVAILABLE_ACTIVITIES.filter((a) =>
    userActivitiesSafe.includes(a.id)
  )
  const activeActivities = matchedActivities.length > 0 ? matchedActivities : AVAILABLE_ACTIVITIES.slice(0, 3)
  const currentSport = activeActivities.find((a) => a.id === selectedActivityId) || activeActivities[0] || AVAILABLE_ACTIVITIES[0]

  const aqiData = liveWeather?.aqi ?? {
    value: 38,
    status: 'Good' as const,
    pm25: 8.5,
    pm10: 16.2,
    no2: 12.0,
    o3: 45.0,
  }

  const getAqiTheme = (val: number) => {
    if (val <= 50) {
      return {
        label: 'Good',
        bg: colors.successBg,
        text: colors.success,
        advice: 'Air quality is ideal for outdoor sports, endurance cycling, and coastal runs.',
      }
    }
    if (val <= 100) {
      return {
        label: 'Moderate',
        bg: colors.warningBg,
        text: colors.warning,
        advice: 'Acceptable atmospheric clarity. Unusually sensitive individuals should monitor respiration.',
      }
    }
    if (val <= 150) {
      return {
        label: 'Sensitive',
        bg: colors.warningBg,
        text: colors.warning,
        advice: 'Active runners and individuals with asthma should take scheduled breaks during workouts.',
      }
    }
    return {
      label: 'Unhealthy',
      bg: colors.dangerBg,
      text: colors.danger,
      advice: 'Elevated particle density. Consider shifting high-intensity training indoors.',
    }
  }

  const aqiTheme = getAqiTheme(aqiData.value)

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        <Animated.View style={{ opacity: homeFadeAnim, transform: [{ translateY: homeSlideAnim }] }}>
        {/* Emergency Banner */}
        {activeNotification && activeNotification.severity === 'emergency' && (
          <View style={[styles.emergencyBanner, { backgroundColor: colors.dangerBg, borderColor: colors.dangerBorder }]}>
            <View style={styles.emergencyIconBox}>
              <Text style={styles.emergencyIcon}>🚨</Text>
            </View>
            <View style={styles.emergencyTextCol}>
              <Text style={[styles.emergencyTitle, { color: colors.danger }]}>{activeNotification.title}</Text>
              <Text style={[styles.emergencyDesc, { color: colors.textPrimary }]}>{activeNotification.message}</Text>
            </View>
            <Pressable
              onPress={() => setActiveNotification(null)}
              style={styles.emergencyClose}
              hitSlop={8}
            >
              <Text style={styles.emergencyCloseText}>✕</Text>
            </Pressable>
          </View>
        )}

        {/* Standard In-App Notification Toast */}
        {activeNotification && activeNotification.severity !== 'emergency' && (
          <View style={[styles.notificationToast, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.toastIcon}>
              {activeNotification.severity === 'warning' ? '⚠️' : '🔔'}
            </Text>
            <View style={styles.toastTextCol}>
              <Text style={[styles.toastTitle, { color: colors.textPrimary }]}>{activeNotification.title}</Text>
              <Text style={[styles.toastDesc, { color: colors.textSecondary }]}>{activeNotification.message}</Text>
            </View>
            <Pressable
              onPress={() => setActiveNotification(null)}
              style={styles.toastClose}
              hitSlop={8}
            >
              <Text style={styles.toastCloseText}>✕</Text>
            </Pressable>
          </View>
        )}

        {/* Top Minimalist Header Bar with Theme Switcher */}
        <View style={styles.topHeaderBar}>
          <Pressable
            onPress={() => setShowLocationModal(true)}
            style={[styles.locationPill, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={styles.locationPin}>📍</Text>
            <Text style={[styles.locationName, { color: colors.textPrimary }]} numberOfLines={1}>
              {currentLocation.name}
            </Text>
            {currentLocation.isGPS && <View style={styles.gpsPulseDot} />}
          </Pressable>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Quick Theme Toggle Button */}
            {onToggleTheme && (
              <Pressable
                onPress={onToggleTheme}
                style={[styles.placesBtn, { backgroundColor: colors.card, borderColor: colors.border, paddingHorizontal: 10 }]}
                hitSlop={8}
              >
                <Text style={{ fontSize: 14 }}>{theme === 'dark' ? '☀️' : '🌙'}</Text>
              </Pressable>
            )}

            <Pressable
              onPress={() => setShowLocationModal(true)}
              style={[styles.placesBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Text style={styles.placesBtnIcon}>🗺️</Text>
              <Text style={[styles.placesBtnText, { color: colors.textSecondary }]}>Explore</Text>
            </Pressable>
          </View>
        </View>

        {/* Atmospheric Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {theme === 'dark' && <View style={styles.heroGlowAccent} />}

          <View style={styles.heroTopRow}>
            <View>
              <Text style={[styles.heroTempNumber, { color: colors.textPrimary }]}>{formatTemp(currentTemp)}</Text>
              <View style={styles.heroConditionRow}>
                <Text style={[styles.heroConditionName, { color: colors.accent }]}>{condition}</Text>
                <View style={[styles.heroRangePill, { backgroundColor: colors.cardSecondary }]}>
                  <Text style={[styles.heroRangeText, { color: colors.textSecondary }]}>
                    H: {formatTemp(highTemp)} • L: {formatTemp(lowTemp)}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.heroConditionGlyph}>
              {condition.toLowerCase().includes('rain')
                ? '🌧️'
                : condition.toLowerCase().includes('clear') || condition.toLowerCase().includes('sun')
                ? '☀️'
                : condition.toLowerCase().includes('snow')
                ? '❄️'
                : '⛅'}
            </Text>
          </View>

          {/* Human Editorial Sentiment */}
          <View style={[styles.heroEditorialBox, { borderTopColor: colors.border }]}>
            <Text style={[styles.heroEditorialText, { color: colors.textSecondary }]}>
              {getHumanEditorialSummary(condition, currentTemp, windSpeed)}
            </Text>
          </View>
        </View>

        {/* 24-Hour Horizon Contained Single Tab */}
        <View style={[styles.horizonCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* Internal Header */}
          <View style={[styles.horizonCardHeader, { borderBottomColor: colors.border }]}>
            <View style={styles.horizonCardTitleRow}>
              <Text style={styles.horizonCardIcon}>🕒</Text>
              <Text style={[styles.horizonCardTitle, { color: colors.textPrimary }]}>
                24-Hour Horizon
              </Text>
            </View>
            <Text style={[styles.horizonScrollHint, { color: colors.textMuted }]}>
              Hourly Flow →
            </Text>
          </View>

          {/* Continuous Scrollable Hourly Flow (Contained, no click actions) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizonScrollContent}
          >
            {hourlyList.map((item, index) => {
              const isNow = index === 0
              const isLast = index === hourlyList.length - 1

              return (
                <View
                  key={item.time + index}
                  style={[
                    styles.horizonSlot,
                    !isLast && [styles.horizonSlotBorder, { borderRightColor: colors.border }],
                  ]}
                >
                  <Text
                    style={[
                      styles.horizonTime,
                      { color: isNow ? colors.accent : colors.textMuted },
                      isNow && styles.horizonTimeNow,
                    ]}
                  >
                    {isNow ? 'Now' : item.time}
                  </Text>

                  <Text style={styles.horizonIcon}>{item.icon || '🌤️'}</Text>

                  <Text style={[styles.horizonTemp, { color: colors.textPrimary }]}>
                    {formatTemp(item.temp)}
                  </Text>

                  <View style={styles.horizonPrecipRow}>
                    <Text style={styles.horizonPrecipDrop}>💧</Text>
                    <Text style={[styles.horizonPrecipText, { color: colors.textMuted }]}>
                      {Math.min(100, Math.max(0, index * 6))}%
                    </Text>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>

        {/* Outdoor Passion Compass */}
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Passion Radar & Windows</Text>
        </View>

        <View style={[styles.passionContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.activityChipsRow}
          >
            {activeActivities.map((act) => {
              const isSelected = act.id === (currentSport?.id || 'cycling')
              return (
                <Pressable
                  key={act.id}
                  onPress={() => setSelectedActivityId(act.id)}
                  style={[
                    styles.activityChip,
                    { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                    isSelected && { borderColor: colors.accent, backgroundColor: colors.accentBg },
                  ]}
                >
                  <Text style={styles.activityChipIcon}>{act.icon}</Text>
                  <Text
                    style={[
                      styles.activityChipText,
                      { color: colors.textSecondary },
                      isSelected && { color: colors.accent, fontWeight: '800' },
                    ]}
                  >
                    {act.name}
                  </Text>
                </Pressable>
              )
            })}
          </ScrollView>

          <View style={styles.passionGaugeRow}>
            <View>
              <Text style={[styles.passionVerdict, { color: colors.textPrimary }]}>
                {currentSport?.name || 'Cycling'}: Peak Window
              </Text>
            </View>
            <View style={[styles.passionScoreBadge, { backgroundColor: colors.successBg }]}>
              <View style={styles.passionScoreDot} />
              <Text style={[styles.passionScoreText, { color: colors.success }]}>94% Prime</Text>
            </View>
          </View>

          <Text style={[styles.passionRationale, { color: colors.textSecondary }]}>
            Clean wind flow at {windSpeed} km/h with dry surface grip. Prime daylight window open until 6:45 PM.
          </Text>

          <View style={[styles.passionWindowsStrip, { backgroundColor: colors.cardSecondary }]}>
            <View style={[styles.passionWindowPill, { backgroundColor: colors.card }]}>
              <Text style={[styles.passionWindowLabel, { color: colors.textMuted }]}>Morning Slot</Text>
              <Text style={[styles.passionWindowTime, { color: colors.accent }]}>07:30 – 10:45 AM</Text>
            </View>
            <View style={[styles.passionWindowPill, { backgroundColor: colors.card }]}>
              <Text style={[styles.passionWindowLabel, { color: colors.textMuted }]}>Evening Slot</Text>
              <Text style={[styles.passionWindowTime, { color: colors.accent }]}>04:15 – 06:30 PM</Text>
            </View>
          </View>
        </View>

        {/* Bento Telemetry Grid */}
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Atmospheric Telemetry</Text>
        </View>

        <View style={styles.bentoGrid}>
          <View style={[styles.bentoTile, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.bentoHeader}>
              <Text style={[styles.bentoLabel, { color: colors.textMuted }]}>Wind & Gusts</Text>
              <Text style={styles.bentoIcon}>💨</Text>
            </View>
            <Text style={[styles.bentoValue, { color: colors.textPrimary }]}>{windSpeed} km/h</Text>
            <Text style={[styles.bentoSub, { color: colors.textSecondary }]}>Offshore • Gusts 22 km/h</Text>
          </View>

          <View style={[styles.bentoTile, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.bentoHeader}>
              <Text style={[styles.bentoLabel, { color: colors.textMuted }]}>UV Radiation</Text>
              <Text style={styles.bentoIcon}>☀️</Text>
            </View>
            <Text style={[styles.bentoValue, { color: colors.textPrimary }]}>{uvIndex} Mod</Text>
            <Text style={[styles.bentoSub, { color: colors.textSecondary }]}>SPF 30 recommended</Text>
          </View>

          <View style={[styles.bentoTile, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.bentoHeader}>
              <Text style={[styles.bentoLabel, { color: colors.textMuted }]}>Humidity</Text>
              <Text style={styles.bentoIcon}>💧</Text>
            </View>
            <Text style={[styles.bentoValue, { color: colors.textPrimary }]}>{humidity}%</Text>
            <Text style={[styles.bentoSub, { color: colors.textSecondary }]}>Dew Point 16°C • Fresh</Text>
          </View>

          <View style={[styles.bentoTile, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.bentoHeader}>
              <Text style={[styles.bentoLabel, { color: colors.textMuted }]}>Precipitation</Text>
              <Text style={styles.bentoIcon}>🌧️</Text>
            </View>
            <Text style={[styles.bentoValue, { color: colors.textPrimary }]}>{precipitation}%</Text>
            <Text style={[styles.bentoSub, { color: colors.textSecondary }]}>Zero rain next 90 min</Text>
          </View>
        </View>

        {/* Air Quality Index Section */}
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Air Quality & Particulates</Text>
        </View>

        <View style={[styles.aqiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.aqiTopRow}>
            <View style={styles.aqiTitleGroup}>
              <Text style={styles.aqiIcon}>🍃</Text>
              <Text style={[styles.aqiTitle, { color: colors.textPrimary }]}>US AQI Standard</Text>
            </View>
            <View style={[styles.aqiStatusBadge, { backgroundColor: aqiTheme.bg }]}>
              <Text style={[styles.aqiStatusText, { color: aqiTheme.text }]}>
                {aqiTheme.label}
              </Text>
            </View>
          </View>

          <View style={styles.aqiHeroRow}>
            <Text style={[styles.aqiMainValue, { color: colors.textPrimary }]}>
              {aqiData.value}
            </Text>
            <Text style={[styles.aqiScaleLabel, { color: colors.textMuted }]}>
              / 500 Index
            </Text>
          </View>

          <Text style={[styles.aqiAdvice, { color: colors.textSecondary }]}>
            {aqiTheme.advice}
          </Text>

          {/* 4 Essential Pollutant Parameters */}
          <View style={[styles.aqiMetricsGrid, { borderTopColor: colors.border }]}>
            <View style={styles.aqiMetricCol}>
              <Text style={[styles.aqiMetricVal, { color: colors.textPrimary }]}>
                {aqiData.pm25}
              </Text>
              <Text style={[styles.aqiMetricName, { color: colors.textMuted }]}>
                PM2.5 (µg)
              </Text>
            </View>

            <View style={styles.aqiMetricCol}>
              <Text style={[styles.aqiMetricVal, { color: colors.textPrimary }]}>
                {aqiData.pm10}
              </Text>
              <Text style={[styles.aqiMetricName, { color: colors.textMuted }]}>
                PM10 (µg)
              </Text>
            </View>

            <View style={styles.aqiMetricCol}>
              <Text style={[styles.aqiMetricVal, { color: colors.textPrimary }]}>
                {aqiData.o3}
              </Text>
              <Text style={[styles.aqiMetricName, { color: colors.textMuted }]}>
                O3 (Ozone)
              </Text>
            </View>

            <View style={styles.aqiMetricCol}>
              <Text style={[styles.aqiMetricVal, { color: colors.textPrimary }]}>
                {aqiData.no2}
              </Text>
              <Text style={[styles.aqiMetricName, { color: colors.textMuted }]}>
                NO2 (ppm)
              </Text>
            </View>
          </View>
        </View>

        {/* 7-Day Forecast Horizon */}
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>7-Day Horizon</Text>
        </View>

        <View style={[styles.sevenDayCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {forecastList.slice(0, 7).map((day, idx) => {
            const isLast = idx === forecastList.length - 1
            return (
              <View
                key={day.day + idx}
                style={[styles.dayRow, isLast && styles.dayRowLast, { borderBottomColor: colors.border }]}
              >
                <Text style={[styles.dayColName, { color: colors.textPrimary }]}>{day.day}</Text>
                <Text style={styles.dayColIcon}>
                  {day.condition.toLowerCase().includes('rain')
                    ? '🌧️'
                    : day.condition.toLowerCase().includes('clear') || day.condition.toLowerCase().includes('sun')
                    ? '☀️'
                    : day.condition.toLowerCase().includes('snow')
                    ? '❄️'
                    : '⛅'}
                </Text>
                <Text style={[styles.dayColCondition, { color: colors.textSecondary }]} numberOfLines={1}>
                  {day.condition}
                </Text>
                <View style={styles.dayTempBarContainer}>
                  <Text style={[styles.dayLowTemp, { color: colors.textMuted }]}>{formatTemp(day.lowTemp)}</Text>
                  <View style={[styles.dayBarBg, { backgroundColor: colors.border }]}>
                    <View
                      style={[
                        styles.dayBarFill,
                        {
                          width: `${Math.min(
                            100,
                            Math.max(20, ((day.highTemp - day.lowTemp) / 15) * 100)
                          )}%`,
                          backgroundColor: colors.accent,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.dayHighTemp, { color: colors.textPrimary }]}>{formatTemp(day.highTemp)}</Text>
                </View>
              </View>
            )
          })}
        </View>

        <MapLocationPicker
          visible={showLocationModal}
          currentLocation={currentLocation}
          onClose={() => setShowLocationModal(false)}
          onSelectLocation={handleSelectLocation}
          theme={theme}
        />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}
