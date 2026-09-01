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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#DDD6FE',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarLetter: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2E1065',
  },
  profileEmail: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 20,
  },
  settingTextCol: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2E1065',
  },
  settingSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  unitTogglePill: {
    flexDirection: 'row',
    backgroundColor: '#EDE9FE',
    borderRadius: 16,
    padding: 3,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  unitHalf: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 13,
  },
  unitHalfActive: {
    backgroundColor: '#6D28D9',
  },
  unitText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6D28D9',
  },
  unitTextActive: {
    color: '#FFFFFF',
  },
  activitiesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2E1065',
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6D28D9',
  },
  sectionSub: {
    fontSize: 11.5,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 16,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  activityTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 6,
  },
  pillSelected: {
    backgroundColor: '#6D28D9',
    borderColor: '#7C3AED',
  },
  pillUnselected: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: '#E5E7EB',
  },
  actIcon: {
    fontSize: 14,
  },
  actName: {
    fontSize: 12,
    fontWeight: '700',
  },
  actNameSelected: {
    color: '#FFFFFF',
  },
  actNameUnselected: {
    color: '#374151',
  },
  pillCheck: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FDE047',
    marginLeft: 2,
  },
  actionsList: {
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(109, 40, 217, 0.1)',
    paddingTop: 16,
  },
  actionBtnSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  actionSecondaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6D28D9',
  },
  signOutBtn: {
    backgroundColor: '#FEE2E2',
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  signOutText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#DC2626',
  },
  bottomSpacer: {
    height: 40,
  },
})

