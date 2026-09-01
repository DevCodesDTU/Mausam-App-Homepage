import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 100,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 36,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  tabButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(109, 40, 217, 0.12)',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 32,
    width: 32,
  },
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6D28D9',
  },
  alertBadgeDot: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  // Minimalist Home Icon Drawing
  homeIconShape: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
  },
  homeRoof: {
    width: 14,
    height: 14,
    borderTopWidth: 2.2,
    borderLeftWidth: 2.2,
    borderColor: '#6B7280',
    transform: [{ rotate: '45deg' }],
    marginBottom: -6,
  },
  homeBase: {
    width: 16,
    height: 11,
    borderWidth: 2.2,
    borderTopWidth: 0,
    borderColor: '#6B7280',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  homeDoor: {
    width: 4,
    height: 5,
    backgroundColor: '#6B7280',
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
  },

  // Minimalist Bell Icon Drawing
  bellIconShape: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
  },
  bellDome: {
    width: 14,
    height: 12,
    borderWidth: 2.2,
    borderBottomWidth: 0,
    borderColor: '#6B7280',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  bellRim: {
    width: 18,
    height: 3,
    borderWidth: 2.2,
    borderColor: '#6B7280',
    borderRadius: 1.5,
  },
  bellClapper: {
    width: 4,
    height: 2,
    backgroundColor: '#6B7280',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginTop: 1,
  },

  // Minimalist User Icon Drawing
  userIconShape: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
  },
  userHead: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 2.2,
    borderColor: '#6B7280',
    marginBottom: 2,
  },
  userBody: {
    width: 16,
    height: 8,
    borderWidth: 2.2,
    borderColor: '#6B7280',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  // Active Highlight Styles
  activeStroke: {
    borderColor: '#6D28D9',
  },
  activeFill: {
    backgroundColor: '#6D28D9',
  },
})

