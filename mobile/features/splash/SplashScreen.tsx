import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native'
import { ThemeMode, themes } from '../../lib/theme'

const { width } = Dimensions.get('window')

interface SplashScreenProps {
  onFinish: () => void
  theme?: ThemeMode
}

export function SplashScreen({ onFinish, theme = 'dark' }: SplashScreenProps) {
  const colors = themes[theme]

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.82)).current
  const textSlideAnim = useRef(new Animated.Value(18)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const screenFadeAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // 1. Enter Animation: Icon pops in and text fades up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(textSlideAnim, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start()

    // 2. Gentle Breathing Pulse on icon halo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start()

    // 3. Exit Animation after 1.9s: Smoothly fade out screen to reveal Auth
    const timer = setTimeout(() => {
      handleExit()
    }, 1900)

    return () => clearTimeout(timer)
  }, [])

  const handleExit = () => {
    try {
      Animated.timing(screenFadeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        onFinish()
      })
      // Absolute fallback guarantee
      setTimeout(() => {
        onFinish()
      }, 400)
    } catch {
      onFinish()
    }
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.background, opacity: screenFadeAnim },
      ]}
    >
      <Pressable onPress={handleExit} style={styles.touchArea}>
        {/* Glow Halo */}
        <Animated.View
          style={[
            styles.halo,
            {
              backgroundColor: colors.accentBg,
              borderColor: colors.accent,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />

        {/* Icon & Brand */}
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.iconGlyph}>🌤️</Text>
        </Animated.View>

        {/* Typography */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: textSlideAnim }],
            },
          ]}
        >
          <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
            Mausam
          </Text>
          <Text style={[styles.tagline, { color: colors.accent }]}>
            Atmospheric Intelligence
          </Text>
        </Animated.View>

        {/* Subtle Bottom Loading Indicator */}
        <View style={styles.bottomBar}>
          <View
            style={[
              styles.loadingDot,
              { backgroundColor: colors.accent },
            ]}
          />
        </View>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    opacity: 0.35,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
    marginBottom: 20,
  },
  iconGlyph: {
    fontSize: 48,
  },
  textContainer: {
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 54,
    alignItems: 'center',
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.8,
  },
})
