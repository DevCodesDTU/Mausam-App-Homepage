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

  // Emergency Tsunami / Cyclone Banner
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1215',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    marginBottom: 14,
    gap: 12,
  },
  emergencyIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyIcon: {
    fontSize: 20,
  },
  emergencyTextCol: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#F87171',
    letterSpacing: 0.2,
  },
  emergencyDesc: {
    fontSize: 11.5,
    color: '#FECACA',
    marginTop: 2,
    lineHeight: 16,
  },
  emergencyClose: {
    padding: 6,
  },
  emergencyCloseText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Notification Toast (standard in-app)
  notificationToast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111726',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    marginBottom: 12,
    gap: 10,
  },
  toastIcon: {
    fontSize: 18,
  },
  toastTextCol: {
    flex: 1,
  },
  toastTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  toastDesc: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  toastClose: {
    padding: 4,
  },
  toastCloseText: {
    color: '#64748B',
    fontSize: 13,
  },

  // Top Minimalist Header
  topHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111625',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 7,
  },
  locationPin: {
    fontSize: 13,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  gpsPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  placesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111625',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 6,
  },
  placesBtnIcon: {
    fontSize: 14,
  },
  placesBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#94A3B8',
  },

  // Atmospheric Hero Card
  heroCard: {
    backgroundColor: '#0F1524',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlowAccent: {
    position: 'absolute',
    top: -50,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(56, 189, 248, 0.07)',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTempNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: -1.5,
    includeFontPadding: false,
    marginBottom: 2,
  },
  heroConditionGlyph: {
    fontSize: 54,
  },
  heroConditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  heroConditionName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#38BDF8',
  },
  heroRangePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 12,
  },
  heroRangeText: {
    fontSize: 11.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  heroEditorialBox: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  heroEditorialText: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 18,
    fontWeight: '500',
  },

  // 24-Hour Horizon
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  hourlyScroll: {
    marginBottom: 18,
  },
  hourlyCard: {
    backgroundColor: '#111625',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 8,
    width: 66,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  hourlyCardActive: {
    backgroundColor: '#16223B',
    borderColor: '#38BDF8',
  },
  hourlyTime: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '700',
    marginBottom: 6,
  },
  hourlyTimeActive: {
    color: '#38BDF8',
  },
  hourlyIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  hourlyTemp: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  hourlyRainBar: {
    width: 28,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  hourlyRainFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
  },

  // Outdoor Passion Compass
  passionContainer: {
    backgroundColor: '#0F1524',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    marginBottom: 18,
  },
  activityChipsRow: {
    marginBottom: 14,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111625',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 13,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    gap: 6,
  },
  activityChipActive: {
    backgroundColor: '#16223B',
    borderColor: '#38BDF8',
  },
  activityChipIcon: {
    fontSize: 14,
  },
  activityChipText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#94A3B8',
  },
  activityChipTextActive: {
    color: '#38BDF8',
  },
  passionGaugeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  passionScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    gap: 5,
  },
  passionScoreDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  passionScoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10B981',
  },
  passionVerdict: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 3,
  },
  passionRationale: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
    marginBottom: 12,
  },
  passionWindowsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131929',
    borderRadius: 14,
    padding: 10,
    gap: 8,
  },
  passionWindowPill: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  passionWindowLabel: {
    fontSize: 9.5,
    color: '#64748B',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  passionWindowTime: {
    fontSize: 12,
    color: '#38BDF8',
    fontWeight: '800',
    marginTop: 2,
  },

  // Bento Telemetry Matrix (4 tiles)
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  bentoTile: {
    width: '48.5%',
    backgroundColor: '#0F1524',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  bentoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  bentoIcon: {
    fontSize: 16,
  },
  bentoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  bentoValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: -0.3,
  },
  bentoSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 3,
  },

  // Air Quality & Environmental Composition Block
  aqiCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    marginBottom: 16,
  },
  aqiTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  aqiTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aqiIcon: {
    fontSize: 18,
  },
  aqiTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  aqiStatusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  aqiStatusText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  aqiHeroRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 6,
  },
  aqiMainValue: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
    includeFontPadding: false,
  },
  aqiScaleLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  aqiAdvice: {
    fontSize: 12.5,
    lineHeight: 17,
    marginBottom: 14,
  },
  aqiMetricsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  aqiMetricCol: {
    alignItems: 'center',
    flex: 1,
  },
  aqiMetricVal: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  aqiMetricName: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // 7-Day Horizon
  sevenDayCard: {
    backgroundColor: '#0F1524',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    marginBottom: 16,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  dayRowLast: {
    borderBottomWidth: 0,
  },
  dayColName: {
    width: 68,
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  dayColIcon: {
    width: 32,
    fontSize: 17,
  },
  dayColCondition: {
    flex: 1,
    fontSize: 12,
    color: '#94A3B8',
  },
  dayTempBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayLowTemp: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
    width: 24,
    textAlign: 'right',
  },
  dayBarBg: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  dayBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
  },
  dayHighTemp: {
    fontSize: 12,
    color: '#F8FAFC',
    fontWeight: '800',
    width: 24,
    textAlign: 'left',
  },
})
