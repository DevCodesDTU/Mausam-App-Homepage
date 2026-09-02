import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#9875F8',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  authGlassCard: {
    width: '100%',
    borderRadius: 32,
    paddingVertical: 26,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.90)',
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  heroBadge: {
    backgroundColor: 'rgba(109, 40, 217, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.20)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 8,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  artContainer: {
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2E1065',
    letterSpacing: -0.5,
    marginTop: 2,
    textAlign: 'center',
  },
  appTagline: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },

  // Step 1: Instruction Cards
  instructionsContainer: {
    width: '100%',
    marginVertical: 12,
    gap: 10,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.60)',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    gap: 12,
  },
  instructionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(109, 40, 217, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.15)',
  },
  instructionIcon: {
    fontSize: 18,
  },
  instructionTextCol: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#2E1065',
    marginBottom: 2,
  },
  instructionDesc: {
    fontSize: 11.5,
    color: '#6B7280',
    lineHeight: 16,
    fontWeight: '500',
  },

  // Privacy Policy Acceptance Box
  policyCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    marginTop: 6,
    marginBottom: 16,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.8,
    borderColor: '#7C3AED',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxSquareActive: {
    backgroundColor: '#6D28D9',
    borderColor: '#6D28D9',
  },
  checkMarkText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  policyTextCol: {
    flex: 1,
  },
  policyText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 17,
    fontWeight: '500',
  },
  policyLinkText: {
    color: '#6D28D9',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },

  // Step 2 Header & Back Button
  step2Header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(109, 40, 217, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.18)',
    gap: 6,
  },
  backBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#6D28D9',
  },

  // Segmented Tab Switcher (Matching Glass Tone)
  tabSwitcher: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(109, 40, 217, 0.08)',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.12)',
    marginBottom: 18,
    position: 'relative',
    height: 48,
  },
  activeIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: '50%',
    backgroundColor: '#6D28D9',
    borderRadius: 16,
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#6D28D9',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // Form Fields
  formSection: {
    width: '100%',
  },
  animatedFieldWrapper: {
    overflow: 'hidden',
  },
  inputGroup: {
    marginBottom: 14,
    width: '100%',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
    marginBottom: 6,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.60)',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 14,
    height: 50,
  },
  inputWrapperFocused: {
    borderColor: '#7C3AED',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14.5,
    color: '#2E1065',
    fontWeight: '600',
    paddingVertical: 0,
  },
  visibilityToggle: {
    padding: 6,
  },
  visibilityText: {
    fontSize: 14,
  },

  // Forgot password
  forgotPasswordRow: {
    alignItems: 'flex-end',
    marginBottom: 14,
    marginTop: -4,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7C3AED',
  },

  // Primary CTA Button
  primaryCtaBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#5B21B6',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B0764',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
    marginTop: 4,
  },
  primaryCtaBtnDisabled: {
    backgroundColor: 'rgba(109, 40, 217, 0.45)',
    shadowOpacity: 0.1,
  },
  primaryBtnText: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(109, 40, 217, 0.12)',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
    paddingHorizontal: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Quick Demo Button
  guestBtn: {
    width: '100%',
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.60)',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  guestBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6D28D9',
  },
  guestBtnIcon: {
    fontSize: 14,
  },

  // Privacy Policy Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(46, 16, 101, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.98)',
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE9FE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2E1065',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#6D28D9',
  },
  modalScroll: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6D28D9',
    marginTop: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  modalBodyText: {
    fontSize: 12.5,
    color: '#4B5563',
    lineHeight: 18,
    marginBottom: 8,
  },
  modalCloseActionBtn: {
    width: '100%',
    height: 46,
    borderRadius: 23,
    backgroundColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
})
