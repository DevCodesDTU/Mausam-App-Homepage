import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { styles } from './SevenDayForecast.styles'

export interface DayForecastItem {
  id?: string
  day: string
  date: string
  icon: string
  highTemp: number
  lowTemp: number
  condition: string
  precipitation?: number
}

interface SevenDayForecastProps {
  unit?: 'C' | 'F'
  forecastItems?: DayForecastItem[]
  onSelectDay?: (day: DayForecastItem) => void
}

const DEFAULT_DAYS: DayForecastItem[] = [
  { id: '1', day: 'Today', date: 'Jan 1', icon: '☀️', highTemp: 22, lowTemp: 16, condition: 'Sunny' },
  { id: '2', day: 'Tue', date: 'Jan 2', icon: '⛅', highTemp: 20, lowTemp: 15, condition: 'Partly Cloudy' },
  { id: '3', day: 'Wed', date: 'Jan 3', icon: '🌦️', highTemp: 21, lowTemp: 17, condition: 'Light Drizzle' },
  { id: '4', day: 'Thu', date: 'Jan 4', icon: '🌧️', highTemp: 18, lowTemp: 15, condition: 'Showers' },
  { id: '5', day: 'Fri', date: 'Jan 5', icon: '⛅', highTemp: 19, lowTemp: 14, condition: 'Overcast' },
  { id: '6', day: 'Sat', date: 'Jan 6', icon: '☀️', highTemp: 23, lowTemp: 17, condition: 'Clear Sky' },
  { id: '7', day: 'Sun', date: 'Jan 7', icon: '🌤️', highTemp: 24, lowTemp: 18, condition: 'Warm Sun' },
]

export function SevenDayForecast({
  unit = 'C',
  forecastItems,
  onSelectDay,
}: SevenDayForecastProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0)
  const days = forecastItems && forecastItems.length > 0 ? forecastItems : DEFAULT_DAYS

  const formatTemp = (temp: number) => {
    return unit === 'F' ? `${Math.round((temp * 9) / 5 + 32)}°` : `${temp}°`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>7-Day Forecasts</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {days.map((item, index) => {
          const isSelected = index === selectedDayIndex

          return (
            <Pressable
              key={item.id || item.day + index}
              onPress={() => {
                setSelectedDayIndex(index)
                if (onSelectDay) onSelectDay(item)
              }}
              style={[
                styles.dayPill,
                isSelected ? styles.dayPillActive : styles.dayPillInactive,
              ]}
            >
              {/* Day Name */}
              <Text
                style={[
                  styles.dayLabel,
                  isSelected ? styles.dayLabelActive : styles.dayLabelInactive,
                ]}
              >
                {item.day}
              </Text>

              {/* Active Indicator Dot or Weather Icon */}
              {isSelected ? (
                <View style={styles.activeDot} />
              ) : (
                <Text style={styles.weatherIcon}>{item.icon}</Text>
              )}

              {/* High Temp */}
              <Text
                style={[
                  styles.highTempText,
                  isSelected ? styles.tempActive : styles.tempInactive,
                ]}
              >
                {formatTemp(item.highTemp)}
              </Text>

              {/* Low Temp */}
              <Text
                style={[
                  styles.lowTempText,
                  isSelected ? styles.lowTempActive : styles.lowTempInactive,
                ]}
              >
                {formatTemp(item.lowTemp)}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
