import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 10,
    marginLeft: 4,
  },
  scrollList: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 10,
    paddingBottom: 4,
  },
  dayPill: {
    width: 62,
    height: 108,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderWidth: 1.5,
  },
  dayPillActive: {
    backgroundColor: '#6D28D9',
    borderColor: '#7C3AED',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  dayPillInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dayLabelActive: {
    color: '#FFFFFF',
  },
  dayLabelInactive: {
    color: '#6B7280',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FDE047',
    marginVertical: 4,
  },
  weatherIcon: {
    fontSize: 18,
  },
  highTempText: {
    fontSize: 13,
    fontWeight: '800',
  },
  lowTempText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tempActive: {
    color: '#FFFFFF',
  },
  tempInactive: {
    color: '#4B5563',
  },
  lowTempActive: {
    color: '#DDD6FE',
  },
  lowTempInactive: {
    color: '#9CA3AF',
  },
})

