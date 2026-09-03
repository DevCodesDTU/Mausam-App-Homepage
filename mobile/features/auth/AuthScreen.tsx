import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native'
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
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [policyAccepted, setPolicyAccepted] = useState(false)

  // Form states
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup')
  const [name, setName] = useState('Alex River')
  const [email, setEmail] = useState('alex.river@example.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const colors = themes[theme]

  const handleComplete = () => {
    const finalName = activeTab === 'signup' ? name.trim() || 'Alex River' : 'Alex River'
    const finalEmail = email.trim() || 'alex.river@example.com'
    onSuccess({ name: finalName, email: finalEmail })
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Top Minimalist Brand Header */}
            <View style={styles.topBar}>
              <View style={styles.logoBrandRow}>
                <Text style={styles.logoGlyph}>🌤️</Text>
                <Text style={[styles.logoText, { color: colors.textPrimary }]}>Mausam</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {onToggleTheme && (
                  <Pressable
                    onPress={onToggleTheme}
                    style={[styles.stepPill, { backgroundColor: colors.card, borderColor: colors.border }]}
                    hitSlop={8}
                  >
                    <Text style={{ fontSize: 13 }}>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</Text>
                  </Pressable>
                )}

                <View style={[styles.stepPill, { backgroundColor: colors.badgeBg, borderColor: colors.border }]}>
                  <Text style={[styles.stepPillText, { color: colors.accent }]}>
                    {currentStep === 1 ? '1. Philosophy' : '2. Profile'}
                  </Text>
                </View>
              </View>
              {onToggleTheme && (
                <Pressable
                  onPress={onToggleTheme}
                  style={[styles.themeToggleBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                  hitSlop={8}
                >
                  <Text style={{ fontSize: 16 }}>{theme === 'dark' ? '☀️' : '🌙'}</Text>
                </Pressable>
              )}
            </View>

            {/* Minimalist Progress Track */}
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarTrack,
                  { backgroundColor: colors.accent },
                ]}
              />
              <View
                style={[
                  styles.progressBarTrack,
                  { backgroundColor: currentStep === 2 ? colors.accent : colors.border },
                ]}
              />
            </View>

            {/* PAGE 1: DESCRIPTION, USAGE & PRIVACY */}
            {currentStep === 1 && (
              <View>
                <Text style={[styles.kicker, { color: colors.accent }]}>Atmospheric Intelligence</Text>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                  Weather Tuned to Human Motion
                </Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>
                  Mausam calculates hyper-local satellite winds, swell, and UV telemetry to unlock prime performance hours for your outdoor passions.
                </Text>

                {/* Open Feature Highlights (Clean & breathable, no card wrappers) */}
                <View style={styles.featuresBlock}>
                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>🏄</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>Outdoor Readiness Scoring</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        Calculates real-time condition scores for surfing, road cycling, running, and trail sports.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>⏱️</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>Prime Time Slots</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        Highlights exact morning and evening windows when temperature and wind speeds align best.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.featureItem}>
                    <View style={[styles.featureIconWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={styles.featureIconText}>🚨</Text>
                    </View>
                    <View style={styles.featureTextCol}>
                      <Text style={[styles.featureHeading, { color: colors.textPrimary }]}>Emergency Radar</Text>
                      <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                        Instant heads-up notifications for coastal tsunami advisories, gales, and storm fronts.
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Open Privacy & Terms of Usage Section */}
                <View style={[styles.privacySection, { borderTopColor: colors.border }]}>
                  <View style={styles.privacyTitleRow}>
                    <Text style={{ fontSize: 16 }}>🔒</Text>
                    <Text style={[styles.privacyTitle, { color: colors.textPrimary }]}>
                      Data Privacy Commitment
                    </Text>
                  </View>

                  <Text style={[styles.privacyText, { color: colors.textSecondary }]}>
                    Satellite GPS coordinates are processed exclusively on your device to fetch live meteorological data. We never sell your location or track your profile.
                  </Text>

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

                {/* Continue Action */}
                <Pressable
                  onPress={() => setCurrentStep(2)}
                  disabled={!policyAccepted}
                  style={[
                    styles.primaryBtn,
                    { backgroundColor: colors.accent },
                    !policyAccepted && styles.primaryBtnDisabled,
                  ]}
                >
                  <Text style={styles.primaryBtnText}>Continue to Account Setup →</Text>
                </Pressable>

                <Pressable
                  onPress={handleInstantDemo}
                  style={styles.guestBtn}
                >
                  <Text style={[styles.guestBtnText, { color: colors.textMuted }]}>
                    Skip for Now (Continue as Guest)
                  </Text>
                </Pressable>
              </View>
            )}

            {/* PAGE 2: CLEAN ACCOUNT CREATION */}
            {currentStep === 2 && (
              <View>
                <Pressable
                  onPress={() => setCurrentStep(1)}
                  style={styles.backBtn}
                  hitSlop={8}
                >
                  <Text style={[styles.backBtnText, { color: colors.accent }]}>← Back to Overview</Text>
                </Pressable>

                <Text style={[styles.title, { color: colors.textPrimary }]}>
                  {activeTab === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                </Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>
                  {activeTab === 'signup'
                    ? 'Set up your profile to save custom spots and personalize activity windows.'
                    : 'Sign in to access your saved spots and activity preferences.'}
                </Text>

                {/* Clean Tab Switcher */}
                <View style={[styles.tabRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Pressable
                    onPress={() => setActiveTab('signup')}
                    style={[
                      styles.tabBtn,
                      activeTab === 'signup' && { backgroundColor: colors.accent },
                    ]}
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
                    onPress={() => setActiveTab('login')}
                    style={[
                      styles.tabBtn,
                      activeTab === 'login' && { backgroundColor: colors.accent },
                    ]}
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

                {/* Form Fields */}
                <View style={styles.formFields}>
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
                        onChangeText={setName}
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
                      onChangeText={setEmail}
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
                            paddingRight: 48,
                          },
                        ]}
                        value={password}
                        onChangeText={setPassword}
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
                </View>

                {/* Submit Action */}
                <Pressable
                  onPress={handleComplete}
                  style={[styles.primaryBtn, { backgroundColor: colors.accent }]}
                >
                  <Text style={styles.primaryBtnText}>
                    {activeTab === 'signup' ? 'Continue to Sports Selection →' : 'Sign In & View Horizons →'}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleInstantDemo}
                  style={styles.guestBtn}
                >
                  <Text style={[styles.guestBtnText, { color: colors.textMuted }]}>
                    Skip for Now (Continue as Guest)
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
