import React from 'react'
import { View, ViewStyle, StyleProp } from 'react-native'
import { styles } from './GlassCard.styles'

interface GlassCardProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  variant?: 'light' | 'subtle' | 'solid'
}

export function GlassCard({ children, style, variant = 'light' }: GlassCardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'subtle' && styles.subtle,
        variant === 'solid' && styles.solid,
        style,
      ]}
    >
      {children}
    </View>
  )
}
