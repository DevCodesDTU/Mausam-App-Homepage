import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Modal,
} from 'react-native'
import { GlassCard } from '../../components/GlassCard'
import { WeatherArt } from '../../components/WeatherArt'
import { HourlyGraph, HourlyPoint } from '../../components/HourlyGraph'
import { SevenDayForecast, DayForecastItem } from '../../components/SevenDayForecast'
import { ActivitySuggestionCard } from '../../components/ActivitySuggestionCard'
import {
  getSmartActivitySuggestion,
  WeatherConditionSummary,
} from '../../lib/activity-engine'
import { styles } from './HomeScreen.styles'

interface HomeScreenProps {
  userActivities: string[]
  unit: 'C' | 'F'
  onOpenProfile: () => void
}

interface LocationData {
  id: string
  name: string
  region: string
  country: string
  temp: number
  condition: string
  iconType: 'cloudy-sun' | 'sun' | 'rain' | 'thunder' | 'wind' | 'moon'
  precipitation: number
  humidity: number
  windSpeed: number
}

const LOCATIONS: LocationData[] = [
  {
    id: 'malibu',
    name: 'Malibu Coast',
    region: 'California',
    country: 'USA',
    temp: 22,
    condition: 'Cloudy',
    iconType: 'cloudy-sun',
    precipitation: 30,
    humidity: 20,
    windSpeed: 12,
  },
  {
    id: 'delhi',
    name: 'New Delhi',
    region: 'Delhi',
    country: 'India',
    temp: 29,
    condition: 'Sunny',
    iconType: 'sun',
    precipitation: 5,
    humidity: 45,
    windSpeed: 14,
  },
  {
    id: 'miami',
    name: 'Miami Beach',
    region: 'Florida',
    country: 'USA',
    temp: 27,
    condition: 'Breezy & Sunny',
    iconType: 'sun',
    precipitation: 15,
    humidity: 68,
    windSpeed: 22,
  },
  {
    id: 'honolulu',
    name: 'Honolulu',
    region: 'Hawaii',
    country: 'USA',
    temp: 26,
    condition: 'Tropical Swell',
    iconType: 'cloudy-sun',
    precipitation: 20,
    humidity: 55,
    windSpeed: 18,
  },
  {
    id: 'sydney',
    name: 'Sydney Harbour',
    region: 'NSW',
    country: 'Australia',
    temp: 21,
    condition: 'Crisp Wind',
    iconType: 'wind',
    precipitation: 10,
    humidity: 50,
    windSpeed: 20,
  },
  {
    id: 'london',
    name: 'London',
    region: 'Greater London',
    country: 'UK',
    temp: 16,
    condition: 'Light Rain',
    iconType: 'rain',
    precipitation: 75,
    humidity: 82,
    windSpeed: 16,
  },
]

