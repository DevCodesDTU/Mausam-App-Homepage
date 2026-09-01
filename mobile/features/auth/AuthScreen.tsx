import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { WeatherArt } from '../../components/WeatherArt'
import { GlassCard } from '../../components/GlassCard'
import { styles } from './AuthScreen.styles'

interface AuthScreenProps {
  onSuccess: (userData: { name: string; email: string }) => void
}

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<'splash' | 'login' | 'signup'>('splash')
  const [name, setName] = useState('Alex River')
  const [email, setEmail] = useState('alex.river@example.com')
  const [password, setPassword] = useState('••••••••')

  const handleStart = () => {
    onSuccess({ name: name.trim() || 'Alex River', email: email.trim() })
  }

  return (
    <KeyboardAvoidingView
      style={styles.screenWrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mode === 'splash' ? (
          /* Splash Screen — Pixel-perfect match to Screen 1 in design */
          <View style={styles.splashCardOuter}>
            <GlassCard style={styles.splashCard}>
              {/* Central 3D Weather Art */}
              <View style={styles.heroArtBox}>
                <WeatherArt type="cloudy-sun" size="large" />
              </View>

              {/* Main Headline */}
              <View style={styles.textContainer}>
                <Text style={styles.titleLine1}>Mausam</Text>
              </View>

              {/* Get Start Action Pill */}
              <View style={styles.actionsContainer}>
                <Pressable
                  onPress={() => setMode('signup')}
                  style={({ pressed }) => [
                    styles.primaryPillBtn,
                    pressed && styles.btnPressed,
                  ]}
                >
                  <Text style={styles.primaryBtnText}>Get Start</Text>
                </Pressable>

                <Pressable
                  onPress={() => setMode('login')}
                  style={styles.secondaryLink}
                >
                  <Text style={styles.secondaryLinkText}>Create an account</Text>
                </Pressable>
              </View>
            </GlassCard>
          </View>
        ) : (
          /* Login / Sign Up Form Screen */
          <View style={styles.formCardOuter}>
            <GlassCard style={styles.formCard}>
              <View style={styles.formHeader}>
                <Pressable
                  onPress={() => setMode('splash')}
                  style={styles.backButton}
                >
                  <Text style={styles.backButtonText}>←</Text>
                </Pressable>
                <Text style={styles.formHeaderTitle}>
                  {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                </Text>
              </View>

              <View style={styles.formArtBox}>
                <WeatherArt type="cloudy-sun" size="small" />
              </View>

              {mode === 'signup' && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your name"
                    placeholderTextColor="#A78BFA"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="name@domain.com"
                  placeholderTextColor="#A78BFA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#A78BFA"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <Pressable
                onPress={handleStart}
                style={({ pressed }) => [
                  styles.primaryPillBtn,
                  styles.formBtn,
                  pressed && styles.btnPressed,
                ]}
              >
                <Text style={styles.primaryBtnText}>
                  {mode === 'signup' ? 'Get Started →' : 'Sign In →'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                style={styles.switchModeLink}
              >
                <Text style={styles.switchModeText}>
                  {mode === 'signup'
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Create one"}
                </Text>
              </Pressable>
            </GlassCard>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
