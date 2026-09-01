import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './WeatherArt.styles'

interface WeatherArtProps {
  type?: 'cloudy-sun' | 'sun' | 'moon' | 'rain' | 'thunder' | 'wind' | 'snow'
  size?: 'small' | 'medium' | 'large'
}

export function WeatherArt({ type = 'cloudy-sun', size = 'large' }: WeatherArtProps) {
  const scale = size === 'small' ? 0.45 : size === 'medium' ? 0.7 : 1

  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      {/* 3D Sun Layer (Behind Cloud) */}
      {(type === 'cloudy-sun' || type === 'sun') && (
        <View style={[styles.sunOrb, type === 'sun' && styles.sunSolo]}>
          <View style={styles.sunGlow} />
          <View style={styles.sunCore} />
          {/* Sun Rays Beads */}
          <View style={[styles.sunRay, { top: -6, left: 16 }]} />
          <View style={[styles.sunRay, { top: -6, right: 16 }]} />
          <View style={[styles.sunRay, { top: 16, right: -6 }]} />
          <View style={[styles.sunRay, { bottom: -6, right: 16 }]} />
          <View style={[styles.sunRay, { top: 16, left: -6 }]} />
        </View>
      )}

      {/* 3D Crescent Moon Layer */}
      {type === 'moon' && (
        <View style={styles.moonOrb}>
          <View style={styles.moonCore} />
          <View style={styles.starBead1} />
          <View style={styles.starBead2} />
        </View>
      )}

      {/* 3D Puffy Cloud Layer */}
      {(type === 'cloudy-sun' || type === 'rain' || type === 'thunder' || type === 'wind' || type === 'snow') && (
        <View style={styles.cloudGroup}>
          <View style={styles.cloudBackDrop} />
          <View style={styles.cloudPuffLarge} />
          <View style={styles.cloudPuffSmall} />
          <View style={styles.cloudBase} />
        </View>
      )}

      {/* Rain Drops */}
      {(type === 'rain' || type === 'thunder') && (
        <View style={styles.rainGroup}>
          <View style={[styles.rainDrop, { left: 24, top: 4 }]} />
          <View style={[styles.rainDrop, { left: 44, top: 12 }]} />
          <View style={[styles.rainDrop, { left: 64, top: 6 }]} />
        </View>
      )}

      {/* Thunder Lightning Bolt */}
      {type === 'thunder' && (
        <View style={styles.lightningBolt}>
          <Text style={styles.lightningText}>⚡</Text>
        </View>
      )}

      {/* Wind Waves */}
      {type === 'wind' && (
        <View style={styles.windWaveGroup}>
          <View style={styles.windWaveLine1} />
          <View style={styles.windWaveLine2} />
        </View>
      )}

      {/* Snow Flurries */}
      {type === 'snow' && (
        <View style={styles.snowGroup}>
          <View style={[styles.snowFlake, { left: 28, top: 6 }]} />
          <View style={[styles.snowFlake, { left: 48, top: 14 }]} />
          <View style={[styles.snowFlake, { left: 66, top: 8 }]} />
        </View>
      )}
    </View>
  )
}
