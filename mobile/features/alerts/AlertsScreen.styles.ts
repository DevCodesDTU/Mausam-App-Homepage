import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 90,
    alignItems: 'center',
  },
  mainCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 36,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: 'rgba(109, 40, 217, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2E1065',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12.5,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 17,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    gap: 12,
    marginBottom: 20,
  },
  alertBannerIcon: {
    fontSize: 24,
  },
  alertBannerContent: {
    flex: 1,
  },
  alertBannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 2,
  },
  alertBannerDesc: {
    fontSize: 11,
    color: '#B45309',
    lineHeight: 15,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6D28D9',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 4,
  },
  activityWindowCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 10,
  },
  actTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actIcon: {
    fontSize: 22,
  },
  actName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2E1065',
  },
  actCategory: {
    fontSize: 11,
    color: '#6B7280',
  },
  conditionTag: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  conditionTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#065F46',
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 8,
  },
  slotItem: {
    alignItems: 'center',
  },
  slotLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
  },
  slotTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  slotMetric: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D28D9',
  },
  slotDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
  },
  gaugesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  gaugeBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  gaugeIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  gaugeVal: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#2E1065',
    textAlign: 'center',
  },
  gaugeSub: {
    fontSize: 9.5,
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 40,
  },
})

