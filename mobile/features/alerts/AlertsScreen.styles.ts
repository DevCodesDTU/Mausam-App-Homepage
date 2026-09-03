import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080B11',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 110,
  },
  mainCard: {
    backgroundColor: '#0F1524',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    marginBottom: 16,
  },
  header: {
    marginBottom: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#F8FAFC',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 18,
  },

  // Severe Alert Banner
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1215',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EF4444',
    marginBottom: 18,
    gap: 12,
  },
  alertBannerIcon: {
    fontSize: 22,
  },
  alertBannerContent: {
    flex: 1,
  },
  alertBannerTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#F87171',
    marginBottom: 2,
  },
  alertBannerDesc: {
    fontSize: 11.5,
    color: '#FECACA',
    lineHeight: 16,
  },

  // Action Buttons
  pushTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pushTriggerIcon: {
    fontSize: 16,
  },
  pushTriggerText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F8FAFC',
  },

  // Sections
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 12,
    marginTop: 8,
  },

  // Activity Cards
  activityWindowCard: {
    backgroundColor: '#131A2C',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 10,
  },
  actTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actIcon: {
    fontSize: 20,
  },
  actName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  actCategory: {
    fontSize: 11,
    color: '#64748B',
  },
  conditionTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  conditionTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1524',
    borderRadius: 12,
    padding: 10,
  },
  slotItem: {
    flex: 1,
    alignItems: 'center',
  },
  slotDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  slotLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  slotTime: {
    fontSize: 12,
    color: '#38BDF8',
    fontWeight: '800',
    marginTop: 2,
  },
  slotMetric: {
    fontSize: 12,
    color: '#F8FAFC',
    fontWeight: '700',
    marginTop: 2,
  },

  // Environmental Gauges
  gaugesRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  gaugeBox: {
    flex: 1,
    backgroundColor: '#131A2C',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  gaugeIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  gaugeVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  gaugeSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
})
