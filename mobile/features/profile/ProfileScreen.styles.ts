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
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 22,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#38BDF8',
  },
  avatarLetter: {
    fontSize: 28,
    fontWeight: '900',
    color: '#38BDF8',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.2,
  },
  profileEmail: {
    fontSize: 12.5,
    color: '#94A3B8',
    marginTop: 2,
  },

  // Units Segmented Switcher
  sectionHeader: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
    marginTop: 8,
  },
  unitSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#131A2C',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  unitBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  unitBtnActive: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  unitBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  unitBtnTextActive: {
    color: '#38BDF8',
    fontWeight: '800',
  },

  // Activities Grid
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  activityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131A2C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 6,
  },
  activityTagActive: {
    backgroundColor: '#16223B',
    borderColor: '#38BDF8',
  },
  activityTagIcon: {
    fontSize: 14,
  },
  activityTagName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#64748B',
  },
  activityTagNameActive: {
    color: '#F8FAFC',
  },

  // Actions List
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131A2C',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  actionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  actionChevron: {
    fontSize: 14,
    color: '#64748B',
  },

  signOutBtn: {
    marginTop: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  signOutText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#EF4444',
  },
})
