import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 32,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 36,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  stepBadge: {
    backgroundColor: 'rgba(109, 40, 217, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2E1065',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  activityCard: {
    width: '48%',
    borderRadius: 22,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.8,
    position: 'relative',
  },
  cardSelected: {
    backgroundColor: '#6D28D9',
    borderColor: '#7C3AED',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  cardUnselected: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  activityCategory: {
    fontSize: 11,
    fontWeight: '600',
  },
  textSelected: {
    color: '#FFFFFF',
  },
  textUnselected: {
    color: '#2E1065',
  },
  categorySelected: {
    color: '#DDD6FE',
  },
  categoryUnselected: {
    color: '#9CA3AF',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FDE047',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#713F12',
  },
  footer: {
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(109, 40, 217, 0.1)',
    paddingTop: 16,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D28D9',
  },
  continueBtn: {
    width: '100%',
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
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
})

