import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native'
import { searchLocations, LocationSearchResult } from '../lib/api/client'
import {
  AppLocation,
  getSavedLocations,
  saveCustomLocation,
  removeSavedLocation,
  getCurrentGPSLocation,
} from '../lib/services/location-service'
import { ThemeMode, themes } from '../lib/theme'
import { styles } from './MapLocationPicker.styles'

interface MapLocationPickerProps {
  visible: boolean
  currentLocation: AppLocation
  onClose: () => void
  onSelectLocation: (location: AppLocation) => void
  theme?: ThemeMode
}

export function MapLocationPicker({
  visible,
  currentLocation,
  onClose,
  onSelectLocation,
  theme = 'dark',
}: MapLocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [savedList, setSavedList] = useState<AppLocation[]>(getSavedLocations())
  const [liveGpsLocation, setLiveGpsLocation] = useState<AppLocation | null>(null)
  const [isLoadingGps, setIsLoadingGps] = useState(false)
  const searchInputRef = useRef<TextInput>(null)

  const colors = themes[theme]

  useEffect(() => {
    if (visible) {
      setSavedList(getSavedLocations())
      setSearchQuery('')
      setSearchResults([])
      loadLiveGps()
    }
  }, [visible])

  const loadLiveGps = async () => {
    setIsLoadingGps(true)
    try {
      const gps = await getCurrentGPSLocation()
      setLiveGpsLocation(gps)
    } finally {
      setIsLoadingGps(false)
    }
  }

  // Live Location Search with debounce
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const results = await searchLocations(searchQuery)
        setSearchResults(results)
      } catch (err) {
        console.warn('Search error:', err)
      } finally {
        setIsSearching(false)
      }
    }, 350)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Select Current GPS
  const handleSelectGps = () => {
    if (liveGpsLocation) {
      onSelectLocation(liveGpsLocation)
      onClose()
    } else {
      loadLiveGps().then(() => {
        if (liveGpsLocation) onSelectLocation(liveGpsLocation)
        onClose()
      })
    }
  }

  // Select a Search Result
  const handleSelectSearchResult = (result: LocationSearchResult, bookmark: boolean = false) => {
    const loc: AppLocation = {
      id: result.id,
      name: result.name,
      region: result.region,
      country: result.country,
      lat: result.lat,
      lon: result.lon,
      isGPS: false,
    }
    if (bookmark) {
      saveCustomLocation(loc)
      setSavedList(getSavedLocations())
    }
    onSelectLocation(loc)
    onClose()
  }

  const handleSelectSaved = (loc: AppLocation) => {
    onSelectLocation(loc)
    onClose()
  }

  const handleDeleteSaved = (id: string, e: any) => {
    e.stopPropagation()
    removeSavedLocation(id)
    setSavedList(getSavedLocations())
  }

  const handleTriggerAdd = () => {
    searchInputRef.current?.focus()
  }

  const isGpsCurrentlyActive = currentLocation.isGPS

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerIcon}>🗺️</Text>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Locations & Places</Text>
            </View>
            <Pressable
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: colors.cardSecondary }]}
              hitSlop={8}
            >
              <Text style={[styles.closeBtnText, { color: colors.textSecondary }]}>✕</Text>
            </Pressable>
          </View>

          {/* 1. One-Line Search Bar */}
          <View style={[styles.searchBarContainer, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              ref={searchInputRef}
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search any city, beach, or trail..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="words"
            />
            {isSearching ? (
              <ActivityIndicator size="small" color={colors.accent} />
            ) : searchQuery.length > 0 ? (
              <Pressable onPress={() => setSearchQuery('')} style={styles.clearBtn} hitSlop={6}>
                <Text style={styles.clearBtnText}>✕</Text>
              </Pressable>
            ) : null}
          </View>

          {/* Scrollable Body */}
          <ScrollView style={styles.locationsScroll} showsVerticalScrollIndicator={false}>
            {searchResults.length > 0 ? (
              <View style={styles.searchResultsContainer}>
                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
                  Search Results ({searchResults.length})
                </Text>
                {searchResults.map((item) => (
                  <View
                    key={item.id}
                    style={[styles.searchResultBox, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}
                  >
                    <View style={styles.searchResultLeft}>
                      <Text style={styles.pinIcon}>📍</Text>
                      <View style={styles.locTextCol}>
                        <Text style={[styles.locName, { color: colors.textPrimary }]}>{item.name}</Text>
                        <Text style={[styles.locRegion, { color: colors.textSecondary }]}>
                          {item.region ? `${item.region}, ` : ''}{item.country}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.searchResultActions}>
                      <Pressable
                        onPress={() => handleSelectSearchResult(item, true)}
                        style={[styles.addBookmarkBtn, { backgroundColor: colors.accent }]}
                      >
                        <Text style={styles.addBookmarkBtnText}>+ Save & Set</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <>
                {/* 2. Top Box: Current Location (GPS) */}
                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Detected Location</Text>
                <Pressable
                  onPress={handleSelectGps}
                  style={[
                    styles.currentGpsBox,
                    { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                    isGpsCurrentlyActive && { borderColor: colors.accent, backgroundColor: colors.accentBg },
                  ]}
                >
                  <View style={styles.currentGpsHeader}>
                    <View style={styles.gpsBadgeRow}>
                      <Text style={styles.gpsIcon}>📍</Text>
                      <Text style={[styles.gpsLabel, { color: colors.accent }]}>Current Location (GPS)</Text>
                    </View>
                    <View style={[styles.livePill, { backgroundColor: colors.successBg }]}>
                      <Text style={[styles.livePillText, { color: colors.success }]}>LIVE GPS</Text>
                    </View>
                  </View>

                  <View style={styles.gpsMainRow}>
                    <View style={styles.locTextCol}>
                      <Text style={[styles.gpsLocName, { color: colors.textPrimary }]}>
                        {isLoadingGps ? 'Detecting satellites...' : liveGpsLocation?.name || 'My GPS Coordinates'}
                      </Text>
                      <Text style={[styles.gpsLocRegion, { color: colors.textSecondary }]}>
                        {liveGpsLocation?.region ? `${liveGpsLocation.region}, ` : ''}
                        {liveGpsLocation ? `${liveGpsLocation.lat.toFixed(2)}°, ${liveGpsLocation.lon.toFixed(2)}°` : 'Accurate device telemetry'}
                      </Text>
                    </View>

                    {isGpsCurrentlyActive ? (
                      <View style={[styles.activeTag, { backgroundColor: colors.accentBg }]}>
                        <Text style={[styles.activeTagText, { color: colors.accent }]}>✓ Active</Text>
                      </View>
                    ) : (
                      <View style={[styles.selectGpsBtn, { backgroundColor: colors.accent }]}>
                        <Text style={styles.selectGpsBtnText}>Set Active</Text>
                      </View>
                    )}
                  </View>
                </Pressable>

                {/* 3. Saved Locations List */}
                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
                  Saved Locations ({savedList.length})
                </Text>

                {savedList.length === 0 ? (
                  <View style={[styles.emptyBox, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                      No saved locations yet. Search above to bookmark your favorite outdoor spots.
                    </Text>
                  </View>
                ) : (
                  savedList.map((loc) => {
                    const isActive =
                      !currentLocation.isGPS &&
                      Math.abs(loc.lat - currentLocation.lat) < 0.01 &&
                      Math.abs(loc.lon - currentLocation.lon) < 0.01

                    return (
                      <Pressable
                        key={loc.id}
                        onPress={() => handleSelectSaved(loc)}
                        style={[
                          styles.locationBox,
                          { backgroundColor: colors.cardSecondary, borderColor: colors.border },
                          isActive && { borderColor: colors.accent, backgroundColor: colors.accentBg },
                        ]}
                      >
                        <View style={styles.locationBoxLeft}>
                          <Text style={styles.pinIcon}>⭐</Text>
                          <View style={styles.locTextCol}>
                            <Text style={[styles.locName, { color: colors.textPrimary }]}>{loc.name}</Text>
                            <Text style={[styles.locRegion, { color: colors.textSecondary }]}>
                              {loc.region ? `${loc.region}, ` : ''}{loc.country}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.locActions}>
                          {isActive ? (
                            <View style={[styles.activeTag, { backgroundColor: colors.accentBg }]}>
                              <Text style={[styles.activeTagText, { color: colors.accent }]}>✓ Active</Text>
                            </View>
                          ) : null}
                          <Pressable
                            onPress={(e) => handleDeleteSaved(loc.id, e)}
                            style={styles.deleteBtn}
                            hitSlop={6}
                          >
                            <Text style={styles.deleteBtnText}>🗑️</Text>
                          </Pressable>
                        </View>
                      </Pressable>
                    )
                  })
                )}
              </>
            )}
          </ScrollView>

          {/* 4. Bottom "+ Add Location" Button */}
          <Pressable
            onPress={handleTriggerAdd}
            style={[styles.addLocationBottomBtn, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}
          >
            <Text style={[styles.addLocationBottomIcon, { color: colors.accent }]}>+</Text>
            <Text style={[styles.addLocationBottomText, { color: colors.textPrimary }]}>Add Location</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
