import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  splashCardOuter: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  splashCard: {
    width: '100%',
    minHeight: 560,
    borderRadius: 36,
    paddingVertical: 48,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  heroArtBox: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  titleLine1: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(76, 29, 149, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  titleLine2: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(76, 29, 149, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  primaryPillBtn: {
    width: '100%',
    maxWidth: 220,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#5B21B6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B0764',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  btnPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  secondaryLink: {
    paddingVertical: 6,
  },
  secondaryLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EDE9FE',
    letterSpacing: 0.2,
  },

  // Form Mode Styles
  formCardOuter: {
    width: '100%',
    maxWidth: 380,
  },
  formCard: {
    width: '100%',
    borderRadius: 36,
    padding: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(109, 40, 217, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#6D28D9',
  },
  formHeaderTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2E1065',
  },
  formArtBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D28D9',
    marginBottom: 6,
    marginLeft: 4,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#2E1065',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    fontWeight: '600',
  },
  formBtn: {
    maxWidth: '100%',
    marginTop: 10,
  },
  switchModeLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchModeText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#6D28D9',
  },
})

