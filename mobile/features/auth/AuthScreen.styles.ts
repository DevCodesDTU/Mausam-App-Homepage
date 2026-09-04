import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: Platform.OS === 'android' ? 28 : 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  // Top Minimalist Header (Positioned slightly lower down)
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 2,
  },
  logoBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  logoGlyph: {
    fontSize: 23,
  },
  logoText: {
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  themeToggleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 3-Segment Interactive Horizontal Dashes (Clickable navigation)
  progressBarContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
    paddingVertical: 4,
  },
  progressBarItem: {
    flex: 1,
    paddingVertical: 6,
  },
  progressBarTrack: {
    height: 3.5,
    borderRadius: 2,
  },

  // Main Content Area (Spacious & Clean with title slightly down)
  bodyArea: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },

  // Editorial Typography (Title sits slightly lower down)
  kicker: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 34,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 26,
  },

  // Clean Info Rows with increased spacing
  featuresBlock: {
    gap: 20,
    marginBottom: 22,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  featureIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  featureIconText: {
    fontSize: 19,
  },
  featureTextCol: {
    flex: 1,
    paddingTop: 1,
  },
  featureHeading: {
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  featureBody: {
    fontSize: 12.5,
    lineHeight: 17,
  },

  // Compact Clean Privacy Acceptance
  privacyCompact: {
    paddingTop: 16,
    borderTopWidth: 1,
    marginTop: 8,
    marginBottom: 10,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 12,
    fontWeight: '900',
  },
  consentLabel: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },

  // Tab Switcher (Sign Up / Sign In)
  // Tab Switcher (Sign Up / Sign In with animated sliding indicator)
  tabRow: {
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 14,
    padding: 3,
    marginBottom: 18,
    borderWidth: 1,
    height: 44,
  },
  tabIndicator: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 3,
    borderRadius: 11,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Form Fields (Clean & spacious)
  formFields: {
    gap: 14,
    marginBottom: 18,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    height: 48,
    borderRadius: 13,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 14.5,
    fontWeight: '500',
  },
  passwordInputRow: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordEye: {
    position: 'absolute',
    right: 14,
    height: 48,
    justifyContent: 'center',
  },

  // Bottom Actions
  actionsSection: {
    paddingTop: 10,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  primaryBtnDisabled: {
    opacity: 0.35,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  guestBtn: {
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
})
