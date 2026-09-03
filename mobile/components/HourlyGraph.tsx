import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { styles } from './HourlyGraph.styles'

export interface HourlyPoint {
  time: string
  temp: number
  condition: string
  icon: string
}

interface HourlyGraphProps {
  points?: HourlyPoint[]
  unit?: 'C' | 'F'
  onSelectTime?: (point: HourlyPoint) => void
}

const DEFAULT_POINTS: HourlyPoint[] = [
  { time: '0:00', temp: 16, condition: 'Clear', icon: '🌙' },
  { time: '3:00', temp: 15, condition: 'Cool', icon: '✨' },
  { time: '6:00', temp: 17, condition: 'Dawn', icon: '🌤️' },
  { time: '9:00', temp: 22, condition: 'Cloudy', icon: '⛅' },
  { time: '12:00', temp: 25, condition: 'Sunny', icon: '☀️' },
  { time: '15:00', temp: 24, condition: 'Pleasant', icon: '🌤️' },
  { time: '18:00', temp: 21, condition: 'Dusk', icon: '🌇' },
  { time: '21:00', temp: 18, condition: 'Clear Night', icon: '🌙' },
]

export function HourlyGraph({
  points,
  unit = 'C',
  onSelectTime,
}: HourlyGraphProps) {
  const safePoints = points && points.length > 0 ? points : DEFAULT_POINTS
  const [selectedIndex, setSelectedIndex] = useState<number>(3)

  const formatTemp = (temp: number) => {
    return unit === 'F' ? `${Math.round((temp * 9) / 5 + 32)}°` : `${temp}°`
  }

  const selectedPoint = safePoints[selectedIndex] || safePoints[0]

  return (
    <View style={styles.container}>
      {/* Curve Visual Line Area */}
      <View style={styles.chartWrapper}>
        <View style={styles.waveLineBase} />
        
        {/* Connection points across timeline */}
        <View style={styles.dotsRow}>
          {safePoints.map((point, index) => {
            const isSelected = index === selectedIndex
            const offsets = [22, 28, 20, 8, 4, 10, 18, 26]
            const topOffset = offsets[index % offsets.length]

            return (
              <Pressable
                key={point.time + index}
                onPress={() => {
                  setSelectedIndex(index)
                  if (onSelectTime) onSelectTime(point)
                }}
                style={styles.dotColumn}
                hitSlop={10}
              >
                <View style={[styles.dotPlacement, { top: topOffset }]}>
                  {isSelected ? (
                    <View style={styles.activeDotOuter}>
                      <View style={styles.activeDotInner} />
                    </View>
                  ) : (
                    <View style={styles.normalDot} />
                  )}
                </View>
              </Pressable>
            )
          })}
        </View>
      </View>

      {/* Time Labels Row */}
      <View style={styles.timeLabelsRow}>
        {safePoints.map((point, index) => {
          const isSelected = index === selectedIndex
          return (
            <Pressable
              key={point.time + index}
              onPress={() => {
                setSelectedIndex(index)
                if (onSelectTime) onSelectTime(point)
              }}
              style={styles.timeItem}
            >
              <Text style={[styles.timeText, isSelected && styles.timeTextActive]}>
                {point.time}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* Selected Time Floating Indicator */}
      <View style={styles.activeInfoBar}>
        <Text style={styles.activeInfoTime}>
          {selectedPoint.time} Forecast:
        </Text>
        <Text style={styles.activeInfoTemp}>
          {formatTemp(selectedPoint.temp)} • {selectedPoint.condition} {selectedPoint.icon}
        </Text>
      </View>
    </View>
  )
}
