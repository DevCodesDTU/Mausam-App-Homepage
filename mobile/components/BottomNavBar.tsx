import React from 'react'
import { View, Pressable } from 'react-native'
import { styles } from './BottomNavBar.styles'

export type TabScreen = 'home' | 'alerts' | 'profile'

interface BottomNavBarProps {
  currentTab: TabScreen
  onSelectTab: (tab: TabScreen) => void
  hasAlerts?: boolean
}

export function BottomNavBar({
  currentTab,
  onSelectTab,
  hasAlerts = true,
}: BottomNavBarProps) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.barContainer}>
        {/* Tab 1: Home */}
        <Pressable
          onPress={() => onSelectTab('home')}
          style={[styles.tabButton, currentTab === 'home' && styles.activeTab]}
          hitSlop={12}
        >
          <View style={styles.iconWrapper}>
            {/* Custom Clean Minimalist Home Icon */}
            <View style={styles.homeIconShape}>
              <View style={[styles.homeRoof, currentTab === 'home' && styles.activeStroke]} />
              <View style={[styles.homeBase, currentTab === 'home' && styles.activeStroke]} />
              <View style={[styles.homeDoor, currentTab === 'home' && styles.activeFill]} />
            </View>
            {currentTab === 'home' && <View style={styles.activeDot} />}
          </View>
        </Pressable>

        {/* Tab 2: Alerts */}
        <Pressable
          onPress={() => onSelectTab('alerts')}
          style={[styles.tabButton, currentTab === 'alerts' && styles.activeTab]}
          hitSlop={12}
        >
          <View style={styles.iconWrapper}>
            {/* Custom Clean Minimalist Bell Icon */}
            <View style={styles.bellIconShape}>
              <View style={[styles.bellDome, currentTab === 'alerts' && styles.activeStroke]} />
              <View style={[styles.bellRim, currentTab === 'alerts' && styles.activeStroke]} />
              <View style={[styles.bellClapper, currentTab === 'alerts' && styles.activeFill]} />
            </View>
            {hasAlerts && <View style={styles.alertBadgeDot} />}
            {currentTab === 'alerts' && <View style={styles.activeDot} />}
          </View>
        </Pressable>

        {/* Tab 3: Profile */}
        <Pressable
          onPress={() => onSelectTab('profile')}
          style={[styles.tabButton, currentTab === 'profile' && styles.activeTab]}
          hitSlop={12}
        >
          <View style={styles.iconWrapper}>
            {/* Custom Clean Minimalist User Icon */}
            <View style={styles.userIconShape}>
              <View style={[styles.userHead, currentTab === 'profile' && styles.activeStroke]} />
              <View style={[styles.userBody, currentTab === 'profile' && styles.activeStroke]} />
            </View>
            {currentTab === 'profile' && <View style={styles.activeDot} />}
          </View>
        </Pressable>
      </View>
    </View>
  )
}
