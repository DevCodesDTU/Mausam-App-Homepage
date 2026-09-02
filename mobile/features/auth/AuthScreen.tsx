import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Easing,
  Modal,
} from 'react-native'
import { WeatherArt } from '../../components/WeatherArt'
import { GlassCard } from '../../components/GlassCard'
import { styles } from './AuthScreen.styles'

interface AuthScreenProps {
  onSuccess: (userData: { name: string; email: string }) => void
}

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  // Navigation step: 'welcome' (Step 1: Usage & Policy) | 'account' (Step 2: Form)
  const [step, setStep] = useState<'welcome' | 'account'>('welcome')
  const [policyAccepted, setPolicyAccepted] = useState(false)
  const [showPolicyModal, setShowPolicyModal] = useState(false)

  // Account Form State
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup')
  const [name, setName] = useState('Alex River')
  const [email, setEmail] = useState('alex.river@example.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Animation References
  const mountAnim = useRef(new Animated.Value(0)).current
  const floatAnim = useRef(new Animated.Value(0)).current
  const stepSlideAnim = useRef(new Animated.Value(0)).current
  const tabAnim = useRef(new Animated.Value(0)).current // 0 = signup, 1 = login
  const nameFieldAnim = useRef(new Animated.Value(1)).current
  const btnScale = useRef(new Animated.Value(1)).current

  // Mount Animation
  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      tension: 60,
      friction: 9,
      useNativeDriver: true,
    }).start()
  }, [])

  // Floating Weather Art Animation
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [])

  // Transition from Step 1 (Welcome) to Step 2 (Account)
  const goToAccountStep = () => {
    if (!policyAccepted) return
    Animated.timing(stepSlideAnim, {
      toValue: 1,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setStep('account')
      stepSlideAnim.setValue(0)
    })
  }

  const goBackToWelcome = () => {
    setStep('welcome')
  }

  // Switch between Sign Up and Login tabs
  const switchTab = (tab: 'signup' | 'login') => {
    if (tab === activeTab) return
    setActiveTab(tab)

    Animated.parallel([
      Animated.spring(tabAnim, {
        toValue: tab === 'login' ? 1 : 0,
        tension: 80,
        friction: 10,
        useNativeDriver: false,
      }),
      Animated.timing(nameFieldAnim, {
        toValue: tab === 'signup' ? 1 : 0,
        duration: 240,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start()
  }

  // Button Press Springs
  const handlePressIn = () => {
    Animated.spring(btnScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(btnScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start()
  }

  const handleSubmit = () => {
    const finalName = activeTab === 'signup' ? (name.trim() || 'Alex River') : 'Alex River'
    const finalEmail = email.trim() || 'alex.river@example.com'
    onSuccess({ name: finalName, email: finalEmail })
  }

  const handleInstantDemo = () => {
    onSuccess({ name: 'Alex River', email: 'alex.river@example.com' })
  }

  const tabLeftPosition = tabAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  })

  const nameHeight = nameFieldAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 74],
  })

  const nameOpacity = nameFieldAnim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0, 1],
  })

  return (
    <KeyboardAvoidingView
      style={styles.screenWrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.cardContainer,
            {
              opacity: mountAnim,
              transform: [
                {
                  scale: mountAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.94, 1],
                  }),
                },
                {
                  translateY: mountAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <GlassCard style={styles.authGlassCard}>
            {/* Top Shared Hero Art */}
            <View style={styles.heroSection}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>✦ Live Atmospheric Insights</Text>
              </View>

              <Animated.View
                style={[
                  styles.artContainer,
                  { transform: [{ translateY: floatAnim }] },
                ]}
              >
                <WeatherArt type="cloudy-sun" size="medium" />
              </Animated.View>

              <Text style={styles.appName}>Mausam</Text>
              <Text style={styles.appTagline}>
                Personalized outdoor intelligence for your daily passions
              </Text>
            </View>

            {/* STEP 1: Instructions & Privacy Acceptance */}
            {step === 'welcome' && (
              <View style={{ width: '100%' }}>
                {/* 3 Clear Human Usage Instructions */}
                <View style={styles.instructionsContainer}>
                  <View style={styles.instructionItem}>
                    <View style={styles.instructionIconCircle}>
                      <Text style={styles.instructionIcon}>🏄</Text>
                    </View>
                    <View style={styles.instructionTextCol}>
                      <Text style={styles.instructionTitle}>Custom Passion Scoring</Text>
                      <Text style={styles.instructionDesc}>
                        Live conditions scored for surfing, cycling, running, and outdoor sports.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.instructionItem}>
                    <View style={styles.instructionIconCircle}>
                      <Text style={styles.instructionIcon}>⏱️</Text>
                    </View>
                    <View style={styles.instructionTextCol}>
                      <Text style={styles.instructionTitle}>Optimal Time Windows</Text>
                      <Text style={styles.instructionDesc}>
                        Pinpoint the exact morning or afternoon hours with ideal wind & temperature.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.instructionItem}>
                    <View style={styles.instructionIconCircle}>
                      <Text style={styles.instructionIcon}>⚡</Text>
                    </View>
                    <View style={styles.instructionTextCol}>
                      <Text style={styles.instructionTitle}>Safety & UV Alerts</Text>
                      <Text style={styles.instructionDesc}>
                        Real-time alerts for gust peaks, rain showers, and sun protection advisories.
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Privacy & Terms Acceptance Checkbox */}
                <Pressable
                  onPress={() => setPolicyAccepted(!policyAccepted)}
                  style={styles.policyCard}
                >
                  <View style={styles.policyRow}>
                    <View
                      style={[
                        styles.checkboxSquare,
                        policyAccepted && styles.checkboxSquareActive,
                      ]}
                    >
                      {policyAccepted && <Text style={styles.checkMarkText}>✓</Text>}
                    </View>
                    <View style={styles.policyTextCol}>
                      <Text style={styles.policyText}>
                        I agree to the{' '}
                        <Text
                          style={styles.policyLinkText}
                          onPress={() => setShowPolicyModal(true)}
                        >
                          Privacy Policy
                        </Text>{' '}
                        and understand that Mausam uses real-time atmospheric data to optimize recommendations.
                      </Text>
                    </View>
                  </View>
                </Pressable>

                {/* Continue CTA Button */}
                <Animated.View style={{ transform: [{ scale: btnScale }] }}>
                  <Pressable
                    onPress={goToAccountStep}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={!policyAccepted}
                    style={[
                      styles.primaryCtaBtn,
                      !policyAccepted && styles.primaryCtaBtnDisabled,
                    ]}
                  >
                    <Text style={styles.primaryBtnText}>
                      {policyAccepted ? 'Continue to Account →' : 'Accept Terms to Continue'}
                    </Text>
                  </Pressable>
                </Animated.View>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Quick Instant Demo Access */}
                <Pressable
                  onPress={handleInstantDemo}
                  style={styles.guestBtn}
                >
                  <Text style={styles.guestBtnIcon}>⚡</Text>
                  <Text style={styles.guestBtnText}>Skip & Explore Instant Demo</Text>
                </Pressable>
              </View>
            )}

            {/* STEP 2: Account Creation & Sign In */}
            {step === 'account' && (
              <View style={{ width: '100%' }}>
                {/* Back to Step 1 Button */}
                <View style={styles.step2Header}>
                  <Pressable onPress={goBackToWelcome} style={styles.backBtn} hitSlop={8}>
                    <Text style={styles.backBtnText}>← Back to Overview</Text>
                  </Pressable>
                </View>

                {/* Segmented Tab Switcher */}
                <View style={styles.tabSwitcher}>
                  <Animated.View
                    style={[
                      styles.activeIndicator,
                      { left: tabLeftPosition },
                    ]}
                  />

                  <Pressable
                    onPress={() => switchTab('signup')}
                    style={styles.tabBtn}
                    hitSlop={8}
                  >
                    <Text
                      style={[
                        styles.tabBtnText,
                        activeTab === 'signup' && styles.tabBtnTextActive,
                      ]}
                    >
                      Create Account
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => switchTab('login')}
                    style={styles.tabBtn}
                    hitSlop={8}
                  >
                    <Text
                      style={[
                        styles.tabBtnText,
                        activeTab === 'login' && styles.tabBtnTextActive,
                      ]}
                    >
                      Sign In
                    </Text>
                  </Pressable>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                  {activeTab === 'signup' && (
                    <Animated.View
                      style={[
                        styles.animatedFieldWrapper,
                        {
                          height: nameHeight,
                          opacity: nameOpacity,
                        },
                      ]}
                    >
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <View
                          style={[
                            styles.inputWrapper,
                            focusedField === 'name' && styles.inputWrapperFocused,
                          ]}
                        >
                          <Text style={styles.inputIcon}>👤</Text>
                          <TextInput
                            style={styles.textInput}
                            placeholder="Your full name"
                            placeholderTextColor="#9CA3AF"
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            autoCapitalize="words"
                          />
                        </View>
                      </View>
                    </Animated.View>
                  )}

                  {/* Email Field */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        focusedField === 'email' && styles.inputWrapperFocused,
                      ]}
                    >
                      <Text style={styles.inputIcon}>✉️</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="name@example.com"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                  </View>

                  {/* Password Field */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        focusedField === 'password' && styles.inputWrapperFocused,
                      ]}
                    >
                      <Text style={styles.inputIcon}>🔒</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.visibilityToggle}
                        hitSlop={8}
                      >
                        <Text style={styles.visibilityText}>
                          {showPassword ? '👁️' : '👁️‍🗨️'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>

                  {activeTab === 'login' && (
                    <View style={styles.forgotPasswordRow}>
                      <Pressable hitSlop={6}>
                        <Text style={styles.forgotPasswordText}>
                          Forgot Password?
                        </Text>
                      </Pressable>
                    </View>
                  )}

                  {/* CTA Submit Button */}
                  <Animated.View style={{ transform: [{ scale: btnScale }] }}>
                    <Pressable
                      onPress={handleSubmit}
                      onPressIn={handlePressIn}
                      onPressOut={handlePressOut}
                      style={styles.primaryCtaBtn}
                    >
                      <Text style={styles.primaryBtnText}>
                        {activeTab === 'signup' ? 'Complete Registration →' : 'Sign In →'}
                      </Text>
                    </Pressable>
                  </Animated.View>
                </View>
              </View>
            )}
          </GlassCard>
        </Animated.View>
      </ScrollView>

      {/* Privacy Policy & Terms Modal */}
      <Modal
        visible={showPolicyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPolicyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Privacy & Data Policy</Text>
              <Pressable
                onPress={() => setShowPolicyModal(false)}
                style={styles.modalCloseBtn}
                hitSlop={8}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalSectionTitle}>1. Atmospheric Intelligence</Text>
              <Text style={styles.modalBodyText}>
                Mausam calculates activity match scores, wind safety metrics, and optimal hourly windows using real-time atmospheric data.
              </Text>

              <Text style={styles.modalSectionTitle}>2. Location Privacy</Text>
              <Text style={styles.modalBodyText}>
                Your device location is used solely to query local weather forecasts. We never sell, track, or share your movement history.
              </Text>

              <Text style={styles.modalSectionTitle}>3. Account Security</Text>
              <Text style={styles.modalBodyText}>
                Your credentials and activity preferences are securely stored and encrypted. You can modify or remove your profile at any time.
              </Text>
            </ScrollView>

            <Pressable
              onPress={() => setShowPolicyModal(false)}
              style={styles.modalCloseActionBtn}
            >
              <Text style={styles.modalCloseActionText}>Understood</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  )
}
