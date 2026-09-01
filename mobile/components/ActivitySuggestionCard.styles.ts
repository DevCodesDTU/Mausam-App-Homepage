import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    padding: 18,
    marginTop: 14,
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerIcon: {
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6D28D9',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  matchBadge: {
    backgroundColor: 'rgba(109, 40, 217, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.3)',
  },
  matchBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
  },
  mainSuggestionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  activityBigIcon: {
    fontSize: 26,
  },
  textColumn: {
    flex: 1,
  },
  suggestionHeadline: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2E1065',
    lineHeight: 20,
    marginBottom: 2,
  },
  suggestionSub: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  otherActivitiesSection: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(109, 40, 217, 0.08)',
  },
  otherTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
    marginBottom: 8,
  },
  otherPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  miniPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    gap: 5,
  },
  miniIcon: {
    fontSize: 13,
  },
  miniName: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#374151',
  },
  miniScore: {
    fontSize: 11,
    fontWeight: '800',
  },
  scoreGood: {
    color: '#10B981',
  },
  scoreFair: {
    color: '#F59E0B',
  },
  manageLink: {
    marginTop: 10,
    alignSelf: 'center',
  },
  manageLinkText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#7C3AED',
  },
})

