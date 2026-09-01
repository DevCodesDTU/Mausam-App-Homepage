import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 14,
  },
  chartWrapper: {
    height: 48,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  waveLineBase: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 2.5,
    backgroundColor: '#7C3AED',
    borderRadius: 2,
    top: 22,
    opacity: 0.85,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    position: 'relative',
    height: '100%',
  },
  dotColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  dotPlacement: {
    position: 'absolute',
  },
  normalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7C3AED',
  },
  activeDotOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(124, 58, 237, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#7C3AED',
  },
  activeDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6D28D9',
  },
  timeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 6,
  },
  timeItem: {
    flex: 1,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#6B7280',
  },
  timeTextActive: {
    color: '#6D28D9',
    fontWeight: '800',
  },
  activeInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 6,
  },
  activeInfoTime: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeInfoTemp: {
    fontSize: 11,
    color: '#4C1D95',
    fontWeight: '700',
  },
})

