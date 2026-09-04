import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from 'react-native'
import { registerUser, loginUser } from '../../lib/api/client'
import { ThemeMode, themes } from '../../lib/theme'
import { styles } from './AuthScreen.styles'

interface AuthScreenProps {
  onSuccess: (userData: { name: string; email: string }) => void
  theme?: ThemeMode
  onToggleTheme?: () => void
}

export function AuthScreen({
  onSuccess,
  theme = 'dark',
  onToggleTheme,
}: AuthScreenProps) {
  // 3-step progression (no scroll, compact & spacious)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [policyAccepted, setPolicyAccepted] = useState(false)

  // Form states (Page 3)
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup')
  const [name, setName] = useState('Alex River')
  const [email, setEmail] = useState('alex.river@example.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Smooth page transition animation
  const pageFadeAnim = useRef(new Animated.Value(1)).current
  const pageSlideAnim = useRef(new Animated.Value(0)).current

  // Tab indicator & cross-fade animation (Page 3)
  const [tabRowWidth, setTabRowWidth] = useState(0)
  const tabIndicatorAnim = useRef(new Animated.Value(0)).current
  const formFadeAnim = useRef(new Animated.Value(1)).current

  const colors = themes[theme]

  const animateToStep = (newStep: 1 | 2 | 3) => {
    if (newStep === currentStep) return
    const isForward = newStep > currentStep

    Animated.parallel([
      Animated.timing(pageFadeAnim, {
        toValue: 0,
        duration: 110,
        useNativeDriver: true,
      }),
      Animated.timing(pageSlideAnim, {
        toValue: isForward ? -10 : 10,
        duration: 110,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentStep(newStep)
      pageSlideAnim.setValue(isForward ? 10 : -10)
      Animated.parallel([
        Animated.timing(pageFadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pageSlideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }

  const handleTabChange = (tab: 'signup' | 'login') => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setErrorMessage(null)

    // Smooth spring slide for indicator
    Animated.spring(tabIndicatorAnim, {
      toValue: tab === 'signup' ? 0 : 1,
      friction: 8,
      tension: 75,
      useNativeDriver: true,
    }).start()

    // Gentle cross-fade for form fields
    Animated.sequence([
      Animated.timing(formFadeAnim, {
        toValue: 0.25,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(formFadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleComplete = async () => {
    setErrorMessage(null)
    const finalEmail = email.trim()
    const finalPassword = password

    if (!finalEmail) {
      setErrorMessage('Please enter your email.')
      return
    }
    if (!finalPassword) {
      setErrorMessage('Please enter your password.')
      return
    }

    setIsSubmitting(true)
    try {
      if (activeTab === 'signup') {
        const finalName = name.trim() || 'Alex River'
        const res = await registerUser(finalName, finalEmail, finalPassword)
        if (res.success && res.user) {
          onSuccess({ name: res.user.name, email: res.user.email })
        } else {
          setErrorMessage(res.error || 'Unable to create account.')
        }
      } else {
        const res = await loginUser(finalEmail, finalPassword)
        if (res.success && res.user) {
          onSuccess({ name: res.user.name, email: res.user.email })
        } else {
          setErrorMessage(res.error || 'Invalid email or password.')
        }
      }
    } catch {
      setErrorMessage('Backend connection error.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInstantDemo = () => {
    onSuccess({ name: 'Alex River', email: 'alex.river@example.com' })
  }

  return (
    <SafeAreaView style={[styles.screenWrapper, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          {/* Top Bar (Positioned slightly lower down) */}
          <View>
            <View style={styles.topBar}>
              <View style={styles.logoBrandRow}>
                <Text style={styles.logoGlyph}>🌤️</Text>
                <Text style={[styles.logoText, { color: colors.textPrimary }]}>Mausam</Text>
              </View>

              {onToggleTheme && (
                <Pressable
                  onPress={onToggleTheme}
                  style={[styles.themeToggleBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                  hitSlop={8}
                >
                  <Text style={{ fontSize: 18 }}>{theme === 'dark' ? '☀️' : '🌙'}</Text>
                </Pressable>
              )}
            </View>

            {/* 3 Horizontal Dashes: Can only navigate BACKWARD, not forward */}
            <View style={styles.progressBarContainer}>
              <Pressable
                onPress={() => {
                  if (currentStep > 1) animateToStep(1)
                }}
                disabled={currentStep <= 1}
                style={styles.progressBarItem}
                hitSlop={12}
              >
                <View
                  style={[
                    styles.progressBarTrack,
                    { backgroundColor: colors.accent },
                  ]}
                />
              </Pressable>

              <Pressable
                onPress={() => {
                  if (currentStep > 2) animateToStep(2)
                }}
                disabled={currentStep <= 2}
                style={styles.progressBarItem}
                hitSlop={12}
              >
                <View
                  style={[
                    styles.progressBarTrack,
                    { backgroundColor: currentStep >= 2 ? colors.accent : colors.border },
                  ]}
                />
              </Pressable>

              <Pressable
                disabled={true}
                style={styles.progressBarItem}
                hitSlop={12}
              >
                <View
                  style={[
                    styles.progressBarTrack,
                    { backgroundColor: currentStep === 3 ? colors.accent : colors.border },
                  ]}
                />
              </Pressable>
            </View>
          </View>

          {/* Animated Main Content Body (No Scroll, airy and spacious) */}
          <Animated.View
            style={[
              styles.bodyArea,
              {
                opacity: pageFadeAnim,
                transform: [{ translateY: pageSlideAnim }],
              },
            ]}
          >
            {/* ====================================================
                PAGE 1: ABOUT MAUSAM
               ==================================================== */}
            {currentStep === 1 && (
              <View>
                <Text style={[styles.kicker, { color: colors.accent }]}>Atmospheric Intelligence</Text>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                  Weather Tuned to Motion
                </Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>
                  Mausam calculates hyper-local satellite winds, swell, air density, and UV telemetry to identify prime performance windows for outdoor athletes.
                </Text>

                <View style={styles.featuresBlock}>
                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>🛰️</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>Satellite Precision</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        Micro-climate resolution modeled directly to your coordinates.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>⚡</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>Zero-Latency Response</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        0ms cached boot with crash-proof offline fallbacks.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>🛡️</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>On-Device Privacy</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        GPS processed strictly on device. No tracking or location sales.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* ====================================================
                PAGE 2: FEATURES & POLICY (No Back Button)
               ==================================================== */}
            {currentStep === 2 && (
              <View>
                <Text style={[styles.kicker, { color: colors.accent }]}>Core Capabilities</Text>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                  Built for Outdoor Precision
                </Text>

                <View style={styles.featuresBlock}>
                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>🏄</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>Readiness Scoring</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        Live suitability scores for surf, cycling, running, and trail sports.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>⏱️</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>Prime Time Windows</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        Highlights exact morning & evening slots for peak conditions.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>🍃</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>AQI & Emergency Radar</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        Continuous PM2.5 monitoring and severe gale/storm warnings.
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Compact Privacy Acceptance */}
                <View style={[styles.privacyCompact, { borderTopColor: colors.border }]}>
                  <Pressable
                    onPress={() => setPolicyAccepted(!policyAccepted)}
                    style={styles.consentRow}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        { borderColor: colors.border, backgroundColor: colors.card },
                        policyAccepted && { backgroundColor: colors.accent, borderColor: colors.accent },
                      ]}
                    >
                      {policyAccepted && <Text style={[styles.checkmark, { color: '#FFFFFF' }]}>✓</Text>}
                    </View>
                    <Text style={[styles.consentLabel, { color: colors.textPrimary }]}>
                      I agree to the Terms of Usage and Privacy Policy.
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* ====================================================
                PAGE 3: SIGN IN / CREATE ACCOUNT (No Back Button)
               ==================================================== */}
            {currentStep === 3 && (
              <View>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                  {activeTab === 'signup' ? 'Create Account' : 'Welcome Back'}
                </Text>

                {/* Tab Switcher with animated sliding indicator */}
                <View
                  onLayout={(e) => setTabRowWidth(e.nativeEvent.layout.width)}
                  style={[styles.tabRow, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  {tabRowWidth > 0 && (
                    <Animated.View
                      style={[
                        styles.tabIndicator,
                        {
                          width: (tabRowWidth - 6) / 2,
                          backgroundColor: colors.accent,
                          transform: [
                            {
                              translateX: tabIndicatorAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, (tabRowWidth - 6) / 2],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  )}

                  <Pressable
                    onPress={() => handleTabChange('signup')}
                    style={styles.tabBtn}
                  >
                    <Text
                      style={[
                        styles.tabBtnText,
                        { color: colors.textMuted },
                        activeTab === 'signup' && { color: '#FFFFFF', fontWeight: '800' },
                      ]}
                    >
                      Sign Up
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleTabChange('login')}
                    style={styles.tabBtn}
                  >
                    <Text
                      style={[
                        styles.tabBtnText,
                        { color: colors.textMuted },
                        activeTab === 'login' && { color: '#FFFFFF', fontWeight: '800' },
                      ]}
                    >
                      Sign In
                    </Text>
                  </Pressable>
                </View>

                {/* Error Banner */}
                {errorMessage && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.dangerBg,
                      borderColor: colors.dangerBorder,
                      borderWidth: 1,
                      borderRadius: 12,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      marginBottom: 10,
                      gap: 6,
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>⚠️</Text>
                    <Text style={{ flex: 1, fontSize: 12, color: colors.danger, fontWeight: '600' }}>
                      {errorMessage}
                    </Text>
                  </View>
                )}

                {/* Clean Form with subtle fade transition */}
                <Animated.View style={[styles.formFields, { opacity: formFadeAnim }]}>
                  {activeTab === 'signup' && (
                    <View style={styles.fieldGroup}>
                      <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Full Name</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: colors.card,
                            borderColor: focusedField === 'name' ? colors.accent : colors.border,
                            color: colors.textPrimary,
                          },
                        ]}
                        value={name}
                        onChangeText={(t) => { setName(t); setErrorMessage(null); }}
                        placeholder="Alex River"
                        placeholderTextColor={colors.textMuted}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                  )}

                  <View style={styles.fieldGroup}>
                    <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Email</Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: colors.card,
                          borderColor: focusedField === 'email' ? colors.accent : colors.border,
                          color: colors.textPrimary,
                        },
                      ]}
                      value={email}
                      onChangeText={(t) => { setEmail(t); setErrorMessage(null); }}
                      placeholder="alex.river@example.com"
                      placeholderTextColor={colors.textMuted}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Password</Text>
                    <View style={styles.passwordInputRow}>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: colors.card,
                            borderColor: focusedField === 'password' ? colors.accent : colors.border,
                            color: colors.textPrimary,
                            paddingRight: 44,
                          },
                        ]}
                        value={password}
                        onChangeText={(t) => { setPassword(t); setErrorMessage(null); }}
                        placeholder="••••••••••••"
                        placeholderTextColor={colors.textMuted}
                        secureTextEntry={!showPassword}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.passwordEye}
                        hitSlop={8}
                      >
                        <Text style={{ fontSize: 16 }}>{showPassword ? '👁️' : '🔒'}</Text>
                      </Pressable>
                    </View>
                  </View>
                </Animated.View>
              </View>
            )}
          </Animated.View>

          {/* Bottom Actions Area (Always visible) */}
          <View style={styles.actionsSection}>
            {currentStep === 1 && (
              <Pressable
                onPress={() => animateToStep(2)}
                style={[styles.primaryBtn, { backgroundColor: colors.accent }]}
              >
                <Text style={styles.primaryBtnText}>Proceed to Features & Policy →</Text>
              </Pressable>
            )}

            {currentStep === 2 && (
              <Pressable
                onPress={() => animateToStep(3)}
                disabled={!policyAccepted}
                style={[
                  styles.primaryBtn,
                  { backgroundColor: colors.accent },
                  !policyAccepted && styles.primaryBtnDisabled,
                ]}
              >
                <Text style={styles.primaryBtnText}>Proceed to Sign In / Sign Up →</Text>
              </Pressable>
            )}

            {currentStep === 3 && (
              <Pressable
                onPress={handleComplete}
                disabled={isSubmitting}
                style={[
                  styles.primaryBtn,
                  { backgroundColor: colors.accent },
                  isSubmitting && { opacity: 0.7 },
                ]}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryBtnText}>
                    {activeTab === 'signup' ? 'Proceed to Activity Preferences' : 'Sign In'}
                  </Text>
                )}
              </Pressable>
            )}

            <Pressable
              onPress={handleInstantDemo}
              style={styles.guestBtn}
            >
              <Text style={[styles.guestBtnText, { color: colors.textMuted }]}>
                Continue as Guest
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
