import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { styles } from './SevenDayForecast.styles'

export interface DayForecastItem {
  day: string
  date: string
  icon: string
  highTemp: number
  lowTemp: number
  condition: string
}

interface SevenDayForecastProps {
  unit?: 'C' | 'F'
  onSelectDay?: (day: DayForecastItem) => void
}

const SAMPLE_DAYS: DayForecastItem[] = [
  { day: 'MON', date: 'Jan 1', icon: '☀️', highTemp: 22, lowTemp: 16, condition: 'Sunny' },
  { day: 'TUE', date: 'Jan 2', icon: '⛅', highTemp: 20, lowTemp: 15, condition: 'Partly Cloudy' },
  { day: 'WED', date: 'Jan 3', icon: '🌦️', highTemp: 21, lowTemp: 17, condition: 'Light Drizzle' },
  { day: 'THU', date: 'Jan 4', icon: '🌧️', highTemp: 18, lowTemp: 15, condition: 'Showers' },
  { day: 'FRI', date: 'Jan 5', icon: '⛅', highTemp: 19, lowTemp: 14, condition: 'Overcast' },
  { day: 'SAT', date: 'Jan 6', icon: '☀️', highTemp: 23, lowTemp: 17, condition: 'Clear Sky' },
  { day: 'SUN', date: 'Jan 7', icon: '🌤️', highTemp: 24, lowTemp: 18, condition: 'Warm Sun' },
]

export function SevenDayForecast({ unit = 'C', onSelectDay }: SevenDayForecastProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0) // Default MON

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
        {SAMPLE_DAYS.map((item, index) => {
          const isSelected = index === selectedDayIndex

          return (
            <Pressable
              key={item.day}
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

              {/* Active Indicator Dot or Mini Icon */}
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
