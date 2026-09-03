import React from 'react'
import { View, Pressable } from 'react-native'
import { ThemeMode, themes } from '../lib/theme'
import { styles } from './BottomNavBar.styles'

export type TabScreen = 'home' | 'alerts' | 'profile'

interface BottomNavBarProps {
  currentTab: TabScreen
  onSelectTab: (tab: TabScreen) => void
  hasAlerts?: boolean
  theme?: ThemeMode
}

export function BottomNavBar({
  currentTab,
  onSelectTab,
  hasAlerts = true,
  theme = 'dark',
}: BottomNavBarProps) {
  const colors = themes[theme]

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.barContainer, { backgroundColor: colors.navBg, borderColor: colors.navBorder }]}>
        {/* Tab 1: Horizon / Home */}
        <Pressable
          onPress={() => onSelectTab('home')}
          style={[styles.tabButton, currentTab === 'home' && { backgroundColor: colors.navActiveTab }]}
          hitSlop={12}
        >
          <View style={styles.iconWrapper}>
            <View style={styles.vectorIconBox}>
              <View
                style={[
                  styles.cloudPuff,
                  { borderColor: colors.textMuted },
                  currentTab === 'home' && { borderColor: colors.accent },
                ]}
              />
              <View
                style={[
                  styles.sunDisc,
                  { borderColor: colors.textMuted },
                  currentTab === 'home' && { borderColor: colors.accent, backgroundColor: colors.accentBg },
                ]}
              />
            </View>
            {currentTab === 'home' && <View style={[styles.activeDot, { backgroundColor: colors.accent }]} />}
          </View>
        </Pressable>

        {/* Tab 2: Alerts & Radar */}
        <Pressable
          onPress={() => onSelectTab('alerts')}
          style={[styles.tabButton, currentTab === 'alerts' && { backgroundColor: colors.navActiveTab }]}
          hitSlop={12}
        >
          <View style={styles.iconWrapper}>
            <View style={styles.vectorIconBox}>
              <View
                style={[
                  styles.bellBody,
                  { borderColor: colors.textMuted },
                  currentTab === 'alerts' && { borderColor: colors.accent },
                ]}
              />
              <View
                style={[
                  styles.bellRim,
                  { backgroundColor: colors.textMuted },
                  currentTab === 'alerts' && { backgroundColor: colors.accent },
                ]}
              />
            </View>
            {hasAlerts && <View style={styles.alertBadgeDot} />}
            {currentTab === 'alerts' && <View style={[styles.activeDot, { backgroundColor: colors.accent }]} />}
          </View>
        </Pressable>

        {/* Tab 3: Profile & Passions */}
        <Pressable
          onPress={() => onSelectTab('profile')}
          style={[styles.tabButton, currentTab === 'profile' && { backgroundColor: colors.navActiveTab }]}
          hitSlop={12}
        >
          <View style={styles.iconWrapper}>
            <View style={styles.vectorIconBox}>
              <View
                style={[
                  styles.userHead,
                  { borderColor: colors.textMuted },
                  currentTab === 'profile' && { borderColor: colors.accent },
                ]}
              />
              <View
                style={[
                  styles.userShoulders,
                  { borderColor: colors.textMuted },
                  currentTab === 'profile' && { borderColor: colors.accent },
                ]}
              />
            </View>
            {currentTab === 'profile' && <View style={[styles.activeDot, { backgroundColor: colors.accent }]} />}
          </View>
        </Pressable>
      </View>
    </View>
  )
}