export function HomeScreen({ userActivities, unit, onOpenProfile }: HomeScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(LOCATIONS[0])
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [currentTemp, setCurrentTemp] = useState<number>(selectedLocation.temp)
  const [currentCondition, setCurrentCondition] = useState<string>(selectedLocation.condition)

  const formatTemp = (temp: number) => {
    return unit === 'F' ? `${Math.round((temp * 9) / 5 + 32)}°` : `${temp}°`
  }

  // Calculate dynamic activity suggestions using the separate JSON mapping
  const weatherSummary: WeatherConditionSummary = {
    temp: currentTemp,
    condition: currentCondition,
    precipitation: selectedLocation.precipitation,
    windSpeed: selectedLocation.windSpeed,
    humidity: selectedLocation.humidity,
  }

  const { primary, allSuggestions } = getSmartActivitySuggestion(
    userActivities,
    weatherSummary
  )

  const handleSelectLocation = (loc: LocationData) => {
    setSelectedLocation(loc)
    setCurrentTemp(loc.temp)
    setCurrentCondition(loc.condition)
    setShowLocationModal(false)
  }

  const handleSelectHourlyPoint = (point: HourlyPoint) => {
    setCurrentTemp(point.temp)
    setCurrentCondition(point.condition)
  }

  const handleSelectDay = (day: DayForecastItem) => {
    setCurrentTemp(day.highTemp)
    setCurrentCondition(day.condition)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.mainCard}>
          {/* Header Bar — Matching Reference Layout */}
          <View style={styles.headerBar}>
            <Pressable
              onPress={() => setShowLocationModal(true)}
              style={styles.menuIconBtn}
              hitSlop={8}
            >
              <View style={styles.dotsIconVertical}>
                <View style={styles.miniMenuDot} />
                <View style={styles.miniMenuDot} />
                <View style={styles.miniMenuDot} />
              </View>
            </Pressable>

            {/* Location Title & Subtitle */}
            <Pressable
              onPress={() => setShowLocationModal(true)}
              style={styles.locationTitleBox}
            >
              <View style={styles.locationRow}>
                <Text style={styles.locationPinIcon}>📍</Text>
                <Text style={styles.locationName}>{selectedLocation.name}</Text>
              </View>
              <Text style={styles.dateTimeText}>Monday, 1 January 9:00</Text>
            </Pressable>

            {/* Plus / Add Location Button */}
            <Pressable
              onPress={() => setShowLocationModal(true)}
              style={styles.plusIconBtn}
              hitSlop={8}
            >
              <Text style={styles.plusText}>+</Text>
            </Pressable>
          </View>

          {/* Hero Weather Section — Huge 22°, Cloudy & 3D Glass Artwork */}
          <View style={styles.heroWeatherRow}>
            <View style={styles.tempLeftCol}>
              <Text style={styles.heroTempNumber}>{formatTemp(currentTemp)}</Text>
              <Text style={styles.heroConditionText}>{currentCondition}</Text>
            </View>

            <View style={styles.heroArtRightCol}>
              <WeatherArt type={selectedLocation.iconType} size="large" />
            </View>
          </View>

          {/* 3-Metric Horizontal Stats Strip */}
          <View style={styles.metricsStrip}>
            {/* Precipitation */}
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>☔</Text>
              <Text style={styles.metricValue}>{selectedLocation.precipitation}%</Text>
              <Text style={styles.metricLabel}>Precipitation</Text>
            </View>

            {/* Humidity */}
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>💧</Text>
              <Text style={styles.metricValue}>{selectedLocation.humidity}%</Text>
              <Text style={styles.metricLabel}>Humidity</Text>
            </View>

            {/* Wind Speed */}
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>💨</Text>
              <Text style={styles.metricValue}>{selectedLocation.windSpeed} km/h</Text>
              <Text style={styles.metricLabel}>Wind speed</Text>
            </View>
          </View>

          {/* 24-Hour Forecast Curve Graph */}
          <HourlyGraph
            unit={unit}
            onSelectTime={handleSelectHourlyPoint}
          />

          {/* 7-Day Forecast Pills */}
          <SevenDayForecast
            unit={unit}
            onSelectDay={handleSelectDay}
          />
        </GlassCard>

        {/* Dynamic Activity Suggestion Card (Below Weather) */}
        <ActivitySuggestionCard
          primarySuggestion={primary}
          allSuggestions={allSuggestions}
          onOpenActivities={onOpenProfile}
        />

        {/* Bottom padding so floating nav bar does not overlap */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Location Picker Modal */}
      <Modal
        visible={showLocationModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowLocationModal(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Location</Text>
            <Text style={styles.modalSub}>Select a destination to update weather & activity insights:</Text>

            {LOCATIONS.map((loc) => {
              const isCurrent = loc.id === selectedLocation.id
              return (
                <Pressable
                  key={loc.id}
                  onPress={() => handleSelectLocation(loc)}
                  style={[
                    styles.modalLocItem,
                    isCurrent && styles.modalLocItemActive,
                  ]}
                >
                  <View style={styles.modalLocLeft}>
                    <Text style={styles.modalLocPin}>📍</Text>
                    <View>
                      <Text style={styles.modalLocName}>{loc.name}</Text>
                      <Text style={styles.modalLocRegion}>{loc.region}, {loc.country}</Text>
                    </View>
                  </View>
                  <Text style={styles.modalLocTemp}>{formatTemp(loc.temp)}</Text>
                </Pressable>
              )
            })}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}
